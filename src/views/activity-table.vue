<template>
	<div>
		<div class="container">
			<div class="handle-box">
				<!-- <el-select v-model="query.address" placeholder="地址111" class="handle-select mr10">
					<el-option key="1" label="广东省" value="广东省"></el-option>
					<el-option key="2" label="湖南省" value="湖南省"></el-option>
				</el-select>
				<el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input> -->
				<el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
				<el-button type="primary" :icon="Plus" @click="handleAdd">新增</el-button>
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
				<el-table-column prop="theme" label="活动主题"></el-table-column>
				<el-table-column prop="description" label="活动描述"></el-table-column>
				<el-table-column prop="rule" label="活动规则"></el-table-column>
				<el-table-column prop="startTime" label="活动开始时间"></el-table-column>
				<el-table-column prop="endTime" label="活动结束时间"></el-table-column>
				<el-table-column prop="holidayName" label="所属节日"></el-table-column>
				<el-table-column prop="createUserName" label="活动创建人"></el-table-column>
				<!-- <el-table-column label="是否取消" align="center">
					<template #default="scope">
						<el-tag :type="scope.row.isDelete ? 'danger' : 'success'">
							{{ scope.row.isDelete ? '已取消' : '未取消' }}
						</el-tag>
					</template>
				</el-table-column> -->
				<el-table-column prop="createTime" label="创建时间"></el-table-column>
				<el-table-column prop="updateTime" label="修改时间"></el-table-column>
				<el-table-column label="操作" width="220" align="center">
					<template #default="scope">
						<el-button text :icon="Edit" @click="handleEdit(scope.row)" v-permiss="15">
							编辑
						</el-button>
						<el-button text :icon="Delete" class="red" @click="handleDelete(scope.row.id)" v-permiss="16">
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination background layout="total, prev, pager, next" :current-page="query.pageNum"
					:page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
			</div>
		</div>
		<!-- 新增弹出框 -->
		<el-dialog title="新增" v-model="addVisible" width="30%">
			<el-form ref="formRef" :model="form" status-icon :rules="rules" label-width="120px">
				<el-form-item label="活动主题" prop="theme">
					<el-input v-model="form.theme" placeholder="请填写活动主题"></el-input>
				</el-form-item>
				<el-form-item label="活动时间" prop="activityTime">
					<el-date-picker v-model="activityTime" type="datetimerange" range-separator="~" start-placeholder="开始时间"
						end-placeholder="结束时间" />
				</el-form-item>
				<el-form-item label="所属节日" required>
					<el-select v-model="form.holidayId" value-key="id" clearable>
						<el-option v-for="holiday in holidays" :key="holiday.id" :label="holiday.holidayName"
							:value="holiday.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="活动描述" prop="description">
					<el-input v-model="form.description" placeholder="请填写活动描述" type="textarea"></el-input>
				</el-form-item>
				<el-form-item label="活动规则" prop="rule">
					<el-input v-model="form.rule" placeholder="请填写活动规则" type="textarea"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="addVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveAdd(formRef)">确 定</el-button>
				</span>
			</template>
		</el-dialog>

		<!-- 编辑弹出框 -->
		<el-dialog title="编辑" v-model="editVisible" width="30%">
			<el-form ref="formRef" :model="form" status-icon :rules="rules" label-width="120px">
				<el-form-item label="活动主题" prop="theme">
					<el-input v-model="form.theme" placeholder="请填写活动主题"></el-input>
				</el-form-item>
				<el-form-item label="活动时间" prop="activityTime">
					<el-date-picker v-model="form.activityTime" type="datetimerange" range-separator="~"
						start-placeholder="开始时间" end-placeholder="结束时间" />
				</el-form-item>
				<el-form-item label="所属节日" required>
					<el-select v-model="form.holidayId" value-key="id" clearable>
						<el-option v-for="holiday in holidays" :key="holiday.id" :label="holiday.holidayName"
							:value="holiday.id">{{ holiday.holidayName }}</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="活动描述" prop="description">
					<el-input v-model="form.description" placeholder="请填写活动描述" type="textarea"></el-input>
				</el-form-item>
				<el-form-item label="活动规则" prop="rule">
					<el-input v-model="form.rule" placeholder="请填写活动规则" type="textarea"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="editVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveEdit(formRef)">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="usertable">
