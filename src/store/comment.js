import Vue from "vue"
const moduleComment = {
    state: {
        commentIndex: null,
        commentList: [],//评论列表
        evaluationList: []
    },
    mutations: {
        getCommentList(state, list) {
            state.commentList = list
        },
        getCommentIndex(state, index) {
            state.commentIndex = index
        },
        setCommentList(state, info) {
            Vue.set(state.commentList, state.commentIndex, info)
        },
        emptyCommentList(state) {
            state.commentList = []
        },
        getEvaluationList(state, list) {
            state.evaluationList = list
        }
    },
    getters: {
        commentList: state => state.commentList,
        evaluationList: state => state.evaluationList
    }
}
export default moduleComment