
import api from "@/api/index";
const moduleProps = {
    state: {
        myPropsList: [],
        myPropsCounts: "",
        propsInfo: ""
    },
    mutations: {
        //获取我的道具列表
        getMyPropsList(state) {
            api.myProps().then(res => {
                state.myPropsCounts = res.counts;
                res.info.forEach(item => {
                    item.percent = parseInt(item.numbers / item.chabo_count * 100);
                });
                state.myPropsList = res.info;
            });
        },
        //选择我的道具
        changeMyProps(state, value) {
            let info = state.propsInfo
            info.number = value;
            if (info.count) info.count * value;
            info.totalPrice = value * info.price;
        },
        getPropsInfo(state, data) {
            let { tid, count, type } = data
            api.propsDetail({ tid, type }).then(res => {
                let info = res.info;
                info.totalPrice = parseInt(info.price);
                info.number = 1;
                info.count = parseInt(count)
                state.propsInfo = info;
            });
        }
    },
    getters: {
        myPropsList: state => state.myPropsList,
        myPropsCounts: state => state.myPropsCounts,
        propsInfo: state => state.propsInfo
    }
}
export default moduleProps