import { ref, reactive, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getActivityList, updateActivity, addActivity, deleteActivity } from '../api/activity';
import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '../store/user-info';
import { format, parseISO } from 'date-fns';
import { getSpecialDateList } from '../api/special-date-table';

const userStore = useUserStore();

interface TableItem {
	id: number,
	theme: string,
	description: string,
	rule: string,
	startTime: string,
	endTime: string,
	holidayName: string,
	createUserName: string,
	isDelete: number,
	createTime: string,
	updateTime: string
}

const query = reactive({
	pageNum: 1,
	pageSize: 10
});
const tableData = ref<TableItem[]>([]);
const pageTotal = ref(0);

const activityTime = ref<[Date, Date] | null>([
	new Date(),
	new Date(),
])

// 获取表格数据
const getData = () => {
	getActivityList(query).then(res => {
		tableData.value = res.data.list;
		pageTotal.value = res.data.total || 50;
	})
};

getData();

// 查询操作
const handleSearch = () => {
	query.pageNum = 1;
	getData();
};
// 分页导航
const handlePageChange = (val: number) => {
	query.pageNum = val;
	getData();
};

// 删除操作
const handleDelete = (id: number) => {
	// 二次确认删除
	ElMessageBox.confirm('确定要删除吗？', '提示', {
		type: 'warning'
	})
		.then(() => {
			const params = { id: id };
			deleteActivity(params).then(res => {
				console.log(res);
				ElMessage.success('删除成功');
				getData();
			}).catch(() => {
				ElMessage.error('系统异常');
			})
		})
		.catch(() => { });
};

// 表格编辑时弹窗和保存
const form = reactive({
	id: 0,
	createUser: 0,
	selectedHoliday: undefined as Holiday | undefined,
	holidayId: 0,
	theme: "",
	description: "",
	rule: "",
	startTime: "",
	endTime: "",
	activityTime: [new Date(), new Date()],
});

const editVisible = ref(false);
const selectedHoliday = ref<Holiday | undefined | null>(null);
const handleEdit = (row: any) => {
	form.id = row.id;
	form.theme = row.theme;
	form.description = row.description;
	form.rule = row.rule;
	const startTime = parseISO(row.startTime)
	const endTime = parseISO(row.endTime)
	// 赋值
	form.activityTime = [startTime, endTime]
	const holiday = holidays.value.find(h => h.id === row.holidayId);

	if (holiday) {
		form.selectedHoliday = holiday;
		form.holidayId = holiday.id;
	}
	editVisible.value = true;
};

const saveEdit = (formEl: FormInstance | undefined) => {

	if (!formEl) return
	formEl.validate((valid) => {
		console.log("activityTime ==> " + JSON.stringify(activityTime));

		if (!form.activityTime) {
			ElMessage.error("请选择活动时间");
			return false;
		}
		const holiday = selectedHoliday.value;
		if (holiday) {
			form.holidayId = holiday.id;
		}

		if (valid) {
			const startTime = form.activityTime[0];
			const endTime = form.activityTime[1];
			form.startTime = format(startTime, 'yyyy-MM-dd HH:mm:ss');
			form.endTime = format(endTime, 'yyyy-MM-dd HH:mm:ss');
			editVisible.value = false;

			updateActivity(form).then(res => {
				console.log(res);
				if (res.status == 1) {
					ElMessage.success('修改成功');
					getData();
				} else {
					ElMessage.error(res.message);
				}
			}).catch(() => {
				ElMessage.error('系统异常');
			})
			console.log('submit!');
		} else {
			console.log('error submit!');
			return false;
		}
	})
};


