
const moduleConvenient = {
    state: {
        oilInfo: "",
        institution: {}
    },
    mutations: {
        setOilInfo(state, info) {
            state.oilInfo = info
        },
        setInstitution(state, info) {
            state.institution = info
        }
    },
    getters: {
        oilInfo: state => state.oilInfo,
        institution: state => state.institution
    }
}
export default moduleConvenient