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