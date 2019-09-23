
const moduleConvenient = {
    state: {
        oilInfo: ""
    },
    mutations: {
        setOilInfo(state, info) {
            state.oilInfo = info
        }
    },
    getters: {
        oilInfo: state => state.oilInfo
    }
}
export default moduleConvenient