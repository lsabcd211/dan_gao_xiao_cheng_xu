import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		goods:[],
		cartList:[]
	},
	mutations:{
		add(state,data){
			console.log(data);//商品的信息
			// console.log(data._id);//商品的信息的ID
			var bool=true; 
			console.log(state);
			state.cartList.map((res)=>{
				console.log(res);
				if(res._id===data._id){
					res.num++;
					bool=false;
				}
			})
			if(bool){
				data.num=1;
				state.cartList.push(data);
			}
			console.log(state.cartList);
			
		}
	},
	actions:{
		
	}
})


	// State 提供唯一的公共数据源，所有共享的数据都要统一放到Store的State中进行存储
	// state : { 
	// 	count:0,
	// },
	// 用于修改变更Store中的数据
	// 只有mutations 中定义的函数，才有修改state的权利
	// 1.只能通过mutation变更Store数据，不可以直接操作Store中的数据
	// 2.通过这种方式虽然操作起来稍微繁琐一些，但是可以集中监控所有数据的变化
	// 3.不能写异步的函数，比如倒计时setTimeout()
	// mutations:{
	// 	add(state){
	// 		state.count ++;
	// 	},
	// 	// 第一个行参永远都是state，第二个参数就是传递的参数 用commit调用
	// 	addN(state,step = 0){
	// 		state.count += step;
	// 	},
	// 	jian(state){
	// 		state.count --;
	// 	},
	// 	jianN(state,step = 0){
	// 		state.count -= step;
	// 	},
	// },
	
	// Action
	// Action用于处理异步任务
	// 如果通过异步操作变更数据，必须通过Action，而不能使用Mutation，但是在Action中还是要通过触发Mutation的方式间接变更数据
	// actions:{
	// 	// 在action中，不能直接修改state中的数据
	// 	// 必须通过context.commit()触发某个mutation才行
		
	// 	jianAsync(context){
	// 		setTimeout(()=>{
	// 			context.commit('jian')
	// 		},1000)
	// 	},
	// 	jianNAsync(context,step){
	// 		setTimeout(()=>{
	// 			context.commit('jianN',step)
	// 		},1000)
	// 	},
	// 	addAsync(context){
	// 		setTimeout(()=>{
	// 			context.commit('add')
	// 		},1000)
	// 	},
	// 	addNAsync(context,step){
	// 		setTimeout(()=>{
	// 			context.commit('addN',step)
	// 		},1000)
	// 	},
	// 	getList(context){
	// 		uni.request({
	// 			url: '@/api/list.json',
	// 			success: (res) => {
	// 				console.log(res);
	// 			}
	// 		});
	// 	}
		
	// },
	
	
	// Getter
	// Getter用于对Store中的数据进行加工处理形成新的数据
	//   -- 1.Getter 可以对Store 中已有的数据加工处理之后形成新的数据，类似Vue的计算属性
	//   -- 2.Store中的数据发生变化，Getter的数据也会跟着变化
	// getters:{
	// 	showNum(state){
	// 		return '当前最新的数量是' + (state.count + 1)
	// 	}
	// }
// })

// 3vue导入store 看main.js文件