// 表格新增时弹窗和保存
const addVisible = ref(false);
const handleAdd = () => {
	addVisible.value = true;
	form.createUser = userStore.userId;
	form.theme = '';
	form.description = "";
	form.rule = "";
	selectedHoliday.value = null;
	activityTime.value = null;
};
const saveAdd = (formEl: FormInstance | undefined) => {

	if (userStore.userId === 0) {
		ElMessage.error("请选择所属用户");
		return false;
	}


	if (!activityTime.value) {
		ElMessage.error("请选择活动时间");
		return false;
	}


	form.startTime = format(activityTime.value[0], 'yyyy-MM-dd HH:mm:ss');
	form.endTime = format(activityTime.value[1], 'yyyy-MM-dd HH:mm:ss');

	if (!formEl) return
	formEl.validate((valid) => {
		console.log("form ==> " + JSON.stringify(form));
		if (valid) {
			// 校验通过
			addVisible.value = false;

			addActivity(form).then(res => {
				console.log(res);
				if (res.status == 1) {
					ElMessage.success(res.message);
					getData();
				} else {
					ElMessage.error(res.message);
				}
			}).catch(() => {
				ElMessage.error('系统异常');
			})
			console.log('submit!');
		} else {
			console.log('error submit!');
			return false;
		}
	})

};

const formRef = ref<FormInstance>()


const checkTheme = (rule: any, value: any, callback: any) => {
	if (value === '') {
		return callback(new Error('给活动起个主题呗'));
	} else if (value.length > 10) {
		return callback(new Error('活动主题太长了吧'));
	} else {
		callback();
	}
};

const checkDescription = (rule: any, value: any, callback: any) => {
	if (value === '') {
		return callback(new Error('填一下活动描述哦'));
	} else if (value.length > 100) {
		return callback(new Error('活动描述太长了吧'));
	} else {
		callback();
	}
};

const checkRule = (rule: any, value: any, callback: any) => {
	if (value === '') {
		return callback(new Error('填一下活动规则哦'));
	} else if (value.length > 100) {
		return callback(new Error('活动规则太长了吧'));
	} else {
		callback();
	}
};
const checkActivityTime = (rule: any, value: any, callback: any) => {
	if (value === '') {
		callback(new Error('节日所在日期是必填项'));
	} else {
		callback();
	}
}

const rules = {
	theme: [
		{ required: true, validator: checkTheme, trigger: 'blur' }
	],
	description: [
		{ required: true, validator: checkDescription, trigger: 'blur' }
	],
	rule: [
		{ required: true, validator: checkRule, trigger: 'blur' }
	],
	activityTime: [
		{ required: true, type: 'activityTime', validator: checkActivityTime, message: '活动时间是必填的哦', trigger: 'blur' },
	],
	holidayId: [
		{ required: true, message: '请选择节日', trigger: 'change' }
	]
};

interface Holiday {
	holidayName: string;
	id: number;
}

const holidays = ref<Holiday[]>([]);

onMounted(() => {
	getSpecialDateList({
		pageNum: 1,
		pageSize: 10
	}).then(res => {
		holidays.value = res.data.list;
	})
});

</script>

<style scoped>
.handle-box {
	margin-bottom: 20px;
}

.handle-select {
	width: 120px;
}

.handle-input {
	width: 300px;
}

.table {
	width: 100%;
	font-size: 14px;
}

.red {
	color: #F56C6C;
}

.mr10 {
	margin-right: 10px;
}

.table-td-thumb {
	display: block;
	margin: auto;
	width: 40px;
	height: 40px;
}

.block {
	padding: 30px 0;
	text-align: center;
	border-right: solid 1px var(--el-border-color);
	flex: 1;
}

.block:last-child {
	border-right: none;
}

.block .demonstration {
	display: block;
	color: var(--el-text-color-secondary);
	font-size: 14px;
	margin-bottom: 20px;
}
</style>
