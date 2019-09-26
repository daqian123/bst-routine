/**
 * 小程序接口文件
 */

//测试地址域名
//const url = 'https://wechat.lexbst.com/bst-project'
const url = 'http://test.lexbst.com/bst-project'
// const url = 'http://192.168.2.190/bst-project';

export default {
    //用户信息******************************************************************************************
    //小程序验证登录
    checkLogin(params) {
        return api("/user/login/checkLogin", { param: params }, 'GET')
    },
    //获取用户在平台信息
    getInfo() {
        return fetchApi("/user/personal/getInfo", { param: {} }, 'GET')
    },
    //支付接口
    getPayOrder(params) {
        return fetchApi("/order/payOrder", { param: params }, 'GET')
    },
    //转发获取agent_id 
    getAgentid(params) {
        return fetchApi("/Api/getAgentid", { param: params }, 'GET')
    },
    //生成抢购商品海报 
    rushMiniGoodsPoster(params) {
        return fetchApi("/market/goods/rushMiniGoodsPoster", { param: params }, 'GET')
    },
    //本地部落****************************************************************************************
    //话题分类 cate_id   分类id  keyword  关键字搜索
    tribeCate(params) {
        return fetchApi("/local/tribeCate/cate", { param: params }, 'GET')
    },
    //话题列表
    getTribeList(params) {
        return fetchApi("/local/tribe/tribeList", { param: params }, 'GET')
    },
    //新增和编辑话题
    addOrEditTribe(params) {
        return fetchApi("/local/tribe/addOrEditTribe", { param: params }, 'GET')
    },
    //根据部落找到话题
    getTribeByCircle(params) {
        return fetchApi("/local/tribe/getTribeByCircle", { param: params }, 'GET')
    },
    //话题详情
    getTopicDetail(params) {
        return fetchApi("/local/tribe/getTribe", { param: params }, 'GET')
    },
    //我的话题
    myTopic() {
        return fetchApi("/local/tribe/myTribe", { param: {} }, 'GET')
    },
    //我收藏的部落
    myFollowGroup(params) {
        return fetchApi("/local/follow/lists", { param: params }, 'GET')
    },
    //我收藏的部落
    myFollowTopics(params) {
        return fetchApi("/local/follow/topics", { param: params }, 'GET')
    },
    //收藏或者取关部落
    followGroup(params) {
        return fetchApi("/local/follow/do", { param: params }, 'GET')
    },
    //创建部落
    createGroup(params) {
        return fetchApi("/local/tribeCate/createCate", { param: params }, 'GET')
    },
    //编辑部落
    editGroup(params) {
        return fetchApi("/local/tribeCate/editCate", { param: params }, 'GET')
    },
    //编辑部落
    editGroup(params) {
        return fetchApi("/local/tribeCate/editCate", { param: params }, 'GET')
    },
    //解散部落
    dismissGroup(params) {
        return fetchApi("/local/tribeCate/dismiss", { param: params }, 'GET')
    },
    //删除别人话题
    deleteHisTopic(params) {
        return fetchApi("/local/tribeCate/deleteTopic", { param: params }, 'GET')
    },
    //删除自己的话题
    deleteMyTopic(params) {
        return fetchApi("/local/tribe/delTribe", { param: params }, 'GET')
    },
    //部落详情
    groupDetails() {
        return fetchApi("/local/tribeCate/details", { param: {} }, 'GET')
    },
    //我的话题信息
    myTribeInfo(params) {
        return fetchApi("/local/follow/comments", { param: params }, 'GET')
    },
    //设置我的话题信息已读
    setTopicCommentRead(params) {
        return fetchApi("/comment/setTopicCommentRead", { param: params }, 'GET')
    },
    //话题点赞和取消点赞
    likeTopic(params) {
        return fetchApi("/local/tribePraise/insert", { param: params }, 'GET')
    },
    //申请部落
    applyGroup(params) {
        return fetchApi("/local/tribeCate/apply", { param: params }, 'GET')
    },
    //本地活动****************************************************************************************
    //活动列表
    getActivitysList(params) {
        return fetchApi("/local/activitys/lists", { param: params }, 'GET')
    },
    //活动分类
    getActivitysCate() {
        return fetchApi("/local/activitys/activityCate", { param: {} }, 'GET')
    },
    //删除本地活动
    deleteLocalActivity(params) {
        return fetchApi("/local/activitys/deleteActivity", { param: params }, 'GET')
    },
    //参加活动
    joinActivity(params) {
        return fetchApi("/local/activitys/takeIn", { param: params }, 'GET')
    },
    //报名参与的列表
    joinList(params) {
        return fetchApi("/local/activitys/takeList", { param: params }, 'GET')
    },
    //我的活动
    myActivity(params) {
        return fetchApi("/local/personals/myActivity", { param: params }, 'GET')
    },
    //我参与的活动
    myJoinActivity(params) {
        return fetchApi("/local/personals/taking", { param: params }, 'GET')
    },
    //活动中心
    activityCenter(params) {
        return fetchApi("/local/personals/myInfo", { param: params }, 'GET')
    },
    //新增编辑本地活动
    addOrEditActivity(params) {
        return fetchApi("/local/activitys/addOrEditActivity", { param: params }, 'GET')
    },
    //收藏的活动
    myFollowActivity(params) {
        return fetchApi("/local/Personals/myFollow", { param: params }, 'GET')
    },
    //活动详情
    activityDetails(params) {
        return fetchApi("/local/activitys/details", { param: params }, 'GET')
    },
    //活动信息统计
    myActivityInfo() {
        return fetchApi("/local/personals/myInfo", { param: {} }, 'GET')
    },
    //我的信息列表
    myInfoList(params) {
        return fetchApi("/local/Personals/comments", { param: params }, 'GET')
    },
    //设置信息已读
    setActCommentRead(params) {
        return fetchApi("/comment/setActCommentRead", { param: params }, 'GET')
    },
    //商城********************************************************************************************
    //获取商城分类
    getMallCates() {
        return fetchApi("/market/goods/cates", { param: {} }, 'GET')
    },
    getMallRecommend(params) {
        return fetchApi("/market/goods/otherModule", { param: params }, 'GET')
    },
    //获取分类商品
    getMallList(params) {
        return fetchApi("/market/goods/lists", { param: params }, 'GET')
    },
    //添加商品到购物车
    addShoppingCart(params) {
        return fetchApi("/market/cart/insert", { param: params }, 'GET')
    },
    //特产推荐
    specialtyRecommend() {
        return fetchApi("/market/SpecialtyGoods/specialtyRecommend", { param: {} }, 'GET')
    },
    //商品详情
    goodDetail(params) {
        return fetchApi("/market/goods/goodDetail", { param: params }, 'GET')
    },
    //购物车列表
    shoppingCartList() {
        return fetchApi("/market/cart/lists", { param: {} }, 'GET')
    },
    //加减购物车列表
    operateCart(params) {
        return fetchApi("/market/cart/operate", { param: params }, 'GET')
    },
    //购物车商品删除
    deleteCart(params) {
        return fetchApi("/market/cart/delete", { param: params }, 'GET')
    },
    //更多特产
    getSpecialtyGoodsByCate(params) {
        return fetchApi("/market/specialtyGoods/getSpecialtyGoodsByCate", { param: params }, 'GET')
    },
    //获取商品规格
    getSpec(params) {
        return fetchApi("/market/goods/spec", { param: params }, 'GET')
    },
    //生成购物车商品订单
    addCartOrder(params) {
        return fetchApi("/market/lorders/addOrder", { param: params }, 'GET')
    },
    //获取转发次数
    getForwardNum(params) {
        return fetchApi("/share/forward", { param: params }, 'GET')
    },
    //商品评价
    evaluate(params) {
        return fetchApi("/market/comment/evaluate", { param: params }, 'GET')
    },
    //评价的评论列表
    evaluateCommentList(params) {
        return fetchApi("/local/comment/lists", { param: params }, 'GET')
    },
    //评论商品评评价
    commodityComment(params) {
        return fetchApi("/market/comment/insert", { param: params }, 'GET')
    },
    //商品评价点赞
    evaluatePraise(params) {
        return fetchApi("/market/comment/praise", { param: params }, 'GET')
    },
    //商品评价列表
    evaluationList(params) {
        return fetchApi("/market/comment/evaluates", { param: params }, 'GET')
    },
    //商品评价评论回复列表
    evaluationReplyList(params) {
        return fetchApi("/local/comment/detail", { param: params }, 'GET')
    },
    //删除我的评价
    deleteEvaluation(params) {
        return fetchApi("/market/comment/delete", { param: params }, 'GET')
    },
    //普通商品||抢购商品支付完成后是否跳到抽奖页面
    orderPrize(params) {
        return fetchApi("/mall/prize/orderPrize", { param: params }, 'GET')
    },
    //大转盘分享设置
    prizeList(params) {
        return fetchApi("/mall/prize/prizeList", { param: params }, 'GET')
    },
    //求职招聘******************************************************************************************
    //招聘职业分类
    getJobCate() {
        return fetchApi("/employment/employ/cate", { param: {} }, 'GET')
    },
    //工作要求
    jobRequire() {
        return fetchApi("/employment/employ/jobRequire", { param: {} }, 'GET')
    },
    //附近工作
    nearJob(params) {
        return fetchApi("/employment/employ/nearJob", { param: params }, 'GET')
    },
    //全部职位列表
    jobList(params) {
        return fetchApi("/employment/employ/jobList", { param: params }, 'GET')
    },
    //发布求职招聘
    createJob(params) {
        return fetchApi("/employment/employ/createJob", { param: params }, 'GET')
    },
    //编辑求职招聘
    editJob(params) {
        return fetchApi("/employment/employ/editJob", { param: params }, 'GET')
    },
    //热门职位
    hotPosition() {
        return fetchApi("/employment/employ/hotPosition", { param: {} }, 'GET')
    },
    //招聘求职详情
    jobDetails(params) {
        return fetchApi("/employment/employ/details", { param: params }, 'GET')
    },
    //我的招聘和求职列表
    myJob(params) {
        return fetchApi("/employment/employ/myJob", { param: params }, 'GET')
    },
    //删除或者下架招聘求职信息
    undercarriage(params) {
        return fetchApi("/employment/employ/undercarriage", { param: params }, 'GET')
    },
    //收藏的职位列表
    collectList(params) {
        return fetchApi("/employment/employ/collect", { param: params }, 'GET')
    },
    //获取经纬度
    lngLat(params) {
        return fetchApi("/employment/employ/lngLat", { param: params }, 'GET')
    },
    //同城交友******************************************************************************************
    //同城交友列表
    getFriendsLists(params) {
        return fetchApi("/couple/couple/lists", { param: params }, 'GET')
    },
    //创建主页
    createHome(params) {
        return fetchApi("/couple/couple/insert", { param: params }, 'GET')
    },
    //获取行业列表和分类标签
    questionList() {
        return fetchApi("/couple/couple/question", { param: {} }, 'GET')
    },
    //个人主页信息
    personalInfo(params) {
        return fetchApi("/couple/couple/about", { param: params }, 'GET')
    },
    //编辑详情
    editHomepageDetail() {
        return fetchApi("/couple/couple/detail", { param: {} }, 'GET')
    },
    //编辑我的主页
    editHomepage(params) {
        return fetchApi("/couple/couple/update", { param: params }, 'GET')
    },
    //喜欢、取消喜欢
    doLike(params) {
        return fetchApi("/couple/couple/doLike", { param: params }, 'GET')
    },
    //喜欢的人列表
    likeList(params) {
        return fetchApi("/couple/couple/like", { param: params }, 'GET')
    },
    //撩一撩
    stirup(params) {
        return fetchApi("/couple/couple/stirup", { param: params }, 'GET')
    },
    //获取IM鉴权参数
    getUserSig(params) {
        return fetchApi("/api/getUserSig", { param: params }, 'GET')
    },
    //IM集成通信sdk
    webImJavaScript() {
        return fetchApi("/api/webImJavaScript", { param: {} }, 'GET')
    },
    //是否展示我的信息
    isShowMyInfo() {
        return fetchApi("/couple/couple/hide", { param: {} }, 'GET')
    },
    //主页******************************************************************************************
    //便民信息分类
    getLiveCate(params) {
        return fetchApi("/live/liveCate_1", { param: params }, 'GET')
    },
    //便民信息列表信息
    getLiveData(params) {
        return fetchApi("/live/liveData_1", { param: params }, 'GET')
    },
    //便民信息海报
    getInfoPoster(params) {
        return fetchApi("/card/infoPoster", { param: params }, 'GET')
    },
    //新增加油卡
    addOil(params) {
        return fetchApi("/saihe/oil/addOil", { param: params }, 'GET')
    },
    //我的加油卡
    myOilList() {
        return fetchApi("/saihe/oil/myOilList", { param: {} }, 'GET')
    },
    //删除油卡
    delOil(params) {
        return fetchApi("/saihe/oil/delOil", { param: params }, 'GET')
    },
    //油卡充值
    oilOrder(params) {
        return fetchApi("/saihe/oil/oilOrder", { param: params }, 'GET')
    },
    //q币折扣
    qcoinDiscount() {
        return fetchApi("/saihe/QQCoin/discount", { param: {} }, 'GET')
    },
    //q币充值订单
    qcoinOrder(params) {
        return fetchApi("/saihe/QQCoin/ordering", { param: params }, 'GET')
    },
    //话费套餐列表
    phonePackage(params) {
        return fetchApi("/saihe/phone/lists", { param: params }, 'GET')
    },
    //话费订单
    phoneOrder(params) {
        return fetchApi("/saihe/phone/ordering", { param: params }, 'GET')
    },
    //流量包套餐
    trafficPackage(params) {
        return fetchApi("/saihe/flow/lists", { param: params }, 'GET')
    },
    //流量订单
    trafficOrder(params) {
        return fetchApi("/saihe/flow/ordering", { param: params }, 'GET')
    },
    //视频会员包
    videoPackage() {
        return fetchApi("/saihe/video/lists", { param: {} }, 'GET')
    },
    //视频会员包
    videoOrder(params) {
        return fetchApi("/saihe/video/ordering", { param: params }, 'GET')
    },
    //便民信息首页
    convenientHome() {
        return fetchApi("/saihe/homes/index", { param: {} }, 'GET')
    },
    //充值记录
    rechargeRecord(params) {
        return fetchApi("/saihe/homes/lists", { param: params }, 'GET')
    },
    //水电煤气
    householdlists() {
        return fetchApi("/saihe/household/householdlists", { param: {} }, 'GET')
    },
    //水电煤气机构查询
    institutions(params) {
        return fetchApi("/saihe/household/institutions", { param: params }, 'GET')
    },
    //水电煤气查询
    queryPost(params) {
        return fetchApi("/saihe/household/queryPost", { param: params }, 'GET')
    },
    //轮询水电煤气查询
    queryPosts(params) {
        return fetchApi("/saihe/household/query", { param: params }, 'GET')
    },
    //添加水电煤气订单
    addHydroelectricGasOrder(params) {
        return fetchApi("/saihe/household/addOrder", { param: params }, 'GET')
    },
    //选择分组
    selectGroup() {
        return fetchApi("/saihe/household/groups", { param: {} }, 'GET')
    },
    //新增缴费账户
    addhHydroelectricGas(params) {
        return fetchApi("/saihe/household/addInfo", { param: params }, 'GET')
    },
    //主页******************************************************************************************
    //省市区列表
    getProvinceCity() {
        return fetchApi("/noauth/area", { param: {} }, 'GET')
    },
    //便民信息分类
    getLiveCate(params) {
        return fetchApi("/live/liveCate_1", { param: params }, 'GET')
    },
    //便民信息列表信息
    getLiveData(params) {
        return fetchApi("/live/liveData_1", { param: params }, 'GET')
    },
    //便民信息海报
    getInfoPoster(params) {
        return fetchApi("/card/infoPoster", { param: params }, 'GET')
    },
    //语音搜索
    getVocieInfo(params) {
        return fetchApi("/analy/index", { param: params }, 'GET')
    },
    //获取城市列表
    getCitys() {
        return fetchApi("/user/city/citys", { param: {} }, 'GET')
    },
    //城市列表搜索
    searchCity(params) {
        return fetchApi("/user/city/search", { param: params }, 'GET')
    },
    //搜索区
    getRegion(params) {
        return fetchApi("/user/city/getRegion", { param: params }, 'GET')
    },
    //主页信息列表
    getInformation(params, list) {
        return fetchApi("/information/listss", { param: params }, 'GET')
    },
    //主页信息，热门、最新消息、统计信息、栏目列表
    getIndexInfo(params) {
        return fetchApi("/information/heads", { param: params }, 'GET')
    },
    //获取天气
    getWeather(params) {
        return fetchApi("/Api/getWeather", { param: params }, 'GET')
    },
    //获取地区code
    getAreaCode(params) {
        return fetchApi("/user/city/getAreaCode", { param: params }, 'GET')
    },
    //获取栏目信息
    getColumnInfo(params, list) {
        return fetchApi("/information/getListByCate", { param: params }, 'GET')
    },
    //获取栏目列表
    getCateList() {
        return fetchApi("/cate/lists", { param: {} }, 'GET')
    },
    //发布栏目获取栏目信息
    getChildCate(params) {
        return fetchApi("/cate/childCate", { param: params }, 'GET')
    },
    //信息详情
    getInfoDetail(params) {
        return fetchApi("/information/detail_v5", { param: params }, 'GET')
    },
    //招聘求职和普通信息评论
    getInfoComment(params) {
        return fetchApi("/comment/getInfoComment", { param: params }, 'GET')
    },
    //创建订单
    createOrder(params) {
        return fetchApi("/information/createOrder", { param: params }, 'GET')
    },
    //发布信息 收费
    addTopInformation(params) {
        return fetchApi("/information/createInfo", { param: params }, 'GET')
    },
    //发布信息
    addInformation(params) {
        return fetchApi("/information/addInformation", { param: params }, 'GET')
    },
    //获取所有栏目的类型
    getColumnCate(params) {
        return fetchApi("/cate/selectCate", { param: params }, 'GET')
    },
    //发布评论
    insertComment(params) {
        return fetchApi("/comment/insert", { param: params }, 'GET')
    },
    //举报
    reportAuthor(params) {
        return fetchApi("/Accusation/insert", { param: params }, 'GET')
    },
    //查询客服信息
    getKefuInfo() {
        return fetchApi("/share/getKefuInfo", { param: {} }, 'GET')
    },
    //获取头条信息||新闻列表
    getNews(params) {
        return fetchApi("/news/getNews", { param: params }, 'GET')
    },
    //城市名获取code
    getAreaByName(params) {
        return fetchApi("/user/city/getAreaByName", { param: params }, 'GET')
    },
    //所有省市区
    getAreaPhone() {
        return fetchApi("/areas/getAreaPhone", { param: {} }, 'GET')
    },
    //获取本地新闻和信息主页新闻
    getNewsByCityName(params) {
        return fetchApi("/news/getNewsByCityName", { param: params }, 'GET')
    },
    //获取头条信息||新闻列表
    getNewsByType(params) {
        return fetchApi("/news/getNewsByType", { param: params }, 'GET')
    },
    //新闻详情
    newsDetail(params) {
        return fetchApi("/news/newDetail", { param: params }, 'GET')
    },
    //新闻类型   
    getChannelName() {
        return fetchApi("/news/getChannelName", { param: {} }, 'GET')
    },
    //获取游戏链接   
    gamelink(params) {
        return fetchApi("/user/game/gamelink", { param: params }, 'GET')
    },
    //获取信息发布置顶费用   
    getRealInfoAmount(params) {
        return fetchApi("/information/getRealInfoAmount", { param: params }, 'GET')
    },
    //获取商户入驻置顶费用
    getRealShopAmount(params) {
        return fetchApi("/information/getRealShopAmount", { param: params }, 'GET')
    },
    //修改信息区域差价 
    ChangeInfoArea(params) {
        return fetchApi("/user/personal/ChangeInfoArea", { param: params }, 'GET')
    },
    //修改商户地址差价
    ChangeShopArea(params) {
        return fetchApi("/user/personal/ChangeShopArea", { param: params }, 'GET')
    },
    //信息主页banner图
    indexBanner(params) {
        return fetchApi("/banner/detail", { param: params }, 'GET')
    },
    //banner图点击量
    clickBanner(params) {
        return fetchApi("/banner/click", { param: params }, 'GET')
    },
    //道具商城****************************************************************************************************
    //道具卡列表
    propsList() {
        return fetchApi("/tool/lists_1", { param: {} }, 'GET')
    },
    //道具卡详情
    propsDetail(params) {
        return fetchApi("/tool/detail", { param: params }, 'GET')
    },
    //我的道具卡
    myProps() {
        return fetchApi("/tool/mytools", { param: {} }, 'GET')
    },
    //我的消费记录
    myToolsPayLog(params) {
        return fetchApi("/tool/myToolsPayLog", { param: params }, 'GET')
    },
    //使用全景卡
    usePanoramicCard(params) {
        return fetchApi("/tool/usePanoramicCard", { param: params }, 'GET')
    },
    //使用插播卡
    useInterruptCard(params) {
        return fetchApi("/tool/useInterruptCard", { param: params }, 'GET')
    },
    //忽略插播卡
    ignoreShop(params) {
        return fetchApi("/tool/ignoreShop", { param: params }, 'GET')
    },
    //道具卡使用记录
    myToolsUseLog(params) {
        return fetchApi("/tool/myToolsUseLog", { param: params }, 'GET')
    },
    getLinkageArea(params = {}) {
        return fetchApi("/areas/getLinkageArea", { param: params }, 'GET')
    },
    //使用站内广播卡
    useBroadcastCard(params = {}) {
        return fetchApi("/tool/useBroadcastCard", { param: params }, 'GET')
    },
    //vip卡
    childCards(params = {}) {
        return fetchApi("/tool/childCards", { param: params }, 'GET')
    },
    //视频********************************************************************************************************
    //删除视频
    deleteVideo(params) {
        return fetchApi("/videos/GoodsVideos/deleteVideo", { param: params }, 'GET')
    },
    //我的视频、他的视频
    hervideo(params) {
        return fetchApi("/user/personal/hervideo", { param: params }, 'GET')
    },
    //视频教程
    videoTutorial() {
        return fetchApi("/videos/Operating/lists", { param: {} }, 'GET')
    },
    //保存视频
    saveVideo(params) {
        return fetchApi("/videos/Operating/saveTime", { param: params }, 'GET')
    },
    //购买道具
    addTool(params) {
        return fetchApi("/tool/addTool", { param: params }, 'GET')
    },
    //城际搭车******************************************************************************************
    //发布城际搭车
    addRide(params) {
        return fetchApi("/information/addRide", { param: params }, 'GET')
    },
    //获取搭车详情
    getRideDetail(params) {
        return fetchApi("/information/rideDetails", { param: params }, 'GET')
    },
    //司机认证
    identDriver(params) {
        return fetchApi("/lift/identDriver", { param: params }, 'GET')
    },
    //证件识别
    identAndSaveDriverInfo(params) {
        return fetchApi("/lift/identAndSaveDriverInfo", { param: params }, 'GET')
    },
    //驾驶人列表
    myDriversLists() {
        return fetchApi("/lift/myDriversLists", { param: {} }, 'GET')
    },
    //删除司机
    deleteDrivers(params) {
        return fetchApi("/lift/deleteDrivers", { param: params }, 'GET')
    },
    //司机信息
    driverIdentDetail(params) {
        return fetchApi("/lift/driverIdentDetail", { param: params }, 'GET')
    },
    //车辆认证
    identCar(params) {
        return fetchApi("/lift/identCar", { param: params }, 'GET')
    },
    //车辆列表
    myCarsLists() {
        return fetchApi("/lift/myCarsLists", { param: {} }, 'GET')
    },
    //删除车辆
    deleteCars(params) {
        return fetchApi("/lift/deleteCars", { param: params }, 'GET')
    },
    //车辆信息
    carIdentDetail(params) {
        return fetchApi("/lift/carIdentDetail", { param: params }, 'GET')
    },
    //发车记录
    driverCarLog(params) {
        return fetchApi("/lift/driverCarLog", { param: params }, 'GET')
    },
    //删除发车记录
    deleteDriverCarLog(params) {
        return fetchApi("/lift/deleteDriverCarLog", { param: params }, 'GET')
    },
    //结束行程
    finishTrip(params) {
        return fetchApi("/lift/finishTrip", { param: params }, 'GET')
    },
    //发布行程
    driverCar(params) {
        return fetchApi("/lift/driverCar", { param: params }, 'GET')
    },
    //获取司机姓名和车牌号
    getCarDriver() {
        return fetchApi("/lift/getCarDriver", { param: {} }, 'GET')
    },
    //搭车详情
    driverCarDetail(params) {
        return fetchApi("/lift/driverCarDetail", { param: params }, 'GET')
    },
    //搭车信息列表
    getRideList(params) {
        return fetchApi("/lift/lists", { param: params }, 'GET')
    },
    //编辑搭车
    driverCarLogDetail(params) {
        return fetchApi("/lift/driverCarLogDetail", { param: params }, 'GET')
    },
    //商店******************************************************************************************
    //优惠券列表shop_id 
    shopCouponsList(params) {
        return fetchApi("/mall/coupon/shopCouponsList", { param: params }, 'GET')
    },
    //添加或者编辑优惠券
    addCoupons(params) {
        return fetchApi("/mall/coupon/addCoupons", { param: params }, 'GET')
    },
    //领取优惠券coupon_id、shop_id
    receiveCoupon(params) {
        return fetchApi("/mall/coupon/receiveCoupon", { param: params }, 'GET')
    },
    //店铺活动列表
    shopActivityList() {
        return fetchApi("/mall/coupon/shopActivityList", { param: {} }, 'GET')
    },
    //编辑活动
    editShopActivity(params) {
        return fetchApi("/mall/coupon/editShopActivity", { param: params }, 'GET')
    },
    //删除活动
    deleteActivity(params) {
        return fetchApi("/mall/coupon/deleteActivity", { param: params }, 'GET')
    },
    //优惠券选择
    useCouponByOrder(params) {
        return fetchApi("/mall/coupon/useCouponByOrder", { param: params }, 'GET')
    },
    //商品优惠券选择
    getCouponByGoodCate(params) {
        return fetchApi("/mall/morder/getCouponByGoodCate", { param: params }, 'GET')
    },
    //商户优惠券管理列表
    shopCouponsManagement() {
        return fetchApi("/mall/coupon/shopCouponsManagement", { param: {} }, 'GET')
    },
    //删除优惠券
    deleteShopCoupons(params) {
        return fetchApi("/mall/coupon/deleteShopCoupons", { param: params }, 'GET')
    },
    //优惠券领取记录
    receiveCouponLog(params) {
        return fetchApi("/mall/coupon/receiveCouponLog", { param: params }, 'GET')
    },
    //商户活动首页
    shopActivityIndex(params) {
        return fetchApi("/mall/coupon/shopActivityIndex", { param: params }, 'GET')
    },
    //商户管理中心
    shopManagement() {
        return fetchApi("/mall/home/index", { param: {} }, 'GET')
    },
    //商户商品列表
    getShopGoods(params) {
        return fetchApi("/mall/goods/getShopGoods", { param: params }, 'GET')
    },
    //我的商品列表
    getMyShopGoods(params) {
        return fetchApi("/mall/goods/goodsList", { param: params }, 'GET')
    },
    //添加商品
    addCommodity(params) {
        return fetchApi("/mall/goods/insertV3", { param: params }, 'GET')
    },
    //添加抢购商品
    addActGoods(params) {
        return fetchApi("/mall/goods/addActGoods", { param: params }, 'GET')
    },
    //修改普通商品为抢购商品
    updateActGoods(params) {
        return fetchApi("/mall/goods/updateActGoods", { param: params }, 'GET')
    },
    //删除商品
    deleteCommodity(params) {
        return fetchApi("/mall/goods/delete", { param: params }, 'GET')
    },
    //编辑商品
    updateCommodity(params) {
        return fetchApi("/mall/goods/updateV3", { param: params }, 'GET')
    },
    //粉丝列表
    getFansList(params) {
        return fetchApi("/mall/home/fans", { param: params }, 'GET')
    },
    //短信模板列表
    messageTemplate() {
        return fetchApi("/mall/home/messageTemplate", { param: {} }, 'GET')
    },
    //创建短信订单
    createSmsOrder(params) {
        return fetchApi("/mall/home/createOrder", { param: params }, 'GET')
    },
    //新增编辑地址
    addOrEditMemberAddress(params) {
        return fetchApi("/mall/address/addOrEditMemberAddress", { param: params }, 'GET')
    },
    //删除地址
    deleteAddress(params) {
        return fetchApi("/mall/address/deleteAddress", { param: params }, 'GET')
    },
    //地址列表
    memberAddressList() {
        return fetchApi("/mall/address/memberAddressList", { param: {} }, 'GET')
    },
    //生成订单
    OrderSubmit(params) {
        return fetchApi("/mall/morder/OrderSubmit", { param: params }, 'GET')
    },
    //我的订单
    memberOrders(params) {
        return fetchApi("/mall/morder/memberOrders_v2", { param: params }, 'GET')
    },
    //商户订单
    shopOrderList(params) {
        return fetchApi("/mall/morder/orderList", { param: params }, 'GET')
    },
    //更新订单状态 1 取消订单  2 删除订单  3 确认收货  4 申请退款
    updateOrderStatus(params) {
        return fetchApi("/mall/morder/updateStatus", { param: params }, 'GET')
    },
    //订单详情
    getOrderDetail(params) {
        return fetchApi("/mall/morder/miniDetails", { param: params }, 'GET')
    },
    //我的优惠券
    myCoupons() {
        return fetchApi("/mall/coupon/myCoupons_list", { param: {} }, 'GET')
    },
    //优惠券金额计算
    couponAmount(params) {
        return fetchApi("/mall/morder/couponAmount", { param: params }, 'GET')
    },
    //确认发货
    delivery(params) {
        return fetchApi("/mall/morder/delivery", { param: params }, 'GET')
    },
    //一键群发
    groupSend(params) {
        return fetchApi("/mall/home/groupSend", { param: params }, 'GET')
    },
    //添加运费模板
    insertTemplate(params) {
        return fetchApi("/mall/template/insert", { param: params }, 'GET')
    },
    //编辑运费模板
    updateTemplate(params) {
        return fetchApi("/mall/template/update", { param: params }, 'GET')
    },
    //运费模板列表
    templateList() {
        return fetchApi("/mall/template/lists", { param: {} }, 'GET')
    },
    //删除模板
    deleteTemplate(params) {
        return fetchApi("/mall/template/delete", { param: params }, 'GET')
    },
    //商品详情
    getCommodityInfo(params) {
        return fetchApi("/mall/goods/detail", { param: params }, 'GET')
    },
    //线下支付
    moneySubmit(params) {
        return fetchApi("/mall/morder/moneySubmit", { param: params }, 'GET')
    },
    //我的商品排序
    goodsSort(params) {
        return fetchApi("/mall/goods/goodsSort", { param: params }, 'GET')
    },
    //运费计算
    expressFee(params) {
        return fetchApi("/mall/morder/expressFee", { param: params }, 'GET')
    },
    //商品分类页面
    shopCateLists() {
        return fetchApi("/mall/shopcate/shopCateLists", { param: {} }, 'GET')
    },
    //下拉商品分类
    selectShopCate() {
        return fetchApi("/mall/shopcate/selectShopCate", { param: {} }, 'GET')
    },
    //新增和编辑分类名称
    editOrAddShopCate(params) {
        return fetchApi("/mall/shopcate/editOrAddShopCate", { param: params }, 'GET')
    },
    //商品单位列表
    getCommodityUnit() {
        return fetchApi("/mall/goods/unit", { param: {} }, 'GET')
    },
    //我的商品分类和商品列表
    getGoodsByCate(params) {
        return fetchApi("/mall/goods/getGoodsByCateV3", { param: params }, 'GET')
    },
    //删除商品分类
    deleteShopCate(params) {
        return fetchApi("/mall/shopcate/deleteShopCate", { param: params }, 'GET')
    },
    //商户抢购活动管理
    activityList() {
        return fetchApi("/mall/rushGoods/activityList", { param: {} }, 'GET')
    },
    //删除抢购活动
    deleteSnatchActivity(params) {
        return fetchApi("/mall/rushGoods/deleteActivity", { param: params }, 'GET')
    },
    //热门抢购
    getSnatchList(params) {
        return fetchApi("/mall/rushGoods/goodsList_v2", { param: params }, 'GET')
    },
    //抢购活动详情
    getSnatchInfo(params) {
        return fetchApi("/mall/rushGoods/goodDetail", { param: params }, 'GET')
    },
    //商户详情抢购商品列表
    shopGoodsList(params) {
        return fetchApi("/mall/rushGoods/shopGoodsList", { param: params }, 'GET')
    },
    //便民信息纠错
    adjustInfo(params) {
        return fetchApi("/live/adjust", { param: params }, 'GET')
    },
    //便民信息详情
    liveDetail(params) {
        return fetchApi("/live/liveDetail", { param: params }, 'GET')
    },
    //购物车详情
    shoppingCartDetail(params) {
        return fetchApi("/mall/ShoppingCart/detail", { param: params }, 'GET')
    },
    //购物车下单
    cartSubmit(params) {
        return fetchApi("/mall/morder/cartSubmit", { param: params }, 'GET')
    },
    //未处理订单数目
    orderNumber() {
        return fetchApi("/mall/morder/orderNumber", { param: {} }, 'GET')
    },
    //更改台桌状态
    getTableStatus(params) {
        return fetchApi("/mall/ShoppingCart/getTableStatus", { param: params }, 'GET')
    },
    //会员列表
    shopCallBack(params) {
        return fetchApi("/shop/shopCallBack", { param: params }, 'GET')
    },
    //音乐列表
    audioList(params) {
        return fetchApi("/mall/goods/audioList", { param: params }, 'GET')
    },
    //获取台桌列表
    shopTableList(params) {
        return fetchApi("/mall/shopTable/shopTableList", { param: params }, 'GET')
    },
    //添加台桌
    addTable(params) {
        return fetchApi("/mall/shopTable/addTable", { param: params }, 'GET')
    },
    //删除台桌  
    deleteShopTable(params) {
        return fetchApi("/mall/shopTable/deleteShopTable", { param: params }, 'GET')
    },
    //商户台桌订单列表
    tableOrderList(params) {
        return fetchApi("/mall/ShoppingCart/cartList", { param: params }, 'GET')
    },
    //未下单状态设置为空闲状态  参数table_id: 台桌的id
    setFree(params) {
        return fetchApi("/mall/shopTable/setFree", { param: params }, 'GET')
    },
    //台桌订单详情
    tableDetail(params) {
        return fetchApi("/mall/ShoppingCart/detail", { param: params }, 'GET')
    },
    //撤销台桌订单
    cancelTableOrder(params) {
        return fetchApi("/mall/ShoppingCart/revoke", { param: params }, 'GET')
    },
    //删除添加商品 
    createCartId(params) {
        return fetchApi("/mall/ShoppingCart/operate", { param: params }, 'GET')
    },
    //添加商户菜品列表
    shopMenuList(params) {
        return fetchApi("/mall/ShoppingCart/goodsList", { param: params }, 'GET')
    },
    //现金支付
    cartMoney(params) {
        return fetchApi("/mall/morder/cartMoney", { param: params }, 'GET')
    },
    //获取支付状态
    checkPayStatus(params) {
        return fetchApi("/mall/ShoppingCart/checkPayStatus", { param: params }, 'GET')
    },
    //获取优惠买单优惠券
    youHuiPay(params) {
        return fetchApi("/mall/Coupon/youHuiPay", { param: params }, 'GET')
    },
    //商铺认证  
    addOrEditLicense(params) {
        return fetchApi("/license/addOrEditLicense", { param: params }, 'GET')
    },
    //认证详情
    licenseDetail(params) {
        return fetchApi("/license/detail", { param: params }, 'GET')
    },
    //畅销产品
    sellGoodLists(params) {
        return fetchApi("/videos/GoodsSelect/sellGoodLists", { param: params }, 'GET')
    },
    //获取认证信息
    getVerify(params) {
        return fetchApi("/shop/verify", { param: params }, 'GET')
    },
    //商户管理提现 
    shopWithdraw(params) {
        return fetchApi("/mall/home/withdraw", { param: params }, 'GET')
    },
    //获取未使用、已使用、已过期优惠券
    myAllCoupons(params) {
        return fetchApi("/mall/coupon/myCoupons_more", { param: params }, 'GET')
    },
    //商家活动优惠券
    shopActivityByCate(params) {
        return fetchApi("/mall/coupon/shopActivityByCate", { param: params }, 'GET')
    },
    //核销员列表
    authList() {
        return fetchApi("/shop/authList", { param: {} }, 'GET')
    },
    //查询核销员
    checkAuther(params) {
        return fetchApi("/shop/checkAuther", { param: params }, 'GET')
    },
    //绑定核销员
    bindAuthShop(params) {
        return fetchApi("/shop/bindAuthShop", { param: params }, 'GET')
    },
    //删除核销员
    deleteAuthShop(params) {
        return fetchApi("/shop/deleteAuthShop", { param: params }, 'GET')
    },
    //抽奖的商铺
    prizeShops(params) {
        return fetchApi("/mall/prize/prizeShops", { param: params }, 'GET')
    },
    //商户店铺
    //商户******************************************************************************************
    //创建商户订单
    createShopOrder(params) {
        return fetchApi("/shop/createOrder", { param: params }, 'GET')
    },
    //入驻商户 收费
    addTopShop(params) {
        return fetchApi("/shop/createShop", { param: params }, 'GET')
    },
    //入驻商户 收费
    checkMobile(params) {
        return fetchApi("/shop/checkMobile", { param: params }, 'GET')
    },
    //海报
    getMiniPoster(param) {
        return fetchApi("/user/personal/miniPoster", { param: param }, 'GET')
    },
    //名片
    shopcard(param) {
        return fetchApi("/cards/shopcard", { param: param }, 'GET')
    },
    //获取商户主页列表、行业类型
    getShopIndexList(params) {
        return fetchApi("/shop/lists", { param: params }, 'GET')
    },
    //获取商户详情
    getShopDetail(params) {
        return fetchApi("/shop/details", { param: params }, 'GET')
    },
    //点赞
    setLike(params) {
        return fetchApi("/comment/praise", { param: params }, 'GET')
    },
    //当前行业商户列表信息
    getIndustryInfoList(params) {
        return fetchApi("/shop/Shops", { param: params }, 'GET')
    },
    //所有行业列表
    getIndustryList(params = { token: '' }) {
        return fetchApi("/Industry/lists", { param: params }, 'GET')
    },
    //获取子行业类型
    getChildIndustry(params) {
        return fetchApi("/Industry/childIndustry", { param: params }, 'GET')
    },
    //获取所有子行业类型
    getSelectIndustry(params) {
        return fetchApi("/Industry/selectIndustry", { param: params }, 'GET')
    },
    //商铺入驻
    addShop(params) {
        return fetchApi("/shop/add", { param: params }, 'GET')
    },
    //添加收藏
    addFollow(params) {
        return fetchApi("/user/Follow/add", { param: params }, 'GET')
    },
    //取消收藏
    cancelFollow(params) {
        return fetchApi("/user/Follow/cancel", { param: params }, 'GET')
    },
    //圈子列表
    cityCircle(params) {
        return fetchApi("/circle/circle/cityCircle", { param: params }, 'GET')
    },
    //圈子店铺
    circleShops(params) {
        return fetchApi("/circle/circle/lists", { param: params }, 'GET')
    },
    //添加商圈
    joinCircle(params) {
        return fetchApi("/circle/circle/joinCircle", { param: params }, 'GET')
    },
    //个人中心*********************************************************************************************
    //我的主页中我的信息
    getMyInfo(params) {
        return fetchApi("/user/personal/herInformation", { param: params }, 'GET')
    },
    //删除 下架 上架信息
    setMyInfo(params) {
        return fetchApi("/user/personal/remove", { param: params }, 'GET')
    },
    //我的主页中我的商户
    getMyShopInfo(params) {
        return fetchApi("/user/personal/hershop", { param: params }, 'GET')
    },
    //我的信息
    getMyPersonalInfo(params) {
        return fetchApi("/user/personal/information", { param: params }, 'GET')
    },
    //修改信息
    editInfo(params) {
        return fetchApi("/user/personal/editInformation", { param: params }, 'GET')
    },
    //是否有最新消息
    isNewMsg() {
        return fetchApi("/chat/newMsg", { param: {} }, 'GET')
    },
    //我的订单
    getOrderList(params) {
        return fetchApi("/Order/OrderLists", { param: params }, 'GET')
    },
    //收藏商户列表和收藏信息列表
    getFollowList(params) {
        return fetchApi("/user/follow/lists", { param: params }, 'GET')
    },
    //删除商户
    deleteMyShop(params) {
        return fetchApi("/user/personal/deleteShop", { param: params }, 'GET')
    },
    //编辑商户
    editMyShop(params) {
        return fetchApi("/user/personal/editshop", { param: params }, 'GET')
    },
    //客服接口
    getkefu() {
        return fetchApi("/share/getkefu", { param: {} }, 'GET')
    },
    //创建编辑名片	

    updateuserInfo(params) {
        return fetchApi("/cards/updateuserInfo", { param: params }, 'GET')
    },
    //获取名片信息
    getCardInfo() {
        return fetchApi("/cards/userInfo", { param: {} }, 'GET')
    },
    //获取名片图片
    getUserCard() {
        return fetchApi("/cards/usercard", { param: {} }, 'GET')
    },
    //推广员=====================================================================
    //推广员管理中心
    partnerManagement() {
        return fetchApi("/Partner/detail", { param: {} }, 'GET')
    },
    spreadList() {
        return fetchApi("/Partner/spreadList", { param: {} }, 'GET')
    },
    //申请推广人
    addPromoter(params) {
        return fetchApi("/partner/addSpread", { param: params }, 'GET')
    },
    //开启或者禁止推广员收益
    forbiden(params) {
        return fetchApi("/Partner/forbiden", { param: params }, 'GET')
    },
    //成为新手推广员
    becomeAgent() {
        return fetchApi("/partner/becomeAgent", { param: {} }, 'GET')
    },
    //升级推广员
    payforagent() {
        return fetchApi("/partner/payforagent", { param: {} }, 'GET')
    },
    //推广员收益详情
    promoterOrderLists(params) {
        return fetchApi("/Partner/orderLists", { param: params }, 'GET')
    },
    //修改个人信息
    updatePersonalInfo(params) {
        return fetchApi("/user/personal/updatePersonalInfo", { param: params }, 'GET')
    },
    //提现列表
    withdrawList(params) {
        return fetchApi("/Partner/withdrawlist", { param: params }, 'GET')
    },
    withdraw(params) {
        return fetchApi("/Partner/withdraw", { param: params }, 'GET')
    },
    //绑定手机号
    sendMsg(params) {
        return fetchApi("/phones/sendMsg", { param: params }, 'GET')
    },
    //发送验证码
    bindMobile(params) {
        return fetchApi("/user/personal/bindMobile", { param: params }, 'GET')
    },
    //消息中心*********************************************************************************************
    //百事通助手
    noticeHelper() {
        return fetchApi("/Notice/helper", { param: {} }, 'GET')
    },
    //浏览提醒
    noticeList(params) {
        return fetchApi("/Notice/lists", { param: params }, 'GET')
    },
    //设置单个浏览消息已读或删除
    setMessageStatus(params) {
        return fetchApi("/Notice/setInfo", { param: params }, 'GET')
    },
    //设置全部浏览消息已读或删除
    setAllMessageStatus(params) {
        return fetchApi("/Notice/batchHandle", { param: params }, 'GET')
    },
    //设置单个、全部消息已读或删除 type 1单个已读 2单个删除 3全部删除 4全部已读
    setMessage(params) {
        return fetchApi("/comment/readComment", { param: params }, 'GET')
    },
    //最近联系人
    recentContact() {
        return fetchApi("/chat/recentMini", { param: {} }, 'GET')
    },
    //删除最近联系人
    deleteRecent(params) {
        return fetchApi("/chat/deleteRecent", { param: params }, 'GET')
    },
    //会话列表
    chatList(params) {
        return fetchApi("/chat/lists ", { param: params }, 'GET')
    },
    //获取未读列表
    unReadListsMini() {
        return fetchApi("/comment/unReadListsMini", { param: {} }, 'GET')
    },
    //消息通知
    noticeTips() {
        return fetchApi("/comment/noticeTips", { param: {} }, 'GET')
    },
    //系统通知
    sysNotice() {
        return fetchApi("/comment/sysNotice", { param: {} }, 'GET')
    },
    //设置单个已读、删除、全部已读删除系统通知
    readNotice(params) {
        return fetchApi("/comment/readNotice", { param: params }, 'GET')
    },
    //获取未读列表
    unReadLists() {
        return fetchApi("/comment/unReadLists", { param: {} }, 'GET')
    },
    //签到任务列表
    taskStatus() {
        return fetchApi("/signed/taskStatus", { param: {} }, 'GET')
    },
    //领取经验
    getPoints(params) {
        return fetchApi("/signed/getPoints", { param: params }, 'GET')
    },
    //签到
    signIn() {
        return fetchApi("/signed/sign", { param: {} }, 'GET')
    },
    weekSign() {
        return fetchApi("/signed/weekSign", { param: {} }, 'GET')
    },
    monthSign() {
        return fetchApi("/signed/monthSign", { param: {} }, 'GET')
    },
    //排行榜
    ranking() {
        return fetchApi("/signed/ranking", { param: {} }, 'GET')
    },
    //抽奖****************************************************************
    //抽奖规则
    prizeRules(params) {
        return fetchApi("/PlatformPrize/prizeRules", { param: params }, 'GET')
    },
    //奖品列表
    prizeLists(params) {
        return fetchApi("/PlatformPrize/prizeLists", { param: params }, 'GET')
    },
    //添加奖品
    addPrize(params) {
        return fetchApi("/PlatformPrize/add", { param: params }, 'GET')
    },
    //抽奖
    prizing(params) {
        return fetchApi("/PlatformPrize/prizing", { param: params }, 'GET')
    },
    //我的奖品
    personalPrize(params) {
        return fetchApi("/PlatformPrize/personalPrize", { param: params }, 'GET')
    }

}
//城市名获取code
function getAreaByName(params) {
    return fetchApi("/user/city/getAreaByName", { param: params }, 'GET')
}
//封装promise
function fetchApi(type, params, method) {
    let token = wx.getStorageSync("user").token
    params.param.token = token ? token : ""
    return api(type, params, method)
};
function api(type, params, method) {
    let param = params.param
    if (param) { param.mini = 1 }
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${url}/index.php${type}`,
            data: { param },
            method: method,
            header: {
                'context-type': "application/json"
            },
            success: response => {
                console.log(response)
                let code = response.data.code
                if (code !== 0) {
                    let message
                    switch (code) {
                        case 99:
                            message = '未登录'
                            store.commit("isShowLoginModal", true);
                            wx.switchTab({ url: '/pages/personalCenter/personalCenter/main' });
                            break;
                        default:
                            switch (response.data.message) {
                                case '该活动已删除':
                                    common.setTime(1500).then(() => {
                                        wx.navigateBack({ delta: 1 });
                                    })
                                    break;
                            }
                            message = response.data.message ? response.data.message : '服务器错误，请稍后再试'
                            break;
                    }
                    common.showToast(message)
                    return reject('未授权，获取token失败')
                }
                resolve(response.data)
            },
            fail: err => { reject(err) }
        })
    })
}
const config = {
    service: {
        url,
        // 上传图片接口
        uploadUrl: `${url}/index.php/uploader/upload`
    }
};
//实例化一个又拍云对象
import { Upyun } from "@/lib/upyun-wxapp-sdk.js";
import common from "@/utils/common";
const upyun = new Upyun({
    bucket: "bst-upload-images",
    operator: "bst100",
    getSignatureUrl: `${config.service.url}/index.php/Information/getSignatureUrl`
});
export { config, upyun };
import { store } from "@/store/store"
import { bdEncrypt } from "@/utils/util"
//调用高德地图api 
const Map = require('../lib/AMapWX/amap-wx.js')
const mapApi = new Map.AMapWX({ key: '1d9d158544d9d4e521042177ade48cda' });
const getRegeo = (fc, location = '') => {
    mapApi.getRegeo({
        location: location,
        success: res => {
            let { latitude, longitude, regeocodeData: { addressComponent } } = res[0];
            let code = addressComponent.adcode
            let district = addressComponent.district;
            let province = addressComponent.province;
            let city = addressComponent.city.length != 0 ? addressComponent.city : addressComponent.province
            let address = res[0].name
            getAreaByName({ area_name: city }).then(res => {
                let city_code = res.info;
                let { lng, lat } = bdEncrypt(longitude, latitude)
                console.log({ lat, lng, code, district, city, city_code, province })
                fc({ lat, lng, code, district, address, city, city_code, province })
            })

        },
        fail() {
            common.showToast("获取位置失败")
            store.commit("getActiveAddress", { data: { code: "340100", city_code: "340100", district: "合肥市", city: "合肥市", lat: 31.79322, lng: 117.30794, address: '合肥市' }, status: 1 })
        }
    })
}
const getLocation = (fc, address) => {
    wx.request({
        url: "https://restapi.amap.com/v3/geocode/geo",
        data: {
            key: "d1abdcce0de5fc9cb06ce58f8434ea2f",
            address: address
        },
        method: "GET",
        header: { "content-type": "application/json" },
        success: res => {
            let data = res.data.geocodes[0]
            let { lng, lat } = bdEncrypt(...data.location.split(","))
            let city = data.city.length != 0 ? data.city : data.district
            let province = data.province
            let address = data.formatted_address
            getAreaByName({ area_name: city }).then(res => {
                let city_code = res.info;
                fc({ lat, lng, city, city_code, province, address })
            })
        },
        fail() {
            common.showToast("获取城市信息失败，请选择其他城市");
        }
    });
}
export { getRegeo, getLocation }
