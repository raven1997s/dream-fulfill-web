<template>
	<div class="lottery-container">
		<div v-if="!hasActiveActivity" class="no-activity-message">
			<p>现在没有进行中的活动哦~</p>
		</div>
		<div v-else class="flex-container">
			<el-card class="activity-card" :body-style="{ padding: '50px', width: '80%' }">
				<h2 v-if="activeActivity">{{ activeActivity.theme }}</h2>
				<p v-if="activeActivity">活动开始时间: {{ activeActivity.startTime }}</p>
				<p v-if="activeActivity">活动结束时间: {{ activeActivity.endTime }}</p>
				<p v-if="activeActivity">活动节日: {{ activeActivity.holidayName }}</p>
				<p v-if="activeActivity">活动创建人: {{ activeActivity.createUserName }}</p>
			</el-card>
			<el-card v-if="userPrizes.length > 0" class="prizes-list" :body-style="{ padding: '50px', width: '70%' }">
				<h3>本期奖品信息</h3>
				<el-table :data="userPrizes" style="width: 100%">
					<el-table-column prop="giftName" label="奖品名称"></el-table-column>
					<el-table-column prop="winRate" label="中奖概率"></el-table-column>
				</el-table>
			</el-card>
		</div>
		<div class="flex-container">
			<el-button v-if="userPrizes.length > 0" type="primary" @click="startLottery" class="lottery-button">
				开始抽奖
			</el-button>
		</div>
	</div>
</template>
  
  
  
<script setup lang="ts" name="doLottery">
import { ref } from 'vue';
import { ElButton, ElMessage } from 'element-plus';
import { selectActivityInfo, findCurrentActivityStatList, doLottery } from '../api/activity';
import { useUserStore } from '../store/user-info';

const userStore = useUserStore();

interface Activity {
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
const hasActiveActivity = ref(false);
const activeActivity = ref<Activity | null>(null);
const userPrizes = ref([]);



const getData = () => {
	selectActivityInfo({}).then(res => {
		if (res.data && res.status === 1) {
			hasActiveActivity.value = true;
			activeActivity.value = res.data;
			console.log("selectActivityInfo =====> success");
			if (!activeActivity.value) {
				ElMessage.error("活动id不能为空");
				return false;
			}
			fetchUserPrizes(activeActivity.value.id, userStore.userId);
		} else {
			console.log("selectActivityInfo =====> error");
			hasActiveActivity.value = false;
		}
	})
};

const fetchUserPrizes = (activityId: number, userId: number) => {
	findCurrentActivityStatList({
		activityId: activityId,
		userId: userId,
	}).then(res => {
		console.log("res : " + JSON.stringify(res));
		if (res.data && res.status === 1 && Boolean(res.data.length)) {
			console.log("fetchUserPrizes =====> success");
			userPrizes.value = res.data;
		} else {
			console.log("fetchUserPrizes =====> error");
			hasActiveActivity.value = false;
		}
	})
};

getData();

const startLottery = () => {
	if (userStore.userId === 0) {
		ElMessage.error("请选择所属用户");
		return false;
	}
	if (!activeActivity.value) {
		ElMessage.error("活动id不能为空");
		return false;
	}
	const activityId = activeActivity.value.id; // 获取活动ID
	const userId = userStore.userId;; // 模拟用户ID，您可以根据实际情况获取用户ID

	// 调用抽奖接口
	doLottery({ activityId: activityId, userId: userId }).then((res) => {
		if (res.data && res.status === 1) {
			// 在这里处理中奖逻辑
			console.log('抽奖成功！中奖信息：' + JSON.stringify(res.data));
			ElMessage.success('抽奖成功！恭喜你抽中了礼物【' + res.data.giftName + '】');

		} else {
			// 在这里处理抽奖失败的逻辑
			ElMessage.error(res.message);
			console.log("抽奖失败！" + res.message);
		}
	}).catch((error) => {
		// 处理抽奖接口调用出错的情况
		ElMessage.error(error);
		console.error("抽奖接口调用出错！", error);
	});
};
// onMounted(getData());
</script>
<style>
.lottery-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
}

.no-activity-message {
	text-align: center;
	font-size: 24px;
	color: #555;
}

.lottery-button {
	margin-top: 20px;
}

.flex-container {
	display: flex;
	justify-content: center;
	width: 100%;
}

.activity-card {
	margin-right: 20px;
}

.prizes-list {
	margin-top: 0px;
}
</style>
  