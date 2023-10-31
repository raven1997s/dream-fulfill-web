<template>
	<div>
		<div class="container">
			<div class="handle-box">
				<el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
				<el-table-column prop="activityTheme" label="活动主题"></el-table-column>
				<el-table-column prop="giftName" label="礼物名称"></el-table-column>
				<el-table-column prop="holidayName" label="节日名称"></el-table-column>
				<el-table-column prop="userName" label="用户名称"></el-table-column>
				<el-table-column prop="createTime" label="创建时间"></el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination background layout="total, prev, pager, next" :current-page="query.pageNum"
					:page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="usertable">
import { ref, reactive, onMounted } from 'vue';
import { getDrawRecordStatList } from '../api/activity';

interface TableItem {
	id: number,
	activityTheme: string,
	giftName: string,
	holidayName: string,
	userName: string,
	winRate: number,
	createTime: string,
}

const query = reactive({
	pageNum: 1,
	pageSize: 10
});
const tableData = ref<TableItem[]>([]);
const pageTotal = ref(0);

// 获取表格数据
const getData = () => {
	getDrawRecordStatList(query).then(res => {
		tableData.value = res.data.list;
		pageTotal.value = res.data.total;
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
