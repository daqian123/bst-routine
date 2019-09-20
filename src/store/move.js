import Vue from "vue"
const moduleMove = {
    state: {
        moveList: [],
        startX: 0, //开始坐标
        startY: 0
    },
    mutations: {
        //设置全部已读
        setAllRead(state) {
            state.moveList.forEach(item => {
                item.status = 1
            })
        },
        //清除全部
        clearMoveList(state) {
            state.moveList = []
            state.startX = 0
            state.startY = 0
        },
        //需要滑动的列表
        setMoveList(state, list) {
            state.moveList = list
        },
        //手指触摸动作开始 记录起点X坐标
        touchstart(state, e) {
            //开始触摸时 重置所有删除
            state.moveList.forEach(v => {
                v.isTouchMove && (v.isTouchMove = false);
            });
            state.startX = e.clientX;
            state.startY = e.clientY;
        },
        //滑动事件处理
        touchmove(state, { e, index }) {
            //获取滑动角度
            let angle = moduleMove.getters.angle(
                { X: state.startX, Y: state.startY },
                { X: e.clientX, Y: e.clientY }
            );
            state.moveList.forEach((v, i) => {
                v.isTouchMove = false;
                if (Math.abs(angle) > 30) return; //滑动超过30度角 return
                if (i == index) {
                    v.isTouchMove = e.clientX > state.startX ? false : true
                    Vue.set(state.moveList, i, v)
                }
            });
        },
    },
    getters: {
        angle(start, end) {
            let _X = end.X - start.X,
                _Y = end.Y - start.Y;
            return 360 * Math.atan(_Y / _X) / (2 * Math.PI); //返回角度 /Math.atan()返回数字的反正切值
        }
    }
}
export default moduleMove