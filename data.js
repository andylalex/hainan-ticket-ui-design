// 页面开发说明数据

// ===== 完整开发文档 =====
// ===== 完整开发文档 =====
const devDocs = {
    // ========== 用户端小程序 ==========
    // ========== 用户端小程序 ==========

    'user-miniapp/login.html': {
        title: '登录',
        subtitle: '微信一键登录 - 手机号授权',
        sections: [
            {
                title: '功能描述',
                content: `<p><strong>核心功能：</strong>用户端小程序的登录入口页面，支持微信一键登录。用户点击"微信一键登录"按钮后，弹出微信手机号授权弹窗（底部滑出式），显示应用名称和授权手机号（脱敏显示），用户确认授权后进入登录加载状态，成功后跳转小程序首页。页面采用深色渐变背景，品牌Logo居中展示（使用PC端同款logo.png），底部提供用户协议和隐私政策勾选。</p>
<p><strong>业务说明：</strong></p>
<ul>
  <li><strong>前置条件：</strong>用户已打开小程序，未登录状态</li>
  <li><strong>功能实现逻辑：</strong>
    <ul>
      <li>品牌展示：页面中央展示品牌Logo（PC端同款logo.png，带发光脉冲环+浮动动画）和品牌名称"海南演艺"</li>
      <li>登录卡片：毛玻璃效果卡片（带微光扫过动画），包含欢迎标题、登录说明、微信一键登录按钮（绿色渐变）、用户协议勾选</li>
      <li>微信一键登录：点击按钮前需勾选用户协议，未勾选时提示"请先同意用户服务协议和隐私政策"</li>
      <li>手机号授权弹窗：底部滑出式弹窗（authModal），显示微信图标、授权标题、应用名称、脱敏手机号（138****8888），支持确认授权或取消</li>
      <li>登录加载：确认授权后显示全屏加载遮罩（loadingOverlay，毛玻璃背景+旋转动画+"登录中..."），1.5秒后跳转</li>
      <li>登录跳转逻辑：登录成功后优先跳转 sessionStorage 中存储的 loginRedirect 目标页面（需获取用户信息的页面未登录时写入），无 redirect 则默认跳转首页</li>
      <li>未注册处理：未注册手机号验证后自动创建账号，底部提示"未注册手机号验证后将自动创建账号"</li>
      <li>页面特效：背景粒子漂浮动画（20个随机粒子）、三个光球缓慢漂移呼吸动画、Logo浮动+发光脉冲环、卡片微光扫过、入场 fadeInUp 分层动画</li>
    </ul>
  </li>
  <li><strong>数据约束：</strong>手机号必须为有效中国大陆手机号；用户协议必须勾选才能继续</li>
  <li><strong>能力边界：</strong>不支持手机号验证码登录；不支持账号密码登录；不支持第三方登录（仅微信）</li>
</ul>
<p><strong>登录跳转场景：</strong>以下页面需要获取用户信息，未登录时跳转到登录页（login.html），登录后通过 sessionStorage.loginRedirect 回跳：</p>
<ul>
  <li><strong>个人中心</strong>（profile.html）：显示用户头像、昵称、会员等级、资产概览</li>
  <li><strong>编辑资料</strong>（profile-edit.html）：修改用户姓名、头像、手机号等个人信息</li>
  <li><strong>钱包</strong>（wallet.html）：余额管理、充值提现，需实名认证</li>
  <li><strong>充值</strong>（recharge-topup.html）：余额充值，需绑定手机号</li>
  <li><strong>实名认证</strong>（real-name-auth.html）：身份证实名认证，需登录态</li>
  <li><strong>会员中心</strong>（member-center.html）：会员卡、等级权益、积分，需用户身份</li>
  <li><strong>积分中心</strong>（points.html）：积分余额、任务、兑换，需用户身份</li>
  <li><strong>优惠券</strong>（coupons.html）：用户优惠券列表、领取，需用户身份</li>
  <li><strong>我的套票</strong>（my-packages.html）：已购套票管理，需用户身份</li>
  <li><strong>订单确认</strong>（order-confirm.html）：确认订单、选座购票后下单，需用户身份</li>
  <li><strong>票务订单</strong>（order-ticket.html）：查看电子票、订单详情，需用户身份</li>
  <li><strong>商品订单</strong>（product-order.html）：商城订单管理，需用户身份</li>
  <li><strong>交易记录</strong>（transaction-record.html）：钱包交易流水，需用户身份</li>
  <li><strong>积分明细</strong>（points-flow.html）：积分收支流水，需用户身份</li>
  <li><strong>隐私设置</strong>（privacy-settings.html）：隐私权限管理，需用户身份</li>
  <li><strong>偏好设置</strong>（preference-settings.html）：演出偏好配置，需用户身份</li>
  <li><strong>消息服务</strong>（message-service.html）：消息通知列表，需用户身份</li>
  <li><strong>充值卡绑定</strong>（recharge-card-bind.html）：实体充值卡绑定，需用户身份</li>
  <li><strong>实体卡申请</strong>（physical-card-apply.html）：实体会员卡申请，需用户身份</li>
</ul>`
            },
            {
                title: '交互说明',
                content: `<p><strong>点击微信一键登录</strong></p>
<ul>
  <li><strong>触发：</strong>点击"微信一键登录"按钮（绿色渐变，fa-weixin图标）</li>
  <li><strong>执行中：</strong>检查用户协议勾选状态→未勾选则alert提示→已勾选则弹出手机号授权弹窗（底部滑入动画）</li>
  <li><strong>成功：</strong>弹窗底部滑入显示，背景变暗（backdrop-filter: blur）</li>
  <li><strong>边界条件：</strong>未勾选协议时阻止弹窗打开</li>
</ul>
<p><strong>确认授权并登录</strong></p>
<ul>
  <li><strong>触发：</strong>点击授权弹窗"确认授权并登录"按钮（绿色渐变）</li>
  <li><strong>执行中：</strong>关闭授权弹窗→显示全屏加载遮罩（旋转动画+"登录中..."）→模拟登录请求（1.5秒）</li>
  <li><strong>成功：</strong>加载完成后跳转 home.html</li>
  <li><strong>失败：</strong>无（演示环境）</li>
  <li><strong>边界条件：</strong>登录过程中不可取消</li>
</ul>
<p><strong>取消授权</strong></p>
<ul>
  <li><strong>触发：</strong>点击授权弹窗"取消"按钮或点击弹窗外区域</li>
  <li><strong>执行中：</strong>弹窗向下滑出关闭，返回登录页面</li>
  <li><strong>成功：</strong>弹窗关闭，用户可重新点击登录</li>
</ul>`
            },
            {
                title: '核心字段',
                noTableWrap: true,
                tables: [
                    {
                        title: '登录字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['phone', 'string', '是', '用户手机号（微信授权获取）'],
                            ['openid', 'string', '是', '微信用户唯一标识'],
                            ['unionid', 'string', '否', '微信UnionID（多应用互通时）'],
                            ['nickname', 'string', '否', '微信昵称'],
                            ['avatar_url', 'string', '否', '微信头像URL'],
                            ['agreement_accepted', 'boolean', '是', '是否同意用户协议和隐私政策']
                        ]
                    }
                ]
            }
        ]
    },

    'user-miniapp/home.html': {
        title: '首页',
        subtitle: '轮播推荐 + 热门演出 + 券包 + 剧院导航',
        sections: [
            {
                title: '功能描述',
                content: `<p><strong>核心功能：</strong>聚合展示运营配置内容与个性化推荐，是用户进入小程序后的主入口页面。包含Banner轮播、热门演出推荐、精选券包、剧院导航四大内容模块，以及搜索栏和底部Tab导航。</p>
                <p><strong>业务说明：</strong></p>
                <ul>
                    <li><strong>前置条件：</strong>用户已登录小程序，网络正常</li>
                    <li><strong>功能实现逻辑：</strong>
                        <ul>
                            <li>Banner轮播：从运营后台获取启用的轮播图列表，按sort_order排序，自动循环播放</li>
                            <li>热门推荐：从演出库获取评分高、销量好的演出，按热度排序展示前N条</li>
                            <li>券包推荐：从营销中心获取上架的券包商品，按运营权重排序</li>
                            <li>剧院导航：从场馆管理获取有演出的剧院列表，按演出数量排序</li>
                        </ul>
                    </li>
                    <li><strong>数据约束：</strong>轮播图最多10张；热门推荐最多20条；券包最多10个；剧院最多10个</li>
                    <li><strong>能力边界：</strong>不支持自定义首页布局（需通过运营后台配置）</li>
                </ul>`
            },
            {
                title: '交互说明',
                content: `<p><strong>点击Banner轮播图</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击轮播图区域</li>
                    <li><strong>执行中：</strong>根据jump_type判断跳转目标</li>
                    <li><strong>成功：</strong>跳转对应页面（演出详情/演出列表/外部链接）</li>
                    <li><strong>边界条件：</strong>jump_type=4时无跳转</li>
                </ul>
                <p><strong>点击热门推荐演出卡片</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击演出卡片</li>
                    <li><strong>成功：</strong>直达 show-detail.html?show_id=xxx（不经过演出列表）</li>
                </ul>
                <p><strong>点击券包卡片</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击整张卡片或"立即抢购"按钮</li>
                    <li><strong>成功：</strong>跳转 coupon-package.html?package_id=xxx</li>
                </ul>
                <p><strong>点击剧院卡片</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击剧院卡片</li>
                    <li><strong>成功：</strong>跳转 theater-detail.html?theater_id=xxx</li>
                </ul>
                <p><strong>点击"查看全部"</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击热门推荐右侧"查看全部"</li>
                    <li><strong>成功：</strong>跳转 show-list-detail.html</li>
                </ul>
                <p><strong>点击"全部剧院"</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击剧院导航右侧"全部剧院"</li>
                    <li><strong>成功：</strong>跳转 theater-list.html</li>
                </ul>`
            },
            {
                title: '核心字段',
                noTableWrap: true,
                tables: [
                    {
                        title: 'Banner 轮播字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['banner_id', 'number', '是', '轮播图唯一标识'],
                            ['image_url', 'string', '是', '轮播图片URL'],
                            ['title', 'string', '是', '轮播图标题'],
                            ['jump_type', 'enum', '是', '跳转类型：1-演出详情 2-演出列表 3-外部链接 4-无跳转'],
                            ['jump_params', 'string', '否', '跳转参数，如show_id或url'],
                            ['sort_order', 'number', '是', '排序权重，越小越靠前'],
                            ['start_time', 'string', '是', '展示开始时间，格式YYYY-MM-DD HH:mm'],
                            ['end_time', 'string', '是', '展示结束时间，格式YYYY-MM-DD HH:mm'],
                            ['status', 'enum', '是', '状态：0-禁用 1-启用']
                        ]
                    },
                    {
                        title: '热门推荐字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['show_id', 'number', '是', '演出唯一标识'],
                            ['title', 'string', '是', '演出名称'],
                            ['cover_image', 'string', '是', '封面图URL'],
                            ['category_name', 'string', '是', '分类名称，如"演唱会"'],
                            ['min_price', 'number', '是', '最低票价（元）'],
                            ['rating', 'number', '是', '评分，0-5分'],
                            ['status', 'enum', '是', '状态：1-即将开票 2-售票中 3-已售罄 4-即将开演']
                        ]
                    },
                    {
                        title: '券包推荐字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['package_id', 'number', '是', '券包唯一标识'],
                            ['cover_image', 'string', '是', '券包封面图URL'],
                            ['name', 'string', '是', '券包名称'],
                            ['discount', 'string', '是', '折扣信息，如"8折"'],
                            ['original_price', 'number', '是', '原价（元）'],
                            ['sale_price', 'number', '是', '折扣价（元）']
                        ]
                    },
                    {
                        title: '剧院导航字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['theater_id', 'number', '是', '剧院唯一标识'],
                            ['image', 'string', '是', '剧院封面图URL'],
                            ['name', 'string', '是', '剧院名称'],
                            ['address', 'string', '是', '剧院地址'],
                            ['show_count', 'number', '是', '当前演出场次数']
                        ]
                    },
                    {
                        title: '底部 Tab 字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['tab_key', 'string', '是', 'Tab标识：home/show/shop/member/profile'],
                            ['label', 'string', '是', 'Tab显示文字'],
                            ['icon', 'string', '是', '未激活图标URL'],
                            ['active_icon', 'string', '是', '激活状态图标URL'],
                            ['url', 'string', '是', '跳转页面路径']
                        ]
                    }
                ]
            }
        ]
    },

    'user-miniapp/show-list-detail.html': {
        title: '演出列表页',
        subtitle: '分类标签 + 演出卡片列表',
        sections: [
            {
                title: '功能描述',
                content: `<p><strong>核心功能：</strong>按演出分类标签筛选并展示演出列表。用户选择分类后，系统从演出库中过滤对应分类的演出数据，按推荐排序返回列表。列表支持分页加载，支持下拉刷新获取更多演出数据。</p>
                <p><strong>业务说明：</strong></p>
                <ul>
                  <li><strong>前置条件：</strong>用户已登录或处于游客状态；演出数据已在后台管理系统中录入并发布</li>
                  <li><strong>功能实现逻辑：</strong>
                    <ul>
                      <li>数据来源：从演出库查询已发布的演出数据，按分类字段过滤，默认按推荐权重排序</li>
                      <li>分页加载：首次加载N条，上拉加载更多时请求下一页数据</li>
                      <li>状态判断：根据演出售票状态（售票中/已售罄/即将开演）返回对应状态标识</li>
                    </ul>
                  </li>
                  <li><strong>权限控制：</strong>无需特殊权限，所有用户均可浏览</li>
                  <li><strong>数据约束：</strong>仅展示已发布状态的演出；已下架或草稿状态演出不显示</li>
                  <li><strong>能力边界：</strong>不支持按价格区间筛选；不支持按地理位置筛选；不支持按日期范围筛选</li>
                </ul>`
            },
            {
                title: '交互说明',
                content: `<p><strong>分类标签切换</strong></p>
<ul>
  <li><strong>触发：</strong>点击水平滚动分类标签栏中的任意标签（全部/演唱会/话剧/音乐剧/体育赛事/儿童亲子/舞蹈芭蕾/脱口秀/展览），标签为圆角胶囊样式</li>
  <li><strong>执行中：</strong>被点击标签切换为渐变橙色背景（active态），演出列表区域显示骨架屏loading，同时发起分类筛选请求</li>
  <li><strong>成功：</strong>列表刷新为该分类下的演出卡片，按默认排序展示；若该分类无演出，显示空状态插画+"暂无相关演出"</li>
  <li><strong>失败：</strong>弹出toast"网络异常，请稍后重试"，保留当前分类标签选中态，列表保持上次成功加载的内容</li>
  <li><strong>边界条件：</strong>当前已是选中态的分类标签再次点击时不重复请求；切换分类时若正在加载中，取消上一次未完成的请求</li>
</ul>

<p><strong>搜索按钮点击</strong></p>
<ul>
  <li><strong>触发：</strong>点击导航栏右上角搜索图标按钮（搜索图标class：fa-magnifying-glass）</li>
  <li><strong>执行中：</strong>无loading，直接跳转</li>
  <li><strong>成功：</strong>跳转至 search.html 搜索页</li>
  <li><strong>失败：</strong>页面跳转失败时弹出toast"页面加载失败，请重试"</li>
  <li><strong>边界条件：</strong>无</li>
</ul>

<p><strong>演出卡片点击</strong></p>
<ul>
  <li><strong>触发：</strong>点击列表中任意演出卡片（封面图+名称+场馆+时间+价格区域）</li>
  <li><strong>执行中：</strong>卡片无loading态，直接跳转</li>
  <li><strong>成功：</strong>跳转至 show-detail.html?show_id=xxx 演出详情页</li>
  <li><strong>失败：</strong>跳转失败时弹出toast"页面加载失败，请重试"</li>
  <li><strong>边界条件：</strong>演出状态为"已售罄"时仍可点击进入详情页查看信息，但无法购票</li>
</ul>

<p><strong>下拉刷新</strong></p>
<ul>
  <li><strong>触发：</strong>在演出列表区域手指下拉超过阈值距离</li>
  <li><strong>执行中：</strong>顶部显示下拉loading动画，列表内容置灰不可操作</li>
  <li><strong>成功：</strong>loading动画消失，列表重新加载当前分类的最新数据，弹出toast"刷新成功"</li>
  <li><strong>失败：</strong>loading动画消失，弹出toast"刷新失败，请检查网络"，列表保持原有数据</li>
  <li><strong>边界条件：</strong>列表为空时仍支持下拉刷新；连续快速下拉只触发一次刷新请求</li>
</ul>

<p><strong>加载更多</strong></p>
<ul>
  <li><strong>触发：</strong>滚动列表至底部，触发上拉加载更多</li>
  <li><strong>执行中：</strong>列表底部显示loading动画（三个圆点跳动），同时发起分页请求</li>
  <li><strong>成功：</strong>新数据追加到列表末尾，loading动画消失；若已加载全部数据，底部显示"没有更多了"</li>
  <li><strong>失败：</strong>loading动画消失，弹出toast"加载失败，请重试"，保留已加载的数据</li>
  <li><strong>边界条件：</strong>列表总数小于分页大小时不显示加载更多；连续快速上拉只触发一次加载请求</li>
</ul>`
            },
            {
                title: '核心字段',
                noTableWrap: true,
                tables: [
                    {
                        title: '演出列表字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['show_id', 'number', '是', '演出唯一标识'],
                            ['title', 'string', '是', '演出名称'],
                            ['cover_image', 'string', '是', '封面图URL'],
                            ['category_name', 'string', '是', '分类名称，如"演唱会""话剧""音乐剧""体育赛事""儿童亲子""舞蹈芭蕾""脱口秀""展览"'],
                            ['show_time', 'string', '是', '演出时间'],
                            ['venue_name', 'string', '是', '场馆名称'],
                            ['min_price', 'number', '是', '最低票价'],
                            ['tag_badge', 'enum', '否', '封面角标类型：hot-热卖 / vip-会员 / new-新上，无则不显示'],
                            ['labels', 'array', '否', '底部标签数组，每项含text和cls（soon/member/discount）'],
                            ['status', 'enum', '是', '状态：1-售票中 2-已售罄 3-即将开演']
                        ]
                    }
                ]
            }
        ]
    },

    'user-miniapp/show-detail.html': {
        title: '演出详情页',
        subtitle: '演出信息 + 场次选择 + 评论 + 购票入口',
        sections: [
            {
                title: '功能描述',
                content: `<p><strong>核心功能：</strong>展示单个演出的完整信息，聚合演出基础信息、场次列表、评论内容和购票须知。用户选择场次后进入选座购票流程。系统根据用户会员等级判断优先购资格，在优先购时段内仅对符合条件的会员开放购票。</p>
                <p><strong>业务说明：</strong></p>
                <ul>
                  <li><strong>前置条件：</strong>演出数据已在后台录入并发布；用户需登录后才能收藏和购票；优先购功能仅限金卡及以上会员</li>
                  <li><strong>功能实现逻辑：</strong>
                    <ul>
                      <li>数据来源：演出基础信息、场次列表、评论数据分别从对应服务接口获取，按show_id聚合</li>
                  <li>场次状态：根据场次库存计算余票状态（库存>80%为"充足"、>50%为"热卖中"、>20%为"余票紧张"、<=19%为"即将售罄"、0为"已售罄"），结合当前时间判断优先购时段</li>
                  <li>优先购规则：优先购开始时间早于公开售票时间，仅限指定会员等级用户在优先购时段内购买</li>
                  <li>收藏状态：用户收藏数据关联用户ID和演出ID，切换收藏时调用收藏服务接口</li>
                    </ul>
                  </li>
                  <li><strong>权限控制：</strong>浏览演出详情无需登录；收藏和购票需登录；优先购需金卡及以上会员等级</li>
                  <li><strong>数据约束：</strong>已售罄场次不可选座；优先购时段内非目标等级会员无法购票；演出下架后页面不可访问</li>
                  <li><strong>能力边界：</strong>不支持直接在此页面完成支付；不支持场次时间修改；不支持退款操作</li>
                </ul>`
            },
            {
                title: '交互说明',
                content: `<p><strong>场次卡片选择</strong></p>
<ul>
  <li><strong>触发：</strong>点击水平滚动场次卡片中的任意场次（显示日期/星期/时间/价格/余票状态）</li>
  <li><strong>执行中：</strong>被点击场次卡片边框变为橙色高亮（selected态），其他场次取消高亮；底部"立即购票"按钮价格更新为该场次最低票价</li>
  <li><strong>成功：</strong>场次选中态保持，购票按钮可点击跳转</li>
  <li><strong>失败：</strong>若场次数据加载失败，弹出toast"场次信息加载失败"，场次区域显示重试按钮</li>
  <li><strong>边界条件：</strong>仅有一个场次时默认选中；场次状态为"已售罄"时不可点击选中，卡片置灰显示</li>
</ul>

<p><strong>分享按钮点击</strong></p>
<ul>
  <li><strong>触发：</strong>点击Hero大图区域右上角分享图标按钮（分享图标class：fa-share-nodes）</li>
  <li><strong>执行中：</strong>弹出底部分享面板（含"分享给朋友""分享到朋友圈""复制链接"选项）</li>
  <li><strong>成功：</strong>选择分享方式后关闭面板，弹出toast"已分享"或"链接已复制"</li>
  <li><strong>失败：</strong>分享接口调用失败时弹出toast"分享失败，请重试"</li>
  <li><strong>边界条件：</strong>未登录用户点击分享时先跳转登录页，登录成功后返回当前页并继续分享流程</li>
</ul>

<p><strong>详情/评论/须知 Tab 切换</strong></p>
<ul>
  <li><strong>触发：</strong>点击内容区顶部Tab栏中的"详情"/"评论"/"须知"标签</li>
  <li><strong>执行中：</strong>被点击Tab底部显示橙色下划线（选中态），内容区域切换为对应面板，切换过程无loading</li>
  <li><strong>成功：</strong>对应内容面板展示，评论Tab首次切换时加载评论列表数据</li>
  <li><strong>失败：</strong>评论数据加载失败时显示"加载失败，点击重试"按钮</li>
  <li><strong>边界条件：</strong>评论Tab无评论时显示空状态插画+"暂无评论"；当前已是选中态的Tab再次点击不重复加载</li>
</ul>

<p><strong>收藏（心愿单）切换</strong></p>
<ul>
  <li><strong>触发：</strong>点击底部操作栏左侧心愿单图标按钮（空心/实心 heart 图标）</li>
  <li><strong>执行中：</strong>图标切换动画（空心变实心或实心变空心），同时发起收藏/取消收藏请求</li>
  <li><strong>成功：</strong>弹出toast"已加入心愿单"或"已移出心愿单"，图标保持切换后的状态</li>
  <li><strong>失败：</strong>弹出toast"操作失败，请重试"，图标恢复为操作前的状态</li>
  <li><strong>边界条件：</strong>未登录用户点击时先跳转登录页，登录成功后自动完成收藏操作并返回当前页</li>
</ul>

<p><strong>立即购票</strong></p>
<ul>
  <li><strong>触发：</strong>点击底部操作栏右侧"立即购票"渐变橙色按钮（显示当前选中场次的最低票价）</li>
  <li><strong>执行中：</strong>按钮显示loading态，校验是否已选场次及用户登录状态</li>
  <li><strong>成功：</strong>跳转至 seat-selection.html?show_id=xxx&session_id=xxx 选座购票页</li>
  <li><strong>失败：</strong>未选择场次时弹出toast"请先选择场次"；未登录时跳转登录页</li>
  <li><strong>边界条件：</strong>演出状态为"已售罄"时按钮置灰不可点击；优先购场次需校验会员等级权限，无权限时弹出toast"金卡会员可优先购买"</li>
</ul>

<p><strong>返回上一页</strong></p>
<ul>
  <li><strong>触发：</strong>点击导航栏左侧返回箭头图标按钮</li>
  <li><strong>执行中：</strong>无loading，直接返回</li>
  <li><strong>成功：</strong>返回 show-list-detail.html 演出列表页（或进入详情页前的上一个页面）</li>
  <li><strong>失败：</strong>无</li>
  <li><strong>边界条件：</strong>无历史页面时返回首页 home.html</li>
</ul>

<p><strong>场馆导航</strong></p>
<ul>
  <li><strong>触发：</strong>点击场馆信息区域的"导航"按钮或地址文字</li>
  <li><strong>执行中：</strong>弹出toast"正在打开导航..."</li>
  <li><strong>成功：</strong>调起系统地图应用或微信小程序地图导航至场馆地址</li>
  <li><strong>失败：</strong>无法调起地图时弹出toast"无法打开导航，请检查地图应用"</li>
  <li><strong>边界条件：</strong>场馆地址为空时不显示导航按钮</li>
</ul>`
            },
            {
                title: '核心字段',
                noTableWrap: true,
                tables: [
                    {
                        title: '演出详情字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['show_id', 'number', '是', '演出唯一标识'],
                            ['title', 'string', '是', '演出名称'],
                            ['images[]', 'array', '是', '演出图片列表，最多9张'],
                            ["tags[]", "array", "是", "标签数组，如[\"演唱会\",\"约150分钟\",\"中文\"]"],
                            ['rating', 'number', '是', '评分，0-5分'],
                            ['duration', 'number', '是', '演出时长（分钟）'],
                            ["children_ticket", "string", "是", "儿童入场规则，如\"儿童全票\""],
                            ['description', 'string', '是', '演出详情富文本'],
                            ['is_favorited', 'boolean', '是', '是否已收藏'],
                            ['show_type', 'string', '是', '演出类型标签，如"演唱会"'],
                            ['early_bird_discount', 'string', '否', '早鸟折扣信息，如"8.5折"'],
                            ['early_bird_end_time', 'string', '否', '早鸟结束时间（倒计时显示）'],
                            ['is_priority', 'boolean', '否', '是否有会员优先购'],
                            ['priority_start_time', 'string', '否', '会员优先购票开始时间']
                        ]
                    },
                    {
                        title: '场次字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['session_id', 'number', '是', '场次唯一标识'],
                            ['show_date', 'string', '是', '演出日期'],
                            ['show_time', 'string', '是', '演出时间'],
                            ['weekday', 'string', '是', '星期几'],
                            ['min_price', 'number', '是', '最低票价'],
                            ['remaining_seats', 'number', '是', '剩余座位数'],
                            ['status_text', 'string', '是', '余票状态文字，如"热卖中""余票紧张""充足""早鸟票"'],
                            ['is_early_bird', 'boolean', '否', '是否为早鸟场次（黄色渐变背景样式）'],
                            ['is_priority', 'boolean', '否', '是否为优先购专属场次']
                        ]
                    },
                    {
                        title: '场馆信息字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['venue_name', 'string', '是', '场馆名称'],
                            ['venue_address', 'string', '是', '场馆地址'],
                            ['venue_image', 'string', '否', '场馆图片URL'],
                            ['latitude', 'number', '是', '纬度'],
                            ['longitude', 'number', '是', '经度']
                        ]
                    },
                    {
                        title: '评论字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['comment_id', 'number', '是', '评论唯一标识'],
                            ['user_avatar', 'string', '是', '评论者头像URL'],
                            ['user_name', 'string', '是', '评论者昵称'],
                            ['rating', 'number', '是', '评论评分'],
                            ['content', 'string', '是', '评论内容'],
                            ['images[]', 'array', '否', '评论图片列表'],
                            ['create_time', 'string', '是', '评论时间']
                        ]
                    },
                    {
                        title: '场次状态',
                        headers: ['库存比例', '状态名称', '颜色', '说明'],
                        rows: [
                            ['> 80%', '充足', '绿色', '余票充足，正常售票'],
                            ['> 50%', '热卖中', '橙色', '热推场次，库存充足'],
                            ['> 20%', '余票紧张', '黄色', '余票较少，建议尽快购买'],
                            ['<= 19%', '即将售罄', '红色', '仅剩少量余票'],
                            ['0', '已售罄', '灰色', '无余票，不可选座']
                        ]
                    }
                ]
            }
        ]
    },

    'user-miniapp/seat-selection.html': {
        title: '选座购票页',
        subtitle: '座位矩阵 + 缩放 + 票档筛选 + 优惠券/套票 + 早鸟票',
        sections: [
            {
                title: '功能描述',
                content: `<p><strong>核心功能：</strong>可视化座位选择，支持多票档切换、缩放控制、早鸟票展示、优惠券和套票观演券抵扣，选座后跳转确认订单页面。选择座位时自动匹配对应票档的可用观演券，支持多张观演券同时使用。</p>
                <p><strong>业务说明：</strong></p>
                <ul>
                    <li><strong>前置条件：</strong>用户已登录，从演出详情页点击"立即购买"进入，携带session_id参数</li>
                    <li><strong>功能实现逻辑：</strong>
                        <ul>
                            <li>座位图：根据场次ID获取座位布局数据，渲染矩阵式座位图，4种状态（可选/已售/已选/VIP）</li>
                            <li>票档筛选：按区域分区展示（VIP区/A区/B区/C区），有可用观演券的票档显示"套票"徽章，点击切换后座位图自动定位到对应区域</li>
                            <li>早鸟票展示：前7天购票展示早鸟特惠标识，横幅显示"早鸟特惠 9.5折"及"-5%"徽章；价格明细中始终显示"票品折扣（早鸟票9.5折）"行及具体优惠金额；标签栏和座位价格保持原价不变，早鸟票仅做展示不影响真实价格计算</li>
                            <li>会员折扣：价格明细中始终显示"黄金会员9折"行及具体优惠金额（座位价格的10%），不受套票影响</li>
                            <li>优惠券：底部弹窗选择优惠券，需满足最低消费金额，选中后全额抵扣</li>
                            <li>套票观演券：底部弹窗选择观演券，观演券绑定指定演出+指定票档双重条件，匹配对应票档座位全额减免；选择座位时自动匹配可用观演券，取消座位时自动解绑</li>
                            <li>价格计算：最终金额 = 原价总额 - 优惠券抵扣 - 套票观演券抵扣（多张可叠加）</li>
                            <li>座位锁定：选座后自动锁定15分钟，超时释放并提示重新选座</li>
                        </ul>
                    </li>
                    <li><strong>数据约束：</strong>不限制选座数量；优惠券需满足使用条件（最低消费金额）；观演券需匹配当前演出和对应票档</li>
                    <li><strong>能力边界：</strong>不支持跨场次选座；不支持选座后修改场次；观演券仅减免对应票档的一张座位</li>
                </ul>`
            },
            {
                title: '交互说明',
                content: `<p><strong>点击座位</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击可选座位（白色）</li>
                    <li><strong>执行中：</strong>座位变为已选状态（主题色），已选座位面板更新，自动匹配对应票档的可用观演券</li>
                    <li><strong>成功：</strong>价格实时重新计算，套票入口显示已匹配观演券数量</li>
                    <li><strong>边界条件：</strong>已售座位不可点击</li>
                </ul>
                <p><strong>取消选座</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击已选座位或已选座位面板中的"x"按钮</li>
                    <li><strong>执行中：</strong>座位恢复可选状态，自动解绑关联的观演券</li>
                    <li><strong>成功：</strong>价格重新计算，套票入口状态更新</li>
                </ul>
                <p><strong>切换票档</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击票档选择栏中的区域标签</li>
                    <li><strong>成功：</strong>座位图自动定位到对应区域，高亮该区域座位</li>
                </ul>
                <p><strong>使用优惠券</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击"使用优惠券"入口</li>
                    <li><strong>执行中：</strong>底部滑出优惠券选择弹窗，显示可用/不可用优惠券列表</li>
                    <li><strong>成功：</strong>选中优惠券后价格重新计算，显示优惠减免金额</li>
                    <li><strong>边界条件：</strong>未选座位时提示"请先选择座位"；订单金额不满足最低消费时优惠券显示为禁用</li>
                </ul>
                <p><strong>使用套票</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击"使用套票"入口</li>
                    <li><strong>执行中：</strong>底部滑出观演券选择弹窗，显示所有观演券（本场演出可用/非本场演出禁用/已使用禁用），每张显示票档、演出名称、价值、有效期</li>
                    <li><strong>成功：</strong>选中观演券后匹配对应票档座位全额减免，价格重新计算</li>
                    <li><strong>边界条件：</strong>未选座位时提示"请先选择座位"；非本场演出观演券标注"限「演出名」使用"；未选对应票档座位时标注"需选择X区座位才可使用"</li>
                </ul>
                <p><strong>确认选座</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击底部"确认选座"按钮</li>
                    <li><strong>执行中：</strong>校验选座数量，锁定座位</li>
                    <li><strong>成功：</strong>携带演出名称/时间/场馆/座位数据/观演券信息跳转 order-confirm.html</li>
                    <li><strong>边界条件：</strong>未选座位时按钮禁用</li>
                </ul>`
            },
            {
                title: '核心字段',
                noTableWrap: true,
                tables: [
                    {
                        title: '座位字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['seat_id', 'number', '是', '座位唯一标识'],
                            ['row', 'number', '是', '行号'],
                            ['col', 'number', '是', '列号'],
                            ['status', 'enum', '是', '状态：0-可选 1-已售 2-已选 3-VIP'],
                            ['tier', 'string', '是', '票档标识：vip/a/b/c'],
                            ['tier_name', 'string', '是', '票档名称，如"VIP区""A区"'],
                            ['price', 'number', '是', '座位票价（元）'],
                            ['original_price', 'number', '否', '座位原价（元），早鸟票折扣前价格']
                        ]
                    },
                    {
                        title: '订单价格字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['selected_seats', 'array', '是', '已选座位数组'],
                            ['original_amount', 'number', '是', '原价总额（元）'],
                            ['early_bird_discount', 'number', '否', '早鸟票展示优惠金额（元），仅展示不影响计算'],
                            ['member_discount', 'number', '否', '黄金会员9折优惠金额（元），仅展示不影响计算'],
                            ['coupon_discount', 'number', '否', '优惠券抵扣金额（元）'],
                            ['package_deduction', 'number', '否', '套票观演券抵扣金额（元），多张可叠加'],
                            ['final_amount', 'number', '是', '最终支付金额（元）']
                        ]
                    },
                    {
                        title: '观演券字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['voucher_id', 'string', '是', '观演券唯一标识'],
                            ['package_id', 'string', '是', '所属套票ID'],
                            ['package_name', 'string', '是', '套票名称'],
                            ['show_id', 'string', '是', '绑定演出ID'],
                            ['tier', 'string', '是', '绑定票档：vip/a/b/c'],
                            ['tier_name', 'string', '是', '票档名称'],
                            ['amount', 'number', '是', '观演券价值（元）'],
                            ['expire', 'string', '是', '有效期，格式YYYY-MM-DD'],
                            ['used', 'boolean', '是', '是否已使用']
                        ]
                    }
                ]
            }
        ]
    },

    'user-miniapp/theater-detail.html': {
        title: '剧院详情页',
        subtitle: '剧院信息 + 演出厅 + 当前演出',
        sections: [
            {
                title: '功能描述',
                content: `<p><strong>核心功能：</strong>展示剧院详细信息、演出厅列表、当前演出列表，支持从首页剧院卡片或剧院列表进入。</p>
                <p><strong>业务说明：</strong></p>
                <ul>
                    <li><strong>前置条件：</strong>从首页剧院卡片或剧院列表点击进入，携带theater_id参数</li>
                    <li><strong>功能实现逻辑：</strong>
                        <ul>
                            <li>剧院信息：根据theater_id获取剧院详情，展示封面大图、名称、地址、电话、营业时间、简介</li>
                            <li>统计卡片：展示总座位数、演出厅数量、近期演出数量、座位分区数</li>
                            <li>演出厅列表：展示该剧院下所有演出厅的座位数、分区数、特色</li>
                            <li>当前演出：展示在该剧院举办的近期演出，按演出时间排序</li>
                        </ul>
                    </li>
                    <li><strong>数据约束：</strong>剧院必须有至少1个演出厅；当前演出只展示未结束的演出</li>
                    <li><strong>能力边界：</strong>不支持在线预订演出厅；不支持查看历史演出</li>
                </ul>`
            },
            {
                title: '交互说明',
                content: `<p><strong>点击当前演出卡片</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击演出卡片或"去购票"按钮</li>
                    <li><strong>成功：</strong>跳转 show-detail.html?show_id=xxx</li>
                </ul>
                <p><strong>返回上一页</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击左上角返回箭头</li>
                    <li><strong>成功：</strong>返回上一页（首页或剧院列表）</li>
                </ul>`
            },
            {
                title: '核心字段',
                noTableWrap: true,
                tables: [
                    {
                        title: '剧院字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['theater_id', 'number', '是', '剧院唯一标识'],
                            ['name', 'string', '是', '剧院名称'],
                            ['address', 'string', '是', '剧院地址'],
                            ['phone', 'string', '是', '联系电话'],
                            ['cover_image', 'string', '是', '剧院封面图URL'],
                            ['total_seats', 'number', '是', '总座位数'],
                            ['hall_count', 'number', '是', '演出厅数量'],
                            ['show_count', 'number', '是', '近期演出数量'],
                            ['zone_count', 'number', '是', '座位分区数量'],
                            ['description', 'string', '否', '剧院简介'],
                            ['business_hours', 'string', '否', '营业时间']
                        ]
                    },
                    {
                        title: '演出厅字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['hall_id', 'number', '是', '演出厅唯一标识'],
                            ['hall_name', 'string', '是', '演出厅名称'],
                            ['seat_count', 'number', '是', '座位数量'],
                            ['zone_count', 'number', '是', '座位分区数'],
                            ['feature', 'string', '否', '演出厅特色描述']
                        ]
                    }
                ]
            }
        ]
    },

    'user-miniapp/order-confirm.html': {
        title: '确认订单页',
        subtitle: '演出信息 + 已选座位 + 费用明细 + 混合支付',
        sections: [
            {
                title: '功能描述',
                content: `<p><strong>核心功能：</strong>展示选座后的订单确认信息，包含演出详情、已选座位、费用明细、取票人信息和多种支付方式（微信支付/钱包/充值卡/积分），支持混合支付模式，各抵扣方式可同时启用，剩余不足部分自动用微信支付补足。</p>
                <p><strong>业务说明：</strong></p>
                <ul>
                    <li><strong>前置条件：</strong>从选座页面跳转进入，携带演出信息、座位数据和观演券信息</li>
                    <li><strong>功能实现逻辑：</strong>
                        <ul>
                            <li>演出信息：展示演出封面、名称、时间、场馆、时长</li>
                            <li>已选座位：列出每个座位的分区、排号、座号、单价，显示票档名称（tier字段）</li>
                            <li>费用明细：商品总价 - 票品折扣（早鸟票9.5折）- 黄金会员9折 - 观演券抵扣 = 应付金额；早鸟票折扣行始终显示具体优惠金额（非VIP座位原价的5%），仅做展示不影响实际计算；会员折扣行始终显示具体优惠金额（座位价格的10%）</li>
                            <li>取票人信息：姓名、手机号、身份证号，电子票通过短信发送至该手机号</li>
                            <li>支付方式：支持4种支付方式混合使用
                                <ul>
                                    <li>微信支付：始终显示，自动计算并补足其他方式抵扣后的剩余金额</li>
                                    <li>钱包支付：可输入使用金额，支持"全部使用"按钮，可用余额不足时显示实际可用金额</li>
                                    <li>充值卡支付：支持多选充值卡组合支付，显示每张卡的余额和卡号</li>
                                    <li>积分抵扣：可输入使用积分，支持"全部使用"按钮，最多抵扣订单金额的10%（1积分=0.01元）</li>
                                </ul>
                            </li>
                            <li>混合支付计算：应付金额依次扣除积分抵扣、充值卡抵扣、钱包支付，剩余金额由微信支付补足；若全部抵扣后金额为0，显示"已全额抵扣，无需微信支付"</li>
                        </ul>
                    </li>
                    <li><strong>数据约束：</strong>取票人姓名不能为空；手机号需符合11位手机号格式；身份证号需符合18位格式；至少选择1个座位；积分抵扣上限为订单金额的10%</li>
                    <li><strong>能力边界：</strong>不支持修改已选座位（需返回选座页修改）；不支持部分退款；充值卡不可充值</li>
                </ul>`
            },
            {
                title: '交互说明',
                content: `<p><strong>切换支付方式</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击钱包支付/充值卡支付/积分抵扣选项</li>
                    <li><strong>执行中：</strong>选中项显示勾选图标，展开对应输入区域（钱包输入金额/充值卡列表/积分输入框）</li>
                    <li><strong>成功：</strong>支付方式状态切换，应付金额实时重新计算</li>
                    <li><strong>边界条件：</strong>微信支付始终选中不可取消，作为兜底支付方式</li>
                </ul>
                <p><strong>钱包支付输入</strong></p>
                <ul>
                    <li><strong>触发：</strong>在钱包输入框输入金额，或点击"全部使用"按钮</li>
                    <li><strong>执行中：</strong>输入金额自动限制不超过可用余额和剩余应付金额；点击"全部使用"自动填入最大可用金额</li>
                    <li><strong>成功：</strong>显示抵扣金额，应付金额重新计算</li>
                </ul>
                <p><strong>充值卡选择</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击充值卡列表中的卡片</li>
                    <li><strong>执行中：</strong>卡片切换选中/未选中状态，显示勾选标记</li>
                    <li><strong>成功：</strong>显示充值卡合计抵扣金额，应付金额重新计算</li>
                    <li><strong>边界条件：</strong>支持多张充值卡同时选中，抵扣金额不超过应付金额</li>
                </ul>
                <p><strong>积分抵扣输入</strong></p>
                <ul>
                    <li><strong>触发：</strong>在积分输入框输入积分数量，或点击"全部使用"按钮</li>
                    <li><strong>执行中：</strong>输入积分自动限制不超过可用积分和订单金额10%上限；点击"全部使用"自动填入最大可用积分</li>
                    <li><strong>成功：</strong>显示积分抵扣金额（积分×0.01），应付金额重新计算</li>
                </ul>
                <p><strong>确认支付</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击底部"确认支付"按钮</li>
                    <li><strong>执行中：</strong>校验取票人姓名、手机号、身份证号格式</li>
                    <li><strong>成功：</strong>提交订单，跳转订单列表页</li>
                    <li><strong>失败：</strong>校验失败时提示"请填写正确的取票人信息"</li>
                    <li><strong>边界条件：</strong>未选座位时按钮禁用；网络异常时提示"网络错误，请重试"</li>
                </ul>
                <p><strong>返回选座</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击左上角返回箭头</li>
                    <li><strong>成功：</strong>返回选座页面，保留已选座位状态</li>
                </ul>`
            },
            {
                title: '核心字段',
                noTableWrap: true,
                tables: [
                    {
                        title: '订单字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['show_name', 'string', '是', '演出名称'],
                            ['show_date', 'string', '是', '演出日期时间，格式YYYY-MM-DD HH:mm'],
                            ['show_venue', 'string', '是', '场馆名称'],
                            ['seats', 'array', '是', '已选座位列表'],
                            ['seat_zone', 'string', '是', '座位所属分区'],
                            ['seat_row', 'number', '是', '座位排号'],
                            ['seat_col', 'number', '是', '座位列号'],
                            ['seat_price', 'number', '是', '单座票价（元）'],
                            ['original_amount', 'number', '是', '原价总额（元）'],
                            ['early_bird_discount', 'number', '否', '早鸟票9.5折展示优惠金额（元），仅展示不影响计算'],
                            ['member_discount', 'number', '否', '黄金会员9折展示优惠金额（元），仅展示不影响计算'],
                            ['voucher_deduction', 'number', '否', '观演券抵扣金额（元）'],
                            ['final_amount', 'number', '是', '最终支付金额（元）'],
                            ['contact_name', 'string', '是', '取票人姓名'],
                            ['contact_phone', 'string', '是', '取票人手机号'],
                            ['contact_idcard', 'string', '是', '取票人身份证号'],
                            ['payment_methods', 'array', '是', '支付方式列表，包含type和amount']
                        ]
                    },
                    {
                        title: '支付方式字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['wechat_pay', 'number', '否', '微信支付金额（元），自动计算剩余金额'],
                            ['wallet_pay', 'number', '否', '钱包支付金额（元），用户输入'],
                            ['wallet_balance', 'number', '是', '钱包可用余额（元）'],
                            ['recharge_cards', 'array', '否', '选中的充值卡列表'],
                            ['card_deduction', 'number', '否', '充值卡合计抵扣金额（元）'],
                            ['points_used', 'number', '否', '使用积分数量'],
                            ['points_deduction', 'number', '否', '积分抵扣金额（元），积分×0.01'],
                            ['points_max_percent', 'number', '是', '积分抵扣上限比例，默认0.10（10%）']
                        ]
                    }
                ]
            }
        ]
    },

    'user-miniapp/search.html': {
        title: '搜索页',
        subtitle: '关键词搜索 + 搜索建议 + 历史 + 热门',
        sections: [
            {
                title: '功能描述',
                content: `<p><strong>核心功能：</strong>提供演出全局搜索能力，用户输入关键词后系统对演出名称、类型、场馆进行模糊匹配，返回匹配的演出列表。搜索历史保存在本地存储中，支持快捷复用历史关键词。热门搜索按搜索频次排序，帮助用户发现热门演出。</p>
                <p><strong>业务说明：</strong></p>
                <ul>
                  <li><strong>前置条件：</strong>用户已登录或处于游客状态；演出数据已在后台录入并发布</li>
                  <li><strong>功能实现逻辑：</strong>
                    <ul>
                      <li>数据来源：从演出库中查询已发布的演出数据，对演出名称、类型、场馆字段进行模糊匹配</li>
                      <li>搜索建议：输入过程中实时请求接口返回最多5条匹配建议，按相关度排序</li>
                      <li>历史记录：搜索历史存储在本地，最多保留10条，新搜索去重后插入队首</li>
                      <li>热门搜索：按全站用户搜索频次统计Top关键词，定时更新缓存</li>
                    </ul>
                  </li>
                  <li><strong>权限控制：</strong>无需特殊权限，所有用户均可使用搜索功能</li>
                  <li><strong>数据约束：</strong>仅搜索已发布状态的演出；空关键词不触发搜索；无匹配结果时返回空列表</li>
                  <li><strong>能力边界：</strong>不支持按价格区间搜索；不支持按日期范围搜索；不支持搜索已下架演出</li>
                </ul>`
            },
            {
                title: '交互说明',
                content: `<p><strong>输入搜索关键词</strong></p>
<ul>
  <li><strong>触发：</strong>在搜索输入框中输入任意字符（输入即触发，无需回车）</li>
  <li><strong>执行中：</strong>搜索建议面板从输入框下方下拉展开，显示最多5条匹配结果，关键词高亮显示，每条右侧显示类型标签</li>
  <li><strong>成功：</strong>建议面板展示匹配的演出名称列表，点击任意建议可跳转搜索结果</li>
  <li><strong>失败：</strong>无匹配结果时建议面板显示"暂无相关建议"</li>
  <li><strong>边界条件：</strong>输入为空时收起建议面板，恢复显示历史+热门区域；连续输入时防抖300ms后发起请求</li>
</ul>

<p><strong>回车/点击建议执行搜索</strong></p>
<ul>
  <li><strong>触发：</strong>在搜索框中按回车键，或点击搜索建议面板中的某条建议</li>
  <li><strong>执行中：</strong>收起建议面板，页面切换至搜索结果列表区域，显示骨架屏loading</li>
  <li><strong>成功：</strong>搜索结果列表展示（封面图+名称+类型标签+场馆+时间+价格+labels），顶部显示"共x个结果"；同时将关键词保存至搜索历史（localStorage最多10条，新关键词插入头部，重复关键词移至头部）</li>
  <li><strong>失败：</strong>弹出toast"搜索失败，请稍后重试"，显示空状态插画</li>
  <li><strong>边界条件：</strong>搜索关键词超过50个字符时截断至50字符；搜索结果为空时显示空状态插画+"未找到相关演出"+"换个关键词试试吧"</li>
</ul>

<p><strong>点击搜索历史标签</strong></p>
<ul>
  <li><strong>触发：</strong>点击搜索历史区域中的任意历史标签</li>
  <li><strong>执行中：</strong>该关键词回填至搜索输入框，收起历史+热门区域，显示搜索结果loading</li>
  <li><strong>成功：</strong>展示该关键词的搜索结果列表，该历史标签移至历史列表头部</li>
  <li><strong>失败：</strong>弹出toast"搜索失败，请稍后重试"</li>
  <li><strong>边界条件：</strong>历史记录为空时不显示历史区域；历史标签文字超长时显示省略号</li>
</ul>

<p><strong>删除单条搜索历史</strong></p>
<ul>
  <li><strong>触发：</strong>点击历史标签右侧的删除图标按钮（x图标）</li>
  <li><strong>执行中：</strong>该条历史记录从列表中移除，同步更新localStorage</li>
  <li><strong>成功：</strong>历史列表重新渲染，无toast提示</li>
  <li><strong>失败：</strong>localStorage写入失败时不影响UI展示，下次进入页面时该记录可能恢复</li>
  <li><strong>边界条件：</strong>删除后历史记录为空时，整个历史区域隐藏，只显示热门搜索</li>
</ul>

<p><strong>清空全部搜索历史</strong></p>
<ul>
  <li><strong>触发：</strong>点击搜索历史区域右上角的"清空"文字按钮</li>
  <li><strong>执行中：</strong>弹出确认弹窗"确定清空全部搜索历史？"</li>
  <li><strong>成功：</strong>关闭确认弹窗，清空localStorage中的搜索历史，历史区域隐藏，弹出toast"搜索历史已清空"</li>
  <li><strong>失败：</strong>localStorage操作失败时弹出toast"操作失败，请重试"</li>
  <li><strong>边界条件：</strong>历史记录为空时"清空"按钮不显示或置灰不可点击</li>
</ul>

<p><strong>取消按钮点击</strong></p>
<ul>
  <li><strong>触发：</strong>点击搜索导航栏右侧"取消"文字按钮</li>
  <li><strong>执行中：</strong>若输入框有内容，清空输入框内容并收起建议面板，恢复历史+热门区域；若输入框为空，直接跳转</li>
  <li><strong>成功：</strong>输入框为空时跳转至 home.html 首页</li>
  <li><strong>失败：</strong>无</li>
  <li><strong>边界条件：</strong>无</li>
</ul>

<p><strong>搜索结果卡片点击</strong></p>
<ul>
  <li><strong>触发：</strong>点击搜索结果列表中的任意演出卡片</li>
  <li><strong>执行中：</strong>无loading，直接跳转</li>
  <li><strong>成功：</strong>跳转至 show-detail.html?show_id=xxx 演出详情页</li>
  <li><strong>失败：</strong>跳转失败时弹出toast"页面加载失败，请重试"</li>
  <li><strong>边界条件：</strong>无</li>
</ul>`
            },
            {
                title: '核心字段',
                noTableWrap: true,
                tables: [
                    {
                        title: '搜索结果字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['keyword', 'string', '是', '搜索关键词'],
                            ['show_id', 'number', '是', '演出唯一标识'],
                            ['title', 'string', '是', '演出名称'],
                            ['cover_image', 'string', '是', '封面图URL'],
                            ['type', 'string', '是', '演出类型，如"演唱会""音乐剧""舞蹈芭蕾"等'],
                            ['type_icon', 'string', '是', '类型图标class，如"fa-music""fa-masks-theater"'],
                            ['venue_name', 'string', '是', '场馆名称'],
                            ['show_time', 'string', '是', '演出时间'],
                            ['min_price', 'number', '是', '最低票价'],
                            ['badge', 'enum', '否', '封面角标：hot/vip/new，空则不显示'],
                            ['labels', 'array', '否', '底部标签数组，每项含text和cls']
                        ]
                    },
                    {
                        title: '搜索建议字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['suggestion_list[]', 'array', '是', '搜索建议列表，最多5条'],
                            ['hot_keywords[]', 'array', '是', '热门搜索关键词列表'],
                            ['search_history[]', 'array', '否', '搜索历史记录，最多10条']
                        ]
                    }
                ]
            }
        ]
    },

    'user-miniapp/member-center.html': {
        title: '会员中心',
        subtitle: '会员卡片 + 推荐有礼 + 等级权益 + 专属购票',
        sections: [
            {
                title: '功能描述',
                content: `<p><strong>核心功能：</strong>展示用户会员等级、成长值进度和会员权益，提供会员专属购票、推荐有奖功能。系统根据用户成长值计算当前等级和升级进度，不同等级对应不同的购票折扣、积分倍数和优先购权益。</p>
                <p><strong>业务说明：</strong></p>
                <ul>
                  <li><strong>前置条件：</strong>用户已登录；会员等级和成长值数据由系统在用户消费、签到等行为后自动计算更新</li>
                  <li><strong>功能实现逻辑：</strong>
                    <ul>
                      <li>等级体系：普通(0)->银卡(1000)->金卡(5000)->钻石(20000)，按成长值区间划分</li>
                      <li>成长值来源：购票消费（按比例返还）、每日签到、发布评论、分享演出、邀请好友注册</li>
                      <li>权益计算：等级折扣（银95折/金9折/钻石85折）、积分倍数（银1.2x/金1.5x/钻石2x）、优先购（金卡优先5天）</li>
                      <li>会员专属购票：展示设置了优先购的演出，显示距公开售票倒计时，金卡会员可提前优先选座</li>
                      <li>推荐有礼：好友通过邀请链接注册并充值800元（原价1000元开通银卡），好友获得银卡会员，推荐者获得1000成长值</li>
                    </ul>
                  </li>
                  <li><strong>权限控制：</strong>需登录后才能查看会员中心；优先购权益仅限金卡及以上会员</li>
                  <li><strong>数据约束：</strong>成长值不会为负数；等级只升不降</li>
                  <li><strong>能力边界：</strong>不支持手动调整成长值；不支持降级操作；不支持跨等级继承权益</li>
                </ul>`
            },
            {
                title: '交互说明',
                content: `<p><strong>充值升级</strong></p>
<ul>
  <li><strong>触发：</strong>点击成长值进度条右侧的"充值升级"按钮（金色渐变小按钮）</li>
  <li><strong>执行中：</strong>无loading，直接跳转</li>
  <li><strong>成功：</strong>跳转至 recharge-topup.html 充值页面</li>
  <li><strong>失败：</strong>跳转失败时弹出toast"页面加载失败，请重试"</li>
  <li><strong>边界条件：</strong>未登录用户点击时先跳转登录页</li>
</ul>

<p><strong>推荐有礼 Banner 点击</strong></p>
<ul>
  <li><strong>触发：</strong>点击会员卡区域下方的推荐有礼 Banner（显示"赠送1000成长值"，右上角"限时"徽章）</li>
  <li><strong>执行中：</strong>从底部滑出推荐有礼详情弹窗，背景遮罩渐变显示</li>
  <li><strong>成功：</strong>弹窗展示双方奖励（推荐者+1000成长值，好友¥800开通银卡原价¥1000立省¥200）和三步规则说明</li>
  <li><strong>失败：</strong>弹窗打开失败时无响应，不影响页面其他功能</li>
  <li><strong>边界条件：</strong>点击弹窗外部区域或右上角关闭按钮可关闭弹窗；弹窗打开时页面禁止滚动</li>
</ul>

<p><strong>生成推荐海报</strong></p>
<ul>
  <li><strong>触发：</strong>点击推荐有礼弹窗内的"生成海报"按钮（渐变金色主按钮）</li>
  <li><strong>执行中：</strong>先关闭推荐有礼弹窗，200ms后打开海报预览弹窗</li>
  <li><strong>成功：</strong>海报弹窗展示完整邀请海报（AI生成背景图、新用户视角文案、¥1000→¥800价格对比、银卡权益预览、二维码），底部提供"关闭"和"下载海报"按钮</li>
  <li><strong>失败：</strong>海报弹窗打开失败时无响应</li>
  <li><strong>边界条件：</strong>海报文案从新用户视角出发（"你有一份银卡会员专属特惠待领取"）；点击弹窗外部或关闭按钮可关闭</li>
</ul>

<p><strong>下载海报</strong></p>
<ul>
  <li><strong>触发：</strong>点击海报弹窗底部的"下载海报"按钮（金色渐变主按钮）</li>
  <li><strong>执行中：</strong>按钮显示loading态"生成中..."并禁用点击</li>
  <li><strong>成功：</strong>按钮文字变为"已保存"并显示绿色背景，2秒后恢复原始状态</li>
  <li><strong>失败：</strong>弹出toast"海报保存失败，请重试"</li>
  <li><strong>边界条件：</strong>生成中按钮不可重复点击</li>
</ul>

<p><strong>复制推荐链接</strong></p>
<ul>
  <li><strong>触发：</strong>点击推荐有礼弹窗内的"复制链接"按钮（灰色 secondary 按钮）</li>
  <li><strong>执行中：</strong>将带用户邀请码的推广链接复制至剪贴板</li>
  <li><strong>成功：</strong>按钮文字变为"已复制"并显示绿色背景，2秒后恢复原始状态</li>
  <li><strong>失败：</strong>剪贴板写入失败时弹出toast"复制失败，请重试"</li>
  <li><strong>边界条件：</strong>未登录用户点击时先跳转登录页；部分浏览器不支持剪贴板API时降级为手动选中链接文本</li>
</ul>

<p><strong>会员权益横向滚动</strong></p>
<ul>
  <li><strong>触发：</strong>页面加载时自动渲染权益卡片，用户左右滑动浏览</li>
  <li><strong>执行中：</strong>以横向滚动卡片展示所有会员权益，已解锁权益显示金色边框和渐变背景，未解锁权益显示灰色半透明和锁图标</li>
  <li><strong>成功：</strong>权益卡片完整展示，已解锁和未解锁状态清晰区分</li>
  <li><strong>失败：</strong>无</li>
  <li><strong>边界条件：</strong>当前金卡会员展示5个已解锁权益（优先购票/等级折扣/每月发券/生日赠礼/实体卡）和4个未解锁权益（专属客服/积分加成/免费改签/赠票额度，钻石专享）；实体卡权益可点击跳转申请页</li>
</ul>

<p><strong>会员专属购票 - 优先选座</strong></p>
<ul>
  <li><strong>触发：</strong>点击会员专属购票区演出卡片的"优先选座"按钮（橙红色渐变按钮，带皇冠图标和光泽动画）</li>
  <li><strong>执行中：</strong>无loading，直接跳转</li>
  <li><strong>成功：</strong>跳转至 seat-selection.html 选座购票页面</li>
  <li><strong>失败：</strong>跳转失败时弹出toast"页面加载失败，请重试"</li>
  <li><strong>边界条件：</strong>每张演出卡片展示演出名称/时间/地点/标签（热门/经典等）、金卡折扣标签、价格（会员价和原价删除线）、距公开售票倒计时</li>
</ul>`
            },
            {
                title: '核心字段',
                noTableWrap: true,
                tables: [
                    {
                        title: '会员信息字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['avatar', 'string', '是', '用户头像URL'],
                            ['nickname', 'string', '是', '用户昵称'],
                            ['member_level', 'enum', '是', '会员等级：0-普通 1-银卡 2-金卡 3-钻石卡'],
                            ['growth_value', 'number', '是', '当前成长值'],
                            ['growth_target', 'number', '是', '升级所需成长值']
                        ]
                    },
                    {
                        title: '会员权益字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['benefit_id', 'number', '是', '权益唯一标识'],
                            ['name', 'string', '是', '权益名称，如"优先购票""等级折扣"'],
                            ['icon', 'string', '是', '权益图标'],
                            ['description', 'string', '是', '权益说明'],
                            ['is_available', 'boolean', '是', '当前等级是否可用'],
                            ['action_url', 'string', '否', '可点击权益的跳转链接，如实体卡申请页']
                        ]
                    },
                    {
                        title: '推荐有礼字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['invite_code', 'string', '是', '用户邀请码'],
                            ['referrer_reward', 'number', '是', '推荐者奖励成长值，如1000'],
                            ['friend_reward_level', 'enum', '是', '好友获得等级：1-银卡'],
                            ['friend_recharge_amount', 'number', '是', '好友需充值金额，如800'],
                            ['original_price', 'number', '是', '银卡原价，如1000'],
                            ['invite_link', 'string', '是', '带邀请码的推广链接']
                        ]
                    },
                    {
                        title: '会员专属购票字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['show_id', 'number', '是', '演出唯一标识'],
                            ['title', 'string', '是', '演出名称'],
                            ['cover_image', 'string', '是', '封面图URL'],
                            ['show_time', 'string', '是', '演出时间，格式 YYYY-MM-DD HH:mm'],
                            ['venue_name', 'string', '是', '场馆名称'],
                            ['tags', 'array', '否', '标签数组，如["热门","金卡9折"]'],
                            ['member_price', 'number', '是', '会员价（元）'],
                            ['original_price', 'number', '是', '原价（元）'],
                            ['public_sale_time', 'string', '是', '公开开票时间'],
                            ['priority_days', 'number', '是', '会员优先天数，如5']
                        ]
                    }
                ]
            }
        ]
    },

    'user-miniapp/coupons.html': {
        title: '我的优惠券',
        subtitle: '优惠券列表 + 状态筛选 + 使用',
        sections: [
            {
                title: '功能描述',
                content: `<p><strong>核心功能：</strong>管理用户已领取的优惠券，按使用状态筛选展示。系统根据优惠券有效期模式和使用记录自动计算每张券的当前状态（未使用/已使用/已过期），用户可在购票结算时选择符合条件的优惠券抵扣订单金额。</p>
                <p><strong>业务说明：</strong></p>
                <ul>
                  <li><strong>前置条件：</strong>用户已登录；优惠券需通过领取、发放或购买等方式获得</li>
                  <li><strong>功能实现逻辑：</strong>
                    <ul>
                      <li>数据来源：从用户优惠券关联表查询当前用户拥有的所有优惠券记录</li>
                      <li>状态流转：未使用 -> 已使用（在订单中抵扣后）/ 已过期（超过有效期且未使用）</li>
                      <li>券类型：现金券（满减固定金额）、折扣券（按比例折扣）、新人券（新人专属优惠）</li>
                      <li>有效期模式：fixed（固定日期区间，valid_start ~ valid_end）或 relative（领取后N天有效，valid_days）</li>
                      <li>适用范围：all（全场通用）或 specific（指定演出/品类）</li>
                      <li>叠加会员折扣：stack_member_discount 标识是否可与会员折扣叠加使用</li>
                      <li>使用说明：usage_desc 字段提供券的使用规则和限制说明</li>
                    </ul>
                  </li>
                  <li><strong>权限控制：</strong>需登录后查看；仅展示当前登录用户拥有的优惠券</li>
                  <li><strong>数据约束：</strong>已过期券不可使用；已使用券不可重复使用；适用范围外的演出不可使用该券</li>
                  <li><strong>能力边界：</strong>不支持在此页面直接领取优惠券；不支持转赠优惠券；不支持优惠券叠加使用（除非 stack_member_discount 为 true）</li>
                </ul>`
            },
            {
                title: '交互说明',
                content: `<p><strong>优惠券状态 Tab 切换</strong></p>
<ul>
  <li><strong>触发：</strong>点击筛选Tab栏中的"全部"/"未使用"/"已使用"/"已过期"标签，Tab为圆角胶囊样式</li>
  <li><strong>执行中：</strong>被点击Tab切换为渐变橙色背景（active态），优惠券列表区域显示骨架屏loading，同时按状态筛选请求数据</li>
  <li><strong>成功：</strong>列表刷新为对应状态的优惠券卡片；若该状态下无优惠券，显示空状态插画+"暂无优惠券"+"快去参加活动获取优惠券吧"</li>
  <li><strong>失败：</strong>弹出toast"加载失败，请稍后重试"，保留当前Tab选中态，列表保持上次成功加载的内容</li>
  <li><strong>边界条件：</strong>当前已是选中态的Tab再次点击时不重复请求；切换Tab时若正在加载中，取消上一次未完成的请求</li>
</ul>

<p><strong>优惠券卡片展示</strong></p>
<ul>
  <li><strong>展示内容：</strong>卡片左侧显示券类型标签（现金券/折扣券/新人券）、面值或折扣信息、使用门槛（满X元可用）；卡片中部显示券名称、适用范围、有效期模式信息；卡片右侧显示"去使用"/"已使用"/"已过期"操作按钮</li>
  <li><strong>叠加会员折扣标识：</strong>当 stack_member_discount 为 true 时，卡片上展示"可叠加会员折扣"标签</li>
  <li><strong>使用说明：</strong>卡片底部或展开区域展示 usage_desc 使用说明文字</li>
</ul>

<p><strong>点击"去使用"按钮</strong></p>
<ul>
  <li><strong>触发：</strong>点击未使用优惠券卡片右侧的渐变橙色"去使用"按钮</li>
  <li><strong>执行中：</strong>按钮显示loading态，校验优惠券可用状态及适用范围</li>
  <li><strong>成功：</strong>跳转至适用演出列表页（或演出详情页），该优惠券自动标记为"待使用"状态</li>
  <li><strong>失败：</strong>弹出toast"优惠券使用失败，请重试"；若优惠券已过期则刷新列表并弹出toast"该优惠券已过期"</li>
  <li><strong>边界条件：</strong>优惠券适用范围为"全场通用"时跳转演出列表页；适用范围为指定演出时直接跳转该演出详情页；未登录用户点击时先跳转登录页</li>
</ul>

<p><strong>返回上一页</strong></p>
<ul>
  <li><strong>触发：</strong>点击导航栏左侧返回箭头图标按钮</li>
  <li><strong>执行中：</strong>无loading，直接返回</li>
  <li><strong>成功：</strong>返回 profile.html 个人中心页</li>
  <li><strong>失败：</strong>无</li>
  <li><strong>边界条件：</strong>无历史页面时返回首页 home.html</li>
</ul>`
            },
            {
                title: '核心字段',
                noTableWrap: true,
                tables: [
                    {
                        title: '优惠券字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['coupon_id', 'number', '是', '优惠券唯一标识'],
                            ['coupon_type', 'enum', '是', '券类型：cash-现金券 discount-折扣券 newcomer-新人券'],
                            ['face_value', 'number', '是', '面值（现金券为减免金额，折扣券为折扣值如8表示8折）'],
                            ['title', 'string', '是', '优惠券名称'],
                            ['min_order_amount', 'number', '是', '最低订单金额门槛，0表示无门槛'],
                            ['applicable_scope', 'enum', '是', '适用范围：all-全场通用 specific-指定演出/品类'],
                            ['validity_mode', 'enum', '是', '有效期模式：fixed-固定日期 relative-领取后N天有效'],
                            ['valid_start', 'string', '否', '有效期开始时间（validity_mode为fixed时必填）'],
                            ['valid_end', 'string', '否', '有效期结束时间（validity_mode为fixed时必填）'],
                            ['valid_days', 'number', '否', '有效天数（validity_mode为relative时必填）'],
                            ['stack_member_discount', 'boolean', '是', '是否可叠加会员折扣：true-可叠加 false-不可叠加'],
                            ['usage_desc', 'string', '否', '使用说明，描述券的使用规则和限制'],
                            ['status', 'enum', '是', '状态：0-未使用 1-已使用 2-已过期'],
                            ['action_text', 'string', '是', '操作按钮文字，如"去使用""已使用""已过期"']
                        ]
                    }
                ]
            }
        ]
    },

    'user-miniapp/coupon-package.html': {
        title: '券包中心',
        subtitle: '统计概览 + 券包列表 + 购买',
        sections: [
            {
                title: '功能描述',
                content: `<p><strong>核心功能：</strong>展示平台在售的演出券包列表，用户可按分类筛选券包并购买。券包是将多场演出组合打包销售的优惠产品，购买后用户获得对应演出的观演资格，通常比单场购买更优惠。</p>
                <p><strong>业务说明：</strong></p>
                <ul>
                  <li><strong>前置条件：</strong>用户已登录；券包数据由运营人员在后台配置并上架</li>
                  <li><strong>功能实现逻辑：</strong>
                    <ul>
                      <li>数据来源：从券包商品库查询已上架的券包数据，按分类标签过滤，支持按推荐权重排序</li>
                      <li>券包结构：每个券包包含封面图、名称、包含的演出列表、原价、折扣价和节省金额</li>
                      <li>购买流程：用户选择券包 -> 弹出确认弹窗 -> 确认后进入支付流程 -> 支付成功后券包加入用户账户</li>
                      <li>分类筛选：券包按主题分类（热卖推荐/新品上线/亲子家庭/周末休闲），用户可按分类浏览</li>
                    </ul>
                  </li>
                  <li><strong>权限控制：</strong>浏览券包列表无需登录；购买券包需登录并完成支付</li>
                  <li><strong>数据约束：</strong>仅展示已上架状态的券包；已下架券包不显示；券包内演出需均为已发布状态</li>
                  <li><strong>能力边界：</strong>不支持券包内单场演出的单独退订；不支持券包转赠；不支持券包与优惠券叠加使用</li>
                </ul>`
            },
            {
                title: '交互说明',
                content: `<p><strong>券包卡片展开/收起</strong></p>
<ul>
  <li><strong>触发：</strong>点击券包卡片封面区域（封面图+badge角标+折扣标签区域）</li>
  <li><strong>执行中：</strong>卡片下方平滑展开详情区域，显示包含的演出名称chips列表和价格信息；展开时封面区域显示向上箭头图标，收起时显示向下箭头图标</li>
  <li><strong>成功：</strong>券包详情完整展开/收起，动画流畅无卡顿</li>
  <li><strong>失败：</strong>展开动画异常时直接显示/隐藏详情区域，不影响其他卡片</li>
  <li><strong>边界条件：</strong>同时只能展开一个券包卡片，点击新卡片时自动收起已展开的卡片；网络异常时展开区域显示缓存的演出名称列表</li>
</ul>

<p><strong>点击"立即抢购"购买按钮</strong></p>
<ul>
  <li><strong>触发：</strong>点击券包卡片右侧或底部的渐变橙色"立即抢购"按钮</li>
  <li><strong>执行中：</strong>弹出底部确认弹窗（从底部滑入），弹窗标题显示券包名称+badge角标，内容区展示包含演出列表、原价、折扣价和节省金额</li>
  <li><strong>成功：</strong>用户在弹窗内点击"确认购买"后关闭弹窗，弹出toast"已加入购物车 - [券包名称]"，跳转订单确认页或购物车页</li>
  <li><strong>失败：</strong>库存不足时弹窗内提示"库存不足"并置灰确认按钮；网络异常时弹出toast"购买失败，请重试"</li>
  <li><strong>边界条件：</strong>未登录用户点击时先跳转登录页，登录成功后返回当前页并重新弹出确认弹窗；券包已下架时按钮置灰显示"已下架"</li>
</ul>

<p><strong>筛选 Tab 切换</strong></p>
<ul>
  <li><strong>触发：</strong>点击筛选Tab栏中的"全部"/"热卖推荐"/"新品上线"/"亲子家庭"/"周末休闲"标签，Tab为圆角胶囊样式</li>
  <li><strong>执行中：</strong>被点击Tab切换为渐变橙色背景（active态），券包列表区域显示骨架屏loading，同时按分类筛选请求数据</li>
  <li><strong>成功：</strong>列表刷新为对应分类的券包卡片；若该分类下无券包，显示空状态插画+"暂无相关券包"</li>
  <li><strong>失败：</strong>弹出toast"加载失败，请稍后重试"，保留当前Tab选中态，列表保持上次成功加载的内容</li>
  <li><strong>边界条件：</strong>当前已是选中态的Tab再次点击时不重复请求；切换Tab时若正在加载中，取消上一次未完成的请求</li>
</ul>

<p><strong>返回上一页</strong></p>
<ul>
  <li><strong>触发：</strong>点击导航栏左侧返回箭头图标按钮</li>
  <li><strong>执行中：</strong>无loading，直接返回</li>
  <li><strong>成功：</strong>返回进入券包中心前的上一个页面</li>
  <li><strong>失败：</strong>无</li>
  <li><strong>边界条件：</strong>无历史页面时返回首页 home.html</li>
</ul>`
            },
            {
                title: '核心字段',
                noTableWrap: true,
                tables: [
                    {
                        title: '券包统计字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['total_packages', 'number', '是', '精选券包总数'],
                            ['max_discount', 'string', '是', '最高折扣信息，如"5.8折"'],
                            ['total_saved', 'number', '是', '累计可省金额']
                        ]
                    },
                    {
                        title: '券包字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['package_id', 'number', '是', '券包唯一标识'],
                            ['cover_image', 'string', '是', '券包封面图URL'],
                            ['name', 'string', '是', '券包名称'],
                            ['badge', 'enum', '是', '角标类型：hot-热卖 new-新品'],
                            ['discount', 'string', '是', '折扣标签文字，如"5.9折"'],
                            ['card_count', 'string', '是', '包含演出数量描述，如"包含3场热门演出"'],
                            ['shows[]', 'array', '是', '包含的演出名称数组'],
                            ['original_price', 'number', '是', '原价'],
                            ['sale_price', 'number', '是', '折扣价'],
                            ['saved_amount', 'number', '是', '节省金额']
                        ]
                    }
                ]
            }
        ]
    },

    'user-miniapp/points.html': {
        title: '积分中心',
        subtitle: '积分余额 + 任务列表 + 兑换入口',
        sections: [
            {
                title: '功能描述',
                content: `<p><strong>核心功能：</strong>展示用户当前积分余额和会员等级进度，提供积分任务完成入口和功能导航。用户通过完成每日任务获取积分奖励，积分可用于兑换商品、参与抽奖或抵扣订单金额。系统根据用户会员等级计算积分获取倍数，等级越高单次任务获得的积分越多。</p>
                <p><strong>业务说明：</strong></p>
                <ul>
                  <li><strong>前置条件：</strong>用户已登录；积分数据由系统在用户完成任务或消费后自动计算更新</li>
                  <li><strong>功能实现逻辑：</strong>
                    <ul>
                      <li>数据来源：积分余额和任务状态从用户积分服务接口获取，按用户ID查询</li>
                      <li>任务体系：每日签到、发布评论、分享演出、购买演出等任务，完成后发放对应积分奖励</li>
                      <li>积分倍数：根据会员等级计算积分获取倍数（普通1x/银卡1.2x/金卡1.5x/钻石2x）</li>
                      <li>积分消耗：积分可用于积分商城兑换、积分抽奖、订单抵扣等场景</li>
                    </ul>
                  </li>
                  <li><strong>权限控制：</strong>需登录后查看积分中心；任务完成状态按用户维度隔离</li>
                  <li><strong>数据约束：</strong>积分余额不为负数；每日任务每日重置；已完成的任务当日不可重复完成</li>
                  <li><strong>能力边界：</strong>不支持积分提现；不支持积分转赠；不支持积分与优惠券同时抵扣同一笔订单</li>
                </ul>`
            },
            {
                title: '交互说明',
                content: `<p><strong>点击任务操作按钮</strong></p>
<ul>
  <li><strong>触发：</strong>点击积分任务列表中任意任务右侧的操作按钮（"去签到"/"去评论"/"去分享"/"去购买"），按钮为渐变橙色样式</li>
  <li><strong>执行中：</strong>按钮显示loading态，根据任务类型跳转至对应页面或执行对应操作</li>
  <li><strong>成功：</strong>完成任务后返回积分中心页，该任务按钮变为灰色"已完成"状态，积分余额数字动画增加至新数值，弹出toast"任务完成，积分+xx"</li>
  <li><strong>失败：</strong>任务未完成时返回积分中心页，按钮保持原状态，弹出toast"任务未完成，请重试"</li>
  <li><strong>边界条件：</strong>每日任务每日0点重置为"未完成"状态；已完成任务按钮置灰不可点击；未登录用户点击时先跳转登录页</li>
</ul>

<p><strong>点击"积分兑换"入口</strong></p>
<ul>
  <li><strong>触发：</strong>点击积分卡片下方的"积分兑换"功能入口卡片（含兑换图标和说明文字）</li>
  <li><strong>执行中：</strong>无loading，直接跳转</li>
  <li><strong>成功：</strong>跳转至积分兑换商品列表页（或 shop.html?tab=points 商城积分兑换Tab）</li>
  <li><strong>失败：</strong>跳转失败时弹出toast"页面加载失败，请重试"</li>
  <li><strong>边界条件：</strong>无</li>
</ul>

<p><strong>点击"积分抽奖"入口</strong></p>
<ul>
  <li><strong>触发：</strong>点击积分卡片下方的"积分抽奖"功能入口卡片（含抽奖图标和说明文字）</li>
  <li><strong>执行中：</strong>无loading，直接跳转</li>
  <li><strong>成功：</strong>跳转至 lottery.html 积分抽奖页</li>
  <li><strong>失败：</strong>跳转失败时弹出toast"页面加载失败，请重试"</li>
  <li><strong>边界条件：</strong>无</li>
</ul>

<p><strong>点击"积分流水"入口</strong></p>
<ul>
  <li><strong>触发：</strong>点击积分卡片下方的"积分流水"功能入口卡片（含流水图标和说明文字）</li>
  <li><strong>执行中：</strong>无loading，直接跳转</li>
  <li><strong>成功：</strong>跳转至 points-flow.html 积分明细页</li>
  <li><strong>失败：</strong>跳转失败时弹出toast"页面加载失败，请重试"</li>
  <li><strong>边界条件：</strong>无</li>
</ul>

<p><strong>积分余额刷新</strong></p>
<ul>
  <li><strong>触发：</strong>页面每次进入时自动刷新，或用户手动下拉刷新积分卡片区域</li>
  <li><strong>执行中：</strong>积分余额数字显示loading骨架屏，同时发起积分信息请求</li>
  <li><strong>成功：</strong>积分余额、会员等级、进度条数据更新为最新值，数字变化带递增动画效果</li>
  <li><strong>失败：</strong>弹出toast"积分信息加载失败"，显示上次缓存的积分数据</li>
  <li><strong>边界条件：</strong>积分为0时正常显示"0"；会员等级进度条满时显示"已满级"</li>
</ul>`
            },
            {
                title: '核心字段',
                noTableWrap: true,
                tables: [
                    {
                        title: '积分信息字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['available_points', 'number', '是', '可用积分余额'],
                            ['member_level', 'enum', '是', '会员等级：0-普通 1-银卡 2-金卡 3-黑卡'],
                            ['current_level_points', 'number', '是', '当前等级已获积分'],
                            ['next_level_points', 'number', '是', '下一等级所需积分']
                        ]
                    },
                    {
                        title: '任务字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['task_id', 'number', '是', '任务唯一标识'],
                            ["name", "string", "是", "任务名称，如\"每日签到\"\"发布评论\""],
                            ['task_desc', 'string', '是', '任务描述文字，如\"每天签到获取积分，连续7天额外奖励\"'],
                            ['reward_points', 'number', '是', '奖励积分数'],
                            ['status', 'enum', '是', '状态：0-待完成 1-已完成']
                        ]
                    }
                ]
            }
        ]
    },

    'user-miniapp/points-flow.html': {
        title: '积分明细',
        subtitle: '积分流水 + 筛选 + 汇总',
        sections: [
            {
                title: '功能描述',
                content: `<p><strong>核心功能：</strong>展示用户积分收支明细流水，按时间范围筛选并汇总统计。系统记录每笔积分变动的类型、金额和变动后余额，支持按收入、支出、退款、抽奖等类型分类展示，帮助用户追踪积分来源和去向。</p>
                <p><strong>业务说明：</strong></p>
                <ul>
                  <li><strong>前置条件：</strong>用户已登录；积分流水数据由系统在积分变动时自动记录</li>
                  <li><strong>功能实现逻辑：</strong>
                    <ul>
                      <li>数据来源：从积分流水表查询当前用户的所有积分变动记录，按时间降序排列</li>
                      <li>流水类型：收入（任务奖励、消费返还）、支出（兑换商品、抽奖、订单抵扣）、退款（订单取消返还）</li>
                      <li>汇总计算：累计收入 = 所有收入类型流水金额之和；累计支出 = 所有支出类型流水金额之和；当前余额 = 累计收入 - 累计支出</li>
                      <li>时间筛选：按全部/本月/近三月/近半年过滤流水记录，汇总统计同步按筛选范围计算</li>
                    </ul>
                  </li>
                  <li><strong>权限控制：</strong>需登录后查看；仅展示当前登录用户的积分流水</li>
                  <li><strong>数据约束：</strong>流水记录不可删除或修改；每笔流水变动后余额必须与上一笔流水余额 + 本次变动金额相等</li>
                  <li><strong>能力边界：</strong>不支持导出流水记录；不支持按流水类型单独筛选；不支持流水详情页查看</li>
                </ul>`
            },
            {
                title: '交互说明',
                content: `<p><strong>时间范围 Tab 切换</strong></p>
<ul>
  <li><strong>触发：</strong>点击筛选Tab栏中的"全部"/"本月"/"近三月"/"近半年"标签，Tab为圆角胶囊样式</li>
  <li><strong>执行中：</strong>被点击Tab切换为渐变橙色背景（active态），汇总统计栏和流水列表区域显示骨架屏loading，同时按时间范围请求数据</li>
  <li><strong>成功：</strong>汇总统计栏（累计收入/累计支出/当前积分）更新为对应时间范围的数值，流水列表按日期分组刷新；若无流水记录，显示空状态插画+"暂无积分明细"</li>
  <li><strong>失败：</strong>弹出toast"加载失败，请稍后重试"，保留当前Tab选中态，列表保持上次成功加载的内容</li>
  <li><strong>边界条件：</strong>当前已是选中态的Tab再次点击时不重复请求；切换Tab时若正在加载中，取消上一次未完成的请求；时间范围跨度较大时分页加载</li>
</ul>

<p><strong>流水列表滚动加载</strong></p>
<ul>
  <li><strong>触发：</strong>滚动流水列表至底部，触发上拉加载更多</li>
  <li><strong>执行中：</strong>列表底部显示loading动画（三个圆点跳动），同时发起分页请求</li>
  <li><strong>成功：</strong>新流水记录按日期分组追加到列表末尾，loading动画消失；若已加载全部数据，底部显示"没有更多了"</li>
  <li><strong>失败：</strong>loading动画消失，弹出toast"加载失败，请重试"，保留已加载的数据</li>
  <li><strong>边界条件：</strong>当前时间范围内流水总数小于分页大小时不显示加载更多；连续快速上拉只触发一次加载请求</li>
</ul>

<p><strong>流水记录展开查看详情</strong></p>
<ul>
  <li><strong>触发：</strong>点击任意流水记录行（图标+标题+时间+金额+余额区域）</li>
  <li><strong>执行中：</strong>该行下方展开详情面板，显示流水完整信息（流水号、变动类型、变动时间、变动前后余额、关联订单号等）</li>
  <li><strong>成功：</strong>详情面板完整展开，再次点击该行收起详情</li>
  <li><strong>失败：</strong>详情数据加载失败时展开区域显示"详情加载失败，点击重试"</li>
  <li><strong>边界条件：</strong>同时只能展开一条流水记录，点击新记录时自动收起已展开的记录；无关联订单号时不显示订单号字段</li>
</ul>

<p><strong>返回上一页</strong></p>
<ul>
  <li><strong>触发：</strong>点击导航栏左侧返回箭头图标按钮</li>
  <li><strong>执行中：</strong>无loading，直接返回</li>
  <li><strong>成功：</strong>返回 points.html 积分中心页</li>
  <li><strong>失败：</strong>无</li>
  <li><strong>边界条件：</strong>无历史页面时返回首页 home.html</li>
</ul>`
            },
            {
                title: '核心字段',
                noTableWrap: true,
                tables: [
                    {
                        title: '积分汇总字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['total_income', 'number', '是', '累计获得积分'],
                            ['total_expend', 'number', '是', '累计消耗积分'],
                            ['current_points', 'number', '是', '当前积分余额']
                        ]
                    },
                    {
                        title: '积分流水字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['flow_id', 'number', '是', '流水唯一标识'],
                            ['type', 'enum', '是', '类型：1-收入(income) 2-支出(spend) 3-退款(refund) 4-抽奖(lottery)'],
                            ["title", "string", "是", "流水标题，如\"每日签到奖励\"\"购买演出消费积分\"\"订单退款返还积分\"\"积分抽奖消耗\""],
                            ['points', 'number', '是', '积分变动数量'],
                            ['balance', 'number', '是', '变动后余额'],
                            ['create_time', 'string', '是', '变动时间'],
                            ['time_range', 'string', '否', '筛选范围：全部/本月/近三月/近半年']
                        ]
                    }
                ]
            }
        ]
    },

    'user-miniapp/wallet.html': {
        title: '我的钱包',
        subtitle: '余额管理 + 充值 + 交易记录',
        sections: [
            {
                title: '功能描述',
                content: `<p><strong>核心功能：</strong>为用户提供钱包余额的统一管理入口，包括余额展示、充值以及交易记录查询。页面展示当前可用余额和成长值进度，当成长值达到升级目标时提示用户升级。充值弹窗中展示成长值比例（每充值1元获得N成长值）和限时加倍活动信息。系统根据充值金额自动计算赠送金额，并支持充值卡绑定功能。</p>
                <p><strong>业务说明：</strong></p>
                <ul>
                  <li><strong>前置条件：</strong>用户已登录并完成账号注册</li>
                  <li><strong>功能实现逻辑：</strong>
                    <ul>
                      <li>进入页面时请求用户钱包概要数据（余额、冻结金额、成长值及升级进度）</li>
                      <li>充值时根据金额档位自动匹配赠送金额规则</li>
                      <li>充值卡绑定需校验卡号有效性（至少8位字母数字）</li>
                      <li>成长值达到升级目标时，页面展示升级提示横幅，引导用户前往充值页完成升级</li>
                      <li>充值弹窗展示成长值比例说明和当前限时加倍活动（活动期间成长值按倍率计算）</li>
                    </ul>
                  </li>
                  <li><strong>权限控制：</strong>仅登录用户可访问，余额数据按用户ID隔离</li>
                  <li><strong>数据约束：</strong>余额精度为小数点后2位；自定义充值金额最低10元，最高5000元</li>
                  <li><strong>能力边界：</strong>充值卡绑定仅支持未使用过的有效充值卡</li>
                </ul>`
            },
            {
                title: '交互说明',
                content: `<p><strong>充值操作</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击"充值"按钮或促销横幅</li>
                  <li><strong>执行中：</strong>弹出底部充值弹窗，展示金额网格（50/100/200/500/1000）及自定义输入框；选择金额后显示对应赠送金额；弹窗内展示成长值比例说明（每充值1元获得N成长值）和当前限时加倍活动信息（活动名称、活动时间、成长值倍率）</li>
                  <li><strong>成功：</strong>调起支付，支付成功后余额实时更新，成长值同步增加，显示"充值成功"toast提示</li>
                  <li><strong>失败：</strong>支付失败或取消时关闭弹窗，余额不变，显示"充值失败"toast提示</li>
                  <li><strong>边界条件：</strong>自定义金额低于10元或超过5000元时，确认按钮置灰并提示金额范围</li>
                </ul>
                <p><strong>充值升级按钮</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击成长值升级提示横幅中的"充值升级"按钮</li>
                  <li><strong>执行中：</strong>跳转至充值页面（recharge-topup.html）</li>
                  <li><strong>成功：</strong>进入充值页面，用户可完成充值以获取成长值</li>
                  <li><strong>边界条件：</strong>成长值未达到升级目标时不显示升级提示横幅</li>
                </ul>
                <p><strong>充值卡绑定</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击"充值卡绑定"工具卡片</li>
                  <li><strong>执行中：</strong>跳转充值卡绑定页面，输入卡号后点击绑定</li>
                  <li><strong>成功：</strong>卡号有效且未使用时，余额增加对应金额，显示"绑定成功"toast提示</li>
                  <li><strong>失败：</strong>卡号无效、已使用或已过期时，显示对应错误提示</li>
                  <li><strong>边界条件：</strong>卡号少于8位或非字母数字组合时，绑定按钮置灰</li>
                </ul>`
            },
            {
                title: '核心字段',
                noTableWrap: true,
                tables: [
                    {
                        title: '钱包信息字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['balance', 'number', '是', '可用余额'],
                            ['frozen_balance', 'number', '是', '冻结金额'],
                            ['growth_value', 'number', '是', '当前成长值'],
                            ['growth_target', 'number', '是', '升级所需成长值目标']
                        ]
                    },
                    {
                        title: '充值字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['amount', 'number', '是', '充值金额'],
                            ['bonus', 'number', '否', '赠送金额']
                        ]
                    },
                    {
                        title: '活动字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['activity_name', 'string', '否', '限时加倍活动名称'],
                            ['activity_start', 'string', '否', '活动开始时间'],
                            ['activity_end', 'string', '否', '活动结束时间'],
                            ['growth_multiplier', 'number', '否', '成长值倍率，如2表示双倍成长值']
                        ]
                    }
                ]
            }
        ]
    },

    'user-miniapp/lottery.html': {
        title: '积分抽奖',
        subtitle: '九宫格抽奖 + 奖品展示 + 中奖弹窗',
        sections: [
            {
                title: '功能描述',
                content: `<p><strong>核心功能：</strong>为用户提供积分抽奖活动入口，用户消耗固定积分参与九宫格抽奖，系统根据奖品概率随机抽取结果。支持查看奖品列表、抽奖规则以及中奖记录，中奖后通过弹窗展示奖品信息并提供后续操作入口。</p>
                <p><strong>业务说明：</strong></p>
                <ul>
                  <li><strong>前置条件：</strong>用户已登录且可用积分大于等于单次抽奖消耗积分（100积分）</li>
                  <li><strong>功能实现逻辑：</strong>
                    <ul>
                      <li>进入页面时加载抽奖活动配置（奖品列表、概率、消耗积分）</li>
                      <li>用户点击开始抽奖后，前端先校验积分余额，满足条件则扣除积分并请求后端抽奖接口</li>
                      <li>后端根据奖品概率分布随机计算中奖结果，返回奖品信息</li>
                      <li>前端根据中奖结果播放九宫格旋转动画，最终停在对应奖品位置</li>
                      <li>中奖结果写入用户奖品记录，积分变动写入积分流水</li>
                    </ul>
                  </li>
                  <li><strong>权限控制：</strong>仅登录用户可参与抽奖，积分扣除操作需用户身份校验</li>
                  <li><strong>数据约束：</strong>每次抽奖固定消耗100积分；奖品概率总和为100%；用户积分余额不能为负</li>
                  <li><strong>能力边界：</strong>积分不足时禁止抽奖；网络异常时旋转动画结束后提示"网络异常，请稍后查看奖品"；同一用户无抽奖次数上限</li>
                </ul>`
            },
            {
                title: '交互说明',
                content: `<p><strong>开始抽奖</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击九宫格中心"开始"按钮</li>
                  <li><strong>执行中：</strong>扣除100积分，九宫格高亮依次转动，3-4秒后逐渐减速停在目标位置</li>
                  <li><strong>成功：</strong>弹出中奖弹窗，显示奖品信息+彩纸动画</li>
                  <li><strong>失败：</strong>网络异常或接口报错时，旋转动画结束后提示"抽奖失败，积分已退回"</li>
                  <li><strong>边界条件：</strong>积分不足时"开始"按钮置灰不可点击，点击时toast提示"积分不足"</li>
                </ul>
                <p><strong>中奖弹窗操作</strong></p>
                <ul>
                  <li><strong>触发：</strong>抽奖成功后自动弹出中奖弹窗</li>
                  <li><strong>执行中：</strong>展示奖品名称、图标及彩纸动画效果</li>
                  <li><strong>继续抽奖：</strong>点击"继续抽奖"按钮关闭弹窗，可再次抽奖</li>
                  <li><strong>查看奖品：</strong>点击"查看奖品"按钮关闭弹窗，跳转奖品记录页面</li>
                  <li><strong>边界条件：</strong>弹窗外点击蒙层也可关闭弹窗</li>
                </ul>
                <p><strong>查看我的奖品</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击导航栏右侧"我的奖品"或页面底部"我的奖品"入口</li>
                  <li><strong>成功：</strong>跳转奖品记录页面</li>
                  <li><strong>失败：</strong>未登录时跳转登录页</li>
                </ul>`
            },
            {
                title: '核心字段',
                noTableWrap: true,
                tables: [
                    {
                        title: '抽奖活动字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['activity_id', 'number', '是', '活动唯一标识'],
                            ['cost_points', 'number', '是', '每次抽奖消耗积分，固定100']
                        ]
                    },
                    {
                        title: '奖品字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['prize_id', 'number', '是', '奖品唯一标识'],
                            ['name', 'string', '是', '奖品名称'],
                            ['icon', 'string', '是', '奖品图标（emoji）'],
                            ['probability', 'number', '是', '中奖概率（百分比）'],
                            ['type', 'enum', '是', '奖品类型：coupon-优惠券 goods-实物 points-积分 thanks-谢谢参与 ticket-门票抵扣券 merchandise-文创周边'],
                            ['prize_tag', 'string', '否', '奖品标签：大奖/限量/稀有，无标签则不显示'],
                            ['is_winning', 'boolean', '是', '是否中奖']
                        ]
                    }
                ]
            }
        ]
    },

    'user-miniapp/profile.html': {
        title: '个人中心',
        subtitle: '用户信息 + 资产概览 + 订单入口 + 工具栏',
        sections: [
            {
                title: '功能描述',
                content: `<p><strong>核心功能：</strong>作为用户端的个人主页入口，聚合展示用户基本信息、资产数据、订单状态及常用工具入口。用户可在此页面快速了解账户概况，并通过各模块入口跳转到对应功能页面完成进一步操作。</p>
                <p><strong>业务说明：</strong></p>
                <ul>
                  <li><strong>前置条件：</strong>用户已登录</li>
                  <li><strong>功能实现逻辑：</strong>
                    <ul>
                      <li>进入页面时并行请求用户基本信息、资产概览、订单统计及未读消息数</li>
                      <li>实名认证状态根据服务端返回动态展示提示横幅（未认证/审核中/已认证）</li>
                      <li>订单入口角标根据各状态订单数量实时渲染</li>
                      <li>消息红点根据未读消息数是否大于0显示</li>
                    </ul>
                  </li>
                  <li><strong>权限控制：</strong>仅登录用户可访问，未登录时跳转登录页</li>
                  <li><strong>数据约束：</strong>用户ID全局唯一；会员等级按积分区间计算；资产数据精度为小数点后2位</li>
                  <li><strong>能力边界：</strong>代理中心入口仅对代理商身份用户显示；实名认证提示仅对未认证和审核中用户显示</li>
                </ul>`
            },
            {
                title: '交互说明',
                content: `<p><strong>查看消息</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击用户卡片顶部铃铛图标</li>
                  <li><strong>执行中：</strong>跳转消息中心页面</li>
                  <li><strong>成功：</strong>进入消息中心，红点标记清除</li>
                  <li><strong>失败：</strong>网络异常时toast提示"加载失败，请重试"</li>
                  <li><strong>边界条件：</strong>未读消息数为0时红点隐藏</li>
                </ul>
                <p><strong>编辑资料</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击用户卡片"编辑资料"按钮</li>
                  <li><strong>成功：</strong>跳转编辑资料页面</li>
                </ul>
                <p><strong>实名认证提示</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击实名认证提示横幅</li>
                  <li><strong>成功：</strong>跳转实名认证页面</li>
                  <li><strong>边界条件：</strong>已认证用户不显示该横幅</li>
                </ul>
                <p><strong>订单入口</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击我的订单区域各状态入口</li>
                  <li><strong>成功：</strong>跳转订单与电子票页面并自动切换到对应Tab</li>
                  <li><strong>边界条件：</strong>商品订单入口跳转商品订单页面</li>
                </ul>`
            },
            {
                title: '核心字段',
                noTableWrap: true,
                tables: [
                    {
                        title: '用户信息字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['avatar', 'string', '是', '用户头像URL'],
                            ['nickname', 'string', '是', '用户昵称'],
                            ['user_id', 'string', '是', '用户唯一ID，展示格式如"ID: 8886 5200"'],
                            ['member_level', 'enum', '是', '会员等级：0-普通 1-银卡 2-金卡 3-黑卡'],
                            ['is_agent', 'boolean', '是', '是否为代理商'],
                            ['real_name_status', 'enum', '是', '实名状态：0-未认证 1-审核中 2-已认证'],
                            ['unread_message_count', 'number', '是', '未读消息数']
                        ]
                    },
                    {
                        title: '资产概览字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['balance', 'number', '是', '钱包余额'],
                            ['available_points', 'number', '是', '可用积分'],
                            ['coupon_count', 'number', '是', '可用优惠券数量'],
                            ['ticket_count', 'number', '是', '未使用演出券数量']
                        ]
                    },
                    {
                        title: '订单入口字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['order_type', 'enum', '是', '订单类型：pending_pay-待付款 pending_verify-待核销 completed-已完成 refunded-已退款 product_orders-商品订单'],
                            ['count', 'number', '是', '对应类型订单数量']
                        ]
                    }
                ]
            }
        ]
    },

    'user-miniapp/profile-edit.html': {
        title: '编辑资料',
        subtitle: '头像上传 + 信息编辑 + 保存',
        sections: [
            {
                title: '功能描述',
                content: `<p><strong>核心功能：</strong>允许用户编辑个人资料信息，包括头像上传、昵称修改、性别选择和生日设置。真实姓名和手机号为只读字段，由实名认证和注册信息自动填充。编辑完成后通过保存操作将变更同步到服务端。</p>
                <p><strong>业务说明：</strong></p>
                <ul>
                  <li><strong>前置条件：</strong>用户已登录</li>
                  <li><strong>功能实现逻辑：</strong>
                    <ul>
                      <li>进入页面时加载当前用户资料数据填充表单</li>
                      <li>头像上传时校验文件类型和大小，通过后上传至OSS并返回URL</li>
                      <li>昵称变更时实时校验长度（1-20字符）和非法字符</li>
                      <li>点击保存时汇总所有变更字段，调用更新接口同步数据</li>
                    </ul>
                  </li>
                  <li><strong>权限控制：</strong>仅允许修改当前登录用户自己的资料</li>
                  <li><strong>数据约束：</strong>昵称1-20字符，不允许空值；头像仅支持jpg/png，最大5MB；生日年份范围1950-当前年</li>
                  <li><strong>能力边界：</strong>真实姓名和手机号不可编辑；头像上传无裁剪功能</li>
                </ul>`
            },
            {
                title: '交互说明',
                content: `<p><strong>头像上传</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击头像区域</li>
                  <li><strong>执行中：</strong>直接调用系统文件选择器（accept: image/jpeg,image/png）</li>
                  <li><strong>成功：</strong>选择图片后直接预览更新，无裁剪功能</li>
                  <li><strong>失败：</strong>文件选择取消时无操作</li>
                  <li><strong>边界条件：</strong>图片大小超过5MB提示"图片大小不能超过 5MB"；仅支持jpg/png格式，其他格式提示"仅支持 JPG/PNG 格式"</li>
                </ul>
                <p><strong>保存资料</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击导航栏右侧"保存"或底部"保存修改"按钮</li>
                  <li><strong>执行中：</strong>校验昵称非空且长度在1-20字符范围内</li>
                  <li><strong>成功：</strong>显示"资料保存成功"toast提示，不自动返回</li>
                  <li><strong>失败：</strong>校验失败显示对应toast错误提示（如"昵称不能为空"）；接口失败显示"保存失败，请重试"</li>
                  <li><strong>边界条件：</strong>无任何修改时点击保存仍提示"资料保存成功"</li>
                </ul>`
            },
            {
                title: '核心字段',
                noTableWrap: true,
                tables: [
                    {
                        title: '用户资料字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['avatar', 'string', '是', '头像URL，支持jpg/png，最大5MB'],
                            ['nickname', 'string', '是', '昵称，1-20字符'],
                            ['real_name', 'string', '否', '真实姓名（只读，实名认证后自动填充）'],
                            ['phone', 'string', '否', '手机号（只读，脱敏显示）'],
                            ['gender', 'enum', '否', '性别：male-男 female-女 secret-保密'],
                            ['birthday', 'string', '否', '生日，格式YYYY-MM-DD，年份范围1950-当前年']
                        ]
                    }
                ]
            }
        ]
    },

    'user-miniapp/privacy-settings.html': {
        title: '隐私设置',
        subtitle: '通知开关 + 隐私政策 + 注销账号',
        sections: [
            {
                title: '功能描述',
                content: `<p><strong>核心功能：</strong>为用户提供隐私相关设置的统一管理入口，包括消息通知偏好设置、隐私政策文档查看以及账号注销申请。用户可自主控制是否接收营销类推送通知，并在充分了解风险后提交账号注销请求。</p>
                <p><strong>业务说明：</strong></p>
                <ul>
                  <li><strong>前置条件：</strong>用户已登录</li>
                  <li><strong>功能实现逻辑：</strong>
                    <ul>
                      <li>进入页面时加载当前用户的通知设置状态</li>
                      <li>切换通知开关时实时调用接口更新设置，并给出操作反馈</li>
                      <li>隐私政策链接跳转至H5页面展示完整法律文本</li>
                      <li>账号注销需二次确认，提交后进入审核流程</li>
                    </ul>
                  </li>
                  <li><strong>权限控制：</strong>仅登录用户可修改自己的隐私设置</li>
                  <li><strong>数据约束：</strong>通知开关状态持久化存储；注销申请需记录申请时间和原因</li>
                  <li><strong>能力边界：</strong>注销账号后用户数据按法律法规要求保留一定期限后删除；系统通知类消息不受开关控制</li>
                </ul>`
            },
            {
                title: '交互说明',
                content: `<p><strong>通知开关切换</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击通知开关（营销通知/演出推广/优惠活动）</li>
                  <li><strong>执行中：</strong>开关状态切换，调用接口保存新设置</li>
                  <li><strong>成功：</strong>显示toast提示（如"营销通知已开启"/"营销通知已关闭"）</li>
                  <li><strong>失败：</strong>接口失败时开关自动回弹至原状态，toast提示"设置失败，请重试"</li>
                  <li><strong>边界条件：</strong>网络异常时开关状态不变更，提示网络错误</li>
                </ul>
                <p><strong>查看隐私政策</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击"隐私政策"或"数据使用说明"链接</li>
                  <li><strong>成功：</strong>跳转H5页面展示完整隐私政策内容</li>
                </ul>
                <p><strong>注销账号</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击"注销账号"按钮</li>
                  <li><strong>执行中：</strong>弹出确认弹窗，展示注销警告说明（账号数据将清除且不可恢复）</li>
                  <li><strong>成功：</strong>点击确认后提交注销申请，toast提示"账号注销申请已提交"</li>
                  <li><strong>失败：</strong>存在未完成的订单或余额未清零时，提示"请先处理未完成事项"</li>
                  <li><strong>边界条件：</strong>无验证码环节；注销申请提交后账号进入冻结期，期间可撤销</li>
                </ul>`
            },
            {
                title: '核心字段',
                noTableWrap: true,
                tables: [
                    {
                        title: '通知设置字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['marketing_notification', 'boolean', '是', '营销通知开关'],
                            ['show_promotion', 'boolean', '是', '演出推广通知开关'],
                            ['discount_notification', 'boolean', '是', '优惠活动通知开关']
                        ]
                    },
                    {
                        title: '隐私链接字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['privacy_policy_url', 'string', '是', '隐私政策H5页面URL'],
                            ['data_usage_url', 'string', '是', '数据使用说明H5页面URL']
                        ]
                    }
                ]
            }
        ]
    },

    'user-miniapp/preference-settings.html': {
        title: '偏好设置',
        subtitle: '兴趣标签 + 会员权限开关',
        sections: [
            {
                title: '功能描述',
                content: `<p><strong>核心功能：</strong>允许用户设置个人兴趣偏好标签和会员权限通知开关。兴趣标签用于驱动首页个性化推荐算法，为用户推送符合偏好的演出内容；通知开关控制各类会员权益提醒和系统推送的接收状态。设置完成后需手动保存生效。</p>
                <p><strong>业务说明：</strong></p>
                <ul>
                  <li><strong>前置条件：</strong>用户已登录</li>
                  <li><strong>功能实现逻辑：</strong>
                    <ul>
                      <li>进入页面时加载用户当前偏好设置（兴趣标签和通知开关状态）</li>
                      <li>兴趣标签支持多选，选中状态实时更新本地UI，保存时批量提交</li>
                      <li>根据已选标签动态生成推荐标签，用于首页内容推荐加权</li>
                      <li>通知开关变更后需点击保存按钮统一提交</li>
                    </ul>
                  </li>
                  <li><strong>权限控制：</strong>仅登录用户可修改自己的偏好设置</li>
                  <li><strong>数据约束：</strong>兴趣标签至少选择1个，最多无上限；通知开关为布尔值</li>
                  <li><strong>能力边界：</strong>偏好设置仅影响推荐排序权重，不会过滤掉非偏好类型的演出；推荐标签为系统根据已选标签自动生成，不可手动编辑</li>
                </ul>`
            },
            {
                title: '交互说明',
                content: `<p><strong>标签选择</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击兴趣标签（话剧/音乐剧/音乐会/舞蹈/戏曲/儿童剧/演唱会/其他）</li>
                  <li><strong>执行中：</strong>切换选中/未选中状态，选中标签金色渐变高亮</li>
                  <li><strong>成功：</strong>已选数量角标实时更新，推荐标签区域动态刷新</li>
                  <li><strong>边界条件：</strong>至少选择1个标签，全部取消时保存按钮仍可点击但服务端会拒绝</li>
                </ul>
                <p><strong>通知开关切换</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击会员权限开关（优先购票提醒/生日专属优惠/积分变动通知/个性化推荐）</li>
                  <li><strong>执行中：</strong>开关状态切换，变更暂存本地</li>
                  <li><strong>成功：</strong>点击保存后统一提交，显示"保存成功"toast</li>
                  <li><strong>失败：</strong>接口失败时toast提示"保存失败，请重试"</li>
                </ul>
                <p><strong>保存偏好设置</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击导航栏右侧"保存"按钮</li>
                  <li><strong>执行中：</strong>校验至少选择1个兴趣标签，调用更新接口</li>
                  <li><strong>成功：</strong>显示"保存成功"toast提示</li>
                  <li><strong>失败：</strong>校验失败或接口报错时显示对应错误提示</li>
                  <li><strong>边界条件：</strong>未做任何修改时点击保存仍显示"保存成功"</li>
                </ul>`
            },
            {
                title: '核心字段',
                noTableWrap: true,
                tables: [
                    {
                        title: '偏好标签字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['interest_tags[]', 'array', '是', '兴趣标签ID数组'],
                            ['tag_id', 'number', '是', '标签唯一标识'],
                            ["tag_name", "string", "是", "标签名称，如\"话剧\"\"音乐剧\"\"舞蹈\""]
                        ]
                    },
                    {
                        title: '通知偏好字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['priority_remind', 'boolean', '是', '优先购票提醒开关'],
                            ['birthday_offer', 'boolean', '是', '生日专属优惠开关'],
                            ['points_notification', 'boolean', '是', '积分变动通知开关'],
                            ['personalized_recommend', 'boolean', '是', '个性化推荐开关']
                        ]
                    }
                ]
            }
        ]
    },

    'user-miniapp/real-name-auth.html': {
        title: '实名认证',
        subtitle: '认证状态 + 身份信息 + 证件上传',
        sections: [
            {
                title: '功能描述',
                content: `<p><strong>核心功能：</strong>为用户提供实名认证服务，采集并核验用户真实身份信息。用户提交真实姓名、身份证号及身份证正反面照片后，系统进入人工或自动审核流程。实名认证是部分功能（如提现、购买限制类演出票）的前置条件。</p>
                <p><strong>业务说明：</strong></p>
                <ul>
                  <li><strong>前置条件：</strong>用户已登录且未完成实名认证</li>
                  <li><strong>功能实现逻辑：</strong>
                    <ul>
                      <li>进入页面时查询当前用户认证状态，已认证用户展示认证信息，未认证/审核中展示对应表单</li>
                      <li>用户填写表单并上传身份证正反面照片，前端进行基础格式校验</li>
                      <li>提交后进入审核流程，审核中状态不可再次提交</li>
                      <li>审核通过后更新用户实名状态，真实姓名同步到用户资料</li>
                    </ul>
                  </li>
                  <li><strong>权限控制：</strong>仅允许当前登录用户提交自己的实名认证信息</li>
                  <li><strong>数据约束：</strong>真实姓名2-20字符；身份证号18位（末位可为X）；身份证照片必填，仅支持jpg/png，单张最大5MB</li>
                  <li><strong>能力边界：</strong>每个用户仅可提交一次认证申请，审核中不可修改；审核结果通过消息中心推送</li>
                </ul>`
            },
            {
                title: '交互说明',
                content: `<p><strong>提交认证</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击底部"提交认证"按钮</li>
                  <li><strong>执行中：</strong>前端校验表单完整性（姓名、身份证号、正反面照片），通过后调用提交接口</li>
                  <li><strong>成功：</strong>状态变为"审核中"，显示"认证申请已提交，请等待审核"toast提示</li>
                  <li><strong>失败：</strong>校验失败时显示对应错误提示（如"请输入真实姓名""身份证号格式不正确"）；接口失败显示"提交失败，请重试"</li>
                  <li><strong>边界条件：</strong>审核中状态隐藏提交按钮，仅展示状态卡片；已认证用户不可再次提交</li>
                </ul>
                <p><strong>证件上传</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击身份证正/反面上传区域</li>
                  <li><strong>执行中：</strong>调用系统文件选择器或相机</li>
                  <li><strong>成功：</strong>图片上传至OSS后回显预览</li>
                  <li><strong>失败：</strong>文件过大或格式不支持时提示"请上传不超过5MB的JPG/PNG图片"</li>
                  <li><strong>边界条件：</strong>支持拍照和相册选择两种方式</li>
                </ul>`
            },
            {
                title: '核心字段',
                noTableWrap: true,
                tables: [
                    {
                        title: '认证信息字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['auth_status', 'enum', '是', '认证状态：0-未认证 1-审核中 2-已认证'],
                            ['real_name', 'string', '是', '真实姓名，2-20字符'],
                            ['id_card_number', 'string', '是', '身份证号，18位'],
                            ['id_card_front_url', 'string', '是', '身份证正面照片URL'],
                            ['id_card_back_url', 'string', '是', '身份证反面照片URL']
                        ]
                    }
                ]
            }
        ]
    },

    'user-miniapp/message-service.html': {
        title: '消息中心',
        subtitle: '系统通知 + 订单状态 + 积分变动 + 消息详情',
        sections: [
            {
                title: '功能描述',
                content: `<p><strong>核心功能：</strong>为用户提供系统消息的统一查看和管理入口。消息按类型分为系统通知、订单状态变更和积分变动三类，支持按Tab切换浏览。用户可查看消息详情、执行关联操作（如查看订单），并将消息标记为已读或全部已读。</p>
                <p><strong>业务说明：</strong></p>
                <ul>
                  <li><strong>前置条件：</strong>用户已登录</li>
                  <li><strong>功能实现逻辑：</strong>
                    <ul>
                      <li>进入页面时加载消息列表，按类型分组并统计各Tab未读数量</li>
                      <li>消息按时间降序排列，支持分页加载</li>
                      <li>点击单条消息时标记为已读，并展开或跳转消息详情</li>
                      <li>点击"全部已读"将当前Tab下所有未读消息批量标记为已读</li>
                    </ul>
                  </li>
                  <li><strong>权限控制：</strong>仅登录用户可查看自己的消息，消息数据按用户ID隔离</li>
                  <li><strong>数据约束：</strong>消息正文支持富文本；单用户消息保留最近90天</li>
                  <li><strong>能力边界：</strong>不支持消息删除；不支持消息搜索；系统通知类消息不可回复</li>
                </ul>`
            },
            {
                title: '交互说明',
                content: `<p><strong>查看消息详情</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击单条消息</li>
                  <li><strong>执行中：</strong>消息标记为已读，展开详情视图或跳转详情页</li>
                  <li><strong>成功：</strong>展示消息完整内容（图标+标题+时间+正文+高亮提示+操作按钮）</li>
                  <li><strong>失败：</strong>网络异常时toast提示"加载失败，请重试"</li>
                  <li><strong>边界条件：</strong>已读消息再次点击不重复标记</li>
                </ul>
                <p><strong>Tab切换</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击系统通知/订单状态/积分变动Tab</li>
                  <li><strong>执行中：</strong>切换消息列表，加载对应类型消息</li>
                  <li><strong>成功：</strong>展示对应类型消息列表，不保留滚动位置</li>
                  <li><strong>边界条件：</strong>切换Tab不自动标记消息为已读</li>
                </ul>
                <p><strong>全部已读</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击导航栏"全部已读"按钮</li>
                  <li><strong>执行中：</strong>调用批量已读接口</li>
                  <li><strong>成功：</strong>当前Tab下所有未读消息标记为已读，角标清零，toast提示"已全部标记为已读"</li>
                  <li><strong>失败：</strong>接口失败时toast提示"操作失败，请重试"</li>
                  <li><strong>边界条件：</strong>当前Tab无未读消息时，"全部已读"按钮仍可点击但无实际效果</li>
                </ul>`
            },
            {
                title: '核心字段',
                noTableWrap: true,
                tables: [
                    {
                        title: '消息字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['message_id', 'number', '是', '消息唯一标识'],
                            ['type', 'enum', '是', '消息类型：system-系统通知 order-订单状态 points-积分变动'],
                            ['title', 'string', '是', '消息标题'],
                            ['content', 'string', '是', '消息正文（支持富文本）'],
                            ['summary', 'string', '否', '消息摘要'],
                            ['icon_type', 'string', '否', '图标类型'],
                            ['create_time', 'string', '是', '消息创建时间'],
                            ['is_read', 'boolean', '是', '是否已读'],
                            ['unread_count', 'number', '是', '当前Tab未读数量']
                        ]
                    },
                    {
                        title: '消息详情字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['highlight', 'string', '否', '高亮提示文字'],
                            ["action_text", "string", "否", "操作按钮文字，如\"查看订单\""],
                            ['action_url', 'string', '否', '操作按钮跳转链接'],
                            ['order_id', 'number', '否', '关联订单ID'],
                            ['points', 'number', '否', '关联积分变动数量']
                        ]
                    }
                ]
            }
        ]
    },

    'user-miniapp/order-ticket.html': {
        title: '订单与电子票',
        subtitle: '订单列表 + 电子票夹 + QR码',
        sections: [
            {
                title: '功能描述',
                content: `<p><strong>核心功能：</strong>为用户提供演出订单管理和电子票查看的统一入口。支持按订单状态筛选浏览，查看订单详情并执行对应操作（支付、取消、查看电子票等）。电子票夹提供已购演出票的集中管理，支持二维码展示和离线查看，方便用户在剧场现场快速核销入场。</p>
                <p><strong>业务说明：</strong></p>
                <ul>
                  <li><strong>前置条件：</strong>用户已登录</li>
                  <li><strong>功能实现逻辑：</strong>
                    <ul>
                      <li>进入页面时默认展示"我的订单"视图，加载全部状态订单列表</li>
                      <li>订单按状态分组（待付款/待核销/已完成/已退款），支持Tab切换筛选</li>
                      <li>电子票数据本地缓存，确保离线场景下仍可查看已保存的票券</li>
                      <li>电子票二维码动态生成，支持亮度调节以适应不同光照环境</li>
                    </ul>
                  </li>
                  <li><strong>权限控制：</strong>仅登录用户可查看自己的订单和电子票</li>
                  <li><strong>数据约束：</strong>订单列表按下单时间降序排列；电子票二维码有效期为演出场次开始前2小时至结束后2小时</li>
                  <li><strong>能力边界：</strong>已过期演出票不可核销；退款订单不可查看电子票；电子票不支持转赠</li>
                </ul>`
            },
            {
                title: '交互说明',
                content: `<p><strong>订单支付</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击待付款订单的"去支付"按钮</li>
                  <li><strong>执行中：</strong>跳转支付页面或调起支付收银台</li>
                  <li><strong>成功：</strong>支付成功后订单状态变为"待核销"，toast提示"支付成功"</li>
                  <li><strong>失败：</strong>支付失败或取消时返回订单列表，状态不变</li>
                  <li><strong>边界条件：</strong>订单超过支付有效期（如下单后15分钟）时，"去支付"按钮置灰</li>
                </ul>
                <p><strong>取消订单</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击待付款订单的"取消订单"按钮</li>
                  <li><strong>执行中：</strong>弹出确认弹窗，确认后调用取消接口</li>
                  <li><strong>成功：</strong>订单状态变为"已取消"，toast提示"订单已取消"</li>
                  <li><strong>失败：</strong>已支付订单不可取消，按钮不展示</li>
                </ul>
                <p><strong>查看电子票</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击待核销/已完成订单的"查看电子票"按钮，或切换至电子票夹视图</li>
                  <li><strong>执行中：</strong>展示电子票详情页，含二维码、演出信息、座位信息</li>
                  <li><strong>成功：</strong>二维码正常渲染，支持亮度调节和截图保存</li>
                  <li><strong>边界条件：</strong>离线状态下展示本地缓存的电子票；已退款订单不展示电子票入口</li>
                </ul>
                <p><strong>视图切换</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击顶部"我的订单"/"电子票夹"切换器</li>
                  <li><strong>执行中：</strong>切换视图并加载对应数据</li>
                  <li><strong>边界条件：</strong>切换视图保留各自滚动位置</li>
                </ul>`
            },
            {
                title: '核心字段',
                noTableWrap: true,
                tables: [
                    {
                        title: '订单字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['order_id', 'number', '是', '订单唯一标识'],
                            ['order_no', 'string', '是', '订单编号'],
                            ['status', 'enum', '是', '状态：pending_pay-待付款 pending_verify-待核销 completed-已完成 refunded-已退款'],
                            ['show_title', 'string', '是', '演出名称'],
                            ['cover_image', 'string', '是', '演出封面图URL'],
                            ['session_time', 'string', '是', '场次时间'],
                            ['seats[]', 'array', '是', '座位信息数组'],
                            ['total_amount', 'number', '是', '订单总金额'],
                            ['create_time', 'string', '是', '下单时间']
                        ]
                    },
                    {
                        title: '电子票字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['ticket_id', 'number', '是', '电子票唯一标识'],
                            ['qr_code', 'string', '是', '二维码数据'],
                            ['show_title', 'string', '是', '演出名称'],
                            ['session_time', 'string', '是', '场次时间'],
                            ["seat_info", "string", "是", "座位信息，如\"A区3排5座\""],
                            ['viewer_name', 'string', '是', '观演人姓名'],
                            ['theme', 'enum', '是', '票面主题色：blue_purple/pink_orange/green_cyan/gold_brown']
                        ]
                    }
                ]
            }
        ]
    },

    'user-miniapp/order-detail.html': {
        title: '订单详情',
        subtitle: '订单状态 + 演出信息 + 费用明细 + 座位信息',
        sections: [
            {
                title: '功能描述',
                content: `<p><strong>核心功能：</strong>展示单个票务订单的完整详情，根据订单状态动态显示不同的信息区域和操作按钮。支持待支付倒计时、座位信息查看、费用明细展示、订单信息复制等功能。</p>
                <p><strong>业务说明：</strong></p>
                <ul>
                  <li><strong>前置条件：</strong>用户已登录，从订单列表点击进入</li>
                  <li><strong>功能实现逻辑：</strong>
                    <ul>
                      <li>通过URL参数status决定展示哪种状态（pending-pay/pending-verify/completed/refunded）</li>
                      <li>待支付状态显示倒计时（30分钟），超时自动取消</li>
                      <li>已退款状态额外显示退款金额、退款方式、退款时间</li>
                      <li>订单编号支持点击复制到剪贴板</li>
                    </ul>
                  </li>
                  <li><strong>权限控制：</strong>仅可查看自己的订单</li>
                  <li><strong>数据约束：</strong>已支付订单才显示支付时间和支付方式</li>
                  <li><strong>能力边界：</strong>不支持修改订单信息</li>
                </ul>`
            },
            {
                title: '交互说明',
                content: `<p><strong>查看订单详情</strong></p>
                <ul>
                  <li><strong>触发：</strong>从订单列表点击订单卡片进入</li>
                  <li><strong>执行中：</strong>根据订单状态加载对应的数据和操作按钮</li>
                  <li><strong>成功：</strong>展示完整的订单详情信息</li>
                </ul>
                <p><strong>复制订单编号</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击订单编号</li>
                  <li><strong>成功：</strong>复制到剪贴板，toast提示"已复制"</li>
                </ul>
                <p><strong>立即支付</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击底部"立即支付"按钮（待支付状态）</li>
                  <li><strong>执行中：</strong>调起支付收银台</li>
                  <li><strong>成功：</strong>支付成功后状态变为待核销</li>
                  <li><strong>边界条件：</strong>倒计时归零后按钮置灰</li>
                </ul>`
            },
            {
                title: '核心字段',
                noTableWrap: true,
                tables: [
                    {
                        title: 'URL参数',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['status', 'enum', '否', '订单状态：pending-pay/pending-verify/completed/refunded'],
                            ['from', 'string', '否', '来源页面URL，用于返回按钮']
                        ]
                    },
                    {
                        title: '订单详情字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['order_no', 'string', '是', '订单编号'],
                            ['status', 'enum', '是', '订单状态'],
                            ['show_title', 'string', '是', '演出名称'],
                            ['cover_image', 'string', '是', '演出封面图URL'],
                            ['session_time', 'string', '是', '场次时间'],
                            ['venue_name', 'string', '是', '场馆名称'],
                            ['seats[]', 'array', '是', '座位信息数组（seat_no/tier/price）'],
                            ['total_amount', 'number', '是', '票品总价'],
                            ['discounts[]', 'array', '否', '折扣明细数组'],
                            ['pay_amount', 'number', '是', '实付金额'],
                            ['pay_method', 'string', '否', '支付方式'],
                            ['pay_time', 'string', '否', '支付时间'],
                            ['viewer_name', 'string', '是', '取票人姓名'],
                            ['viewer_phone', 'string', '是', '联系电话'],
                            ['ticket_type', 'string', '是', '取票方式']
                        ]
                    }
                ]
            }
        ]
    },

    'user-miniapp/address-manage.html': {
        title: '地址管理',
        subtitle: '收货地址列表 + 新增/编辑/删除',
        sections: [
            {
                title: '功能描述',
                content: `<p><strong>核心功能：</strong>为用户提供收货地址的增删改查管理。支持设置默认地址、编辑已有地址、删除地址。地址信息用于商品订单配送。</p>
                <p><strong>业务说明：</strong></p>
                <ul>
                  <li><strong>前置条件：</strong>用户已登录</li>
                  <li><strong>功能实现逻辑：</strong>
                    <ul>
                      <li>进入页面加载用户所有收货地址，默认地址排在首位</li>
                      <li>每个用户仅可设置一个默认地址，设为默认时自动取消其他默认</li>
                      <li>地区选择器提供海南省主要城市和区域选项</li>
                      <li>删除默认地址时自动将第一个剩余地址设为默认</li>
                    </ul>
                  </li>
                  <li><strong>权限控制：</strong>仅登录用户可管理自己的地址</li>
                  <li><strong>数据约束：</strong>收货人姓名最多20字，手机号11位，详细地址最多200字</li>
                  <li><strong>能力边界：</strong>地址数量上限20个</li>
                </ul>`
            },
            {
                title: '交互说明',
                content: `<p><strong>新增地址</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击底部"+ 新增地址"按钮</li>
                  <li><strong>执行中：</strong>从底部滑入地址表单弹窗</li>
                  <li><strong>成功：</strong>保存成功后地址列表刷新，toast提示"地址已添加"</li>
                  <li><strong>失败：</strong>校验不通过时toast提示具体字段错误</li>
                </ul>
                <p><strong>编辑地址</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击地址卡片底部"编辑"按钮</li>
                  <li><strong>执行中：</strong>弹窗回填已有地址信息</li>
                  <li><strong>成功：</strong>保存成功后地址列表刷新，toast提示"地址已更新"</li>
                </ul>
                <p><strong>删除地址</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击地址卡片底部"删除"按钮</li>
                  <li><strong>执行中：</strong>弹出确认弹窗</li>
                  <li><strong>成功：</strong>删除后列表刷新，toast提示"地址已删除"</li>
                  <li><strong>边界条件：</strong>删除默认地址时自动将下一个地址设为默认</li>
                </ul>`
            },
            {
                title: '核心字段',
                noTableWrap: true,
                tables: [
                    {
                        title: '地址字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['address_id', 'number', '是', '地址唯一标识'],
                            ['name', 'string', '是', '收货人姓名，最多20字'],
                            ['phone', 'string', '是', '手机号码，11位'],
                            ['region', 'string', '是', '所在地区，如"海南省 海口市 龙华区"'],
                            ['detail', 'string', '是', '详细地址，最多200字'],
                            ['is_default', 'boolean', '是', '是否为默认地址']
                        ]
                    }
                ]
            }
        ]
    },

    'user-miniapp/product-order.html': {
        title: '商品订单',
        subtitle: '商城订单列表 + 物流信息 + 订单详情',
        sections: [
            {
                title: '功能描述',
                content: `<p><strong>核心功能：</strong>为用户提供商城商品订单的集中管理入口，支持按订单状态筛选浏览、查看物流轨迹和订单详情。用户可对待付款订单进行支付或取消操作，对已完成订单查看物流信息并再次购买。</p>
                <p><strong>业务说明：</strong></p>
                <ul>
                  <li><strong>前置条件：</strong>用户已登录</li>
                  <li><strong>功能实现逻辑：</strong>
                    <ul>
                      <li>进入页面时加载全部商品订单列表，按下单时间降序排列</li>
                      <li>支持按状态Tab切换筛选（全部/待付款/待发货/已完成）</li>
                      <li>已完成订单展示物流信息入口，点击后展开物流时间线</li>
                      <li>订单详情以弹窗形式展示，包含商品信息、收货地址和费用明细</li>
                    </ul>
                  </li>
                  <li><strong>权限控制：</strong>仅登录用户可查看自己的商品订单</li>
                  <li><strong>数据约束：</strong>订单状态流转为：待付款 -> 待发货 -> 已完成；待付款订单可在支付有效期内取消</li>
                  <li><strong>能力边界：</strong>不支持订单修改（如修改收货地址）；已完成订单不支持退货退款（需联系客服）</li>
                </ul>`
            },
            {
                title: '交互说明',
                content: `<p><strong>订单支付</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击待付款订单的"去支付"按钮</li>
                  <li><strong>执行中：</strong>跳转支付页面或调起支付收银台</li>
                  <li><strong>成功：</strong>支付成功后订单状态变为"待发货"，toast提示"支付成功"</li>
                  <li><strong>失败：</strong>支付失败或取消时返回订单列表，状态不变</li>
                  <li><strong>边界条件：</strong>订单超过支付有效期时，"去支付"按钮置灰，显示"已过期"</li>
                </ul>
                <p><strong>取消订单</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击待付款订单的"取消订单"按钮</li>
                  <li><strong>执行中：</strong>弹出确认弹窗，确认后调用取消接口</li>
                  <li><strong>成功：</strong>订单状态变为"已取消"，toast提示"订单已取消"</li>
                  <li><strong>失败：</strong>已支付订单不可取消，按钮不展示</li>
                </ul>
                <p><strong>查看物流</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击已完成订单的"查看物流"按钮</li>
                  <li><strong>执行中：</strong>展开物流信息区域或跳转物流详情页</li>
                  <li><strong>成功：</strong>展示快递公司、运单号及物流时间线</li>
                  <li><strong>失败：</strong>物流信息未同步时显示"物流信息更新中，请稍后查看"</li>
                  <li><strong>边界条件：</strong>待发货状态订单物流信息为空，不展示查看物流入口</li>
                </ul>
                <p><strong>查看订单详情</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击订单卡片的"查看详情"按钮或订单区域</li>
                  <li><strong>执行中：</strong>弹出订单详情弹窗</li>
                  <li><strong>成功：</strong>展示订单信息、收货信息、商品列表及费用明细</li>
                  <li><strong>边界条件：</strong>点击弹窗外蒙层或关闭按钮可关闭弹窗</li>
                </ul>`
            },
            {
                title: '核心字段',
                noTableWrap: true,
                tables: [
                    {
                        title: '商品订单字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['order_id', 'number', '是', '订单唯一标识'],
                            ['order_no', 'string', '是', '订单编号'],
                            ['shop_name', 'string', '是', '店铺名称'],
                            ['status', 'enum', '是', '状态：pending-待付款 shipping-待发货 completed-已完成'],
                            ['items[]', 'array', '是', '商品列表'],
                            ['total_amount', 'number', '是', '订单总金额'],
                            ['create_time', 'string', '是', '下单时间']
                        ]
                    },
                    {
                        title: '订单商品字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['product_image', 'string', '是', '商品图片URL'],
                            ['product_name', 'string', '是', '商品名称'],
                            ['spec', 'string', '否', '规格信息'],
                            ['price', 'number', '是', '单价'],
                            ['quantity', 'number', '是', '购买数量']
                        ]
                    },
                    {
                        title: '物流信息字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['express_company', 'string', '是', '快递公司名称'],
                            ['express_no', 'string', '是', '快递单号'],
                            ['logistics[]', 'array', '否', '物流时间线'],
                            ['time', 'string', '是', '物流节点时间'],
                            ['description', 'string', '是', '物流节点描述'],
                            ['is_current', 'boolean', '否', '是否为最新节点']
                        ]
                    },
                    {
                        title: '订单详情字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['pay_method', 'string', '否', '支付方式'],
                            ['receiver_name', 'string', '是', '收件人姓名'],
                            ['receiver_phone', 'string', '是', '收件人电话'],
                            ['receiver_address', 'string', '是', '收货地址'],
                            ['freight', 'number', '否', '运费'],
                            ['discount', 'number', '否', '优惠金额'],
                            ['pay_amount', 'number', '是', '实付金额']
                        ]
                    }
                ]
            }
        ]
    },

    'user-miniapp/shop.html': {
        title: '商城首页',
        subtitle: '分类导航 + 商品网格 + 购物车 + 商品详情',
        sections: [
            {
                title: '功能描述',
                content: `<p><strong>核心功能：</strong>为用户提供演出周边商品和文创产品的浏览与购买入口。支持按商品分类筛选浏览、查看商品详情（含规格选择）、管理购物车以及结算下单。商城与演出票务系统共用用户账号和支付体系。</p>
                <p><strong>业务说明：</strong></p>
                <ul>
                  <li><strong>前置条件：</strong>用户已登录（浏览商品无需登录，加购和购买需登录）</li>
                  <li><strong>功能实现逻辑：</strong>
                    <ul>
                      <li>进入页面时加载商品分类列表和默认分类下的商品列表</li>
                      <li>左侧分类切换时，右侧商品网格异步刷新，支持分页加载</li>
                      <li>商品详情页展示轮播图、价格、规格选项及图文详情</li>
                      <li>购物车数据实时同步服务端，支持跨设备同步</li>
                    </ul>
                  </li>
                  <li><strong>权限控制：</strong>浏览商品无需登录；加购、结算需登录</li>
                  <li><strong>数据约束：</strong>商品库存实时校验，库存为0时显示"已售罄"；购物车单商品限购99件</li>
                  <li><strong>能力边界：</strong>不支持商品收藏功能；不支持商品评价；不支持优惠券抵扣</li>
                </ul>`
            },
            {
                title: '交互说明',
                content: `<p><strong>分类切换</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击左侧分类列表中的分类项</li>
                  <li><strong>执行中：</strong>选中分类高亮，右侧商品列表刷新</li>
                  <li><strong>成功：</strong>展示对应分类商品，列表平滑过渡</li>
                  <li><strong>失败：</strong>网络异常时toast提示"加载失败，请重试"</li>
                  <li><strong>边界条件：</strong>分类下无商品时展示空状态</li>
                </ul>
                <p><strong>加入购物车</strong></p>
                <ul>
                  <li><strong>触发：</strong>在商品详情页点击"加入购物车"按钮</li>
                  <li><strong>执行中：</strong>校验登录状态和商品库存，调用加购接口</li>
                  <li><strong>成功：</strong>购物车角标数量+1，toast提示"已加入购物车"</li>
                  <li><strong>失败：</strong>未登录时跳转登录页；库存不足时提示"库存不足"</li>
                  <li><strong>边界条件：</strong>同一商品多次加购，数量累加；超过99件时提示"已达购买上限"</li>
                </ul>
                <p><strong>购物车结算</strong></p>
                <ul>
                  <li><strong>触发：</strong>在购物车视图点击"结算"按钮</li>
                  <li><strong>执行中：</strong>校验是否有选中商品，跳转订单确认页</li>
                  <li><strong>成功：</strong>跳转订单确认页面，展示商品清单和收货地址</li>
                  <li><strong>失败：</strong>未选中商品时结算按钮置灰，点击无响应</li>
                  <li><strong>边界条件：</strong>商品库存变动导致选中商品库存不足时，提示"部分商品库存不足，请重新选择"</li>
                </ul>
                <p><strong>立即购买</strong></p>
                <ul>
                  <li><strong>触发：</strong>在商品详情页点击"立即购买"按钮</li>
                  <li><strong>执行中：</strong>校验登录状态和库存，直接跳转订单确认页（跳过购物车）</li>
                  <li><strong>成功：</strong>跳转订单确认页面，该商品自动带入</li>
                  <li><strong>失败：</strong>未登录时跳转登录页；库存不足时提示"库存不足"</li>
                </ul>`
            },
            {
                title: '核心字段',
                noTableWrap: true,
                tables: [
                    {
                        title: '商品分类字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['category_id', 'number', '是', '分类唯一标识'],
                            ["category_name", "string", "是", "分类名称，如\"演出衍生品\"\"文创周边\""]
                        ]
                    },
                    {
                        title: '商品字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['product_id', 'number', '是', '商品唯一标识'],
                            ['cover_image', 'string', '是', '商品封面图URL'],
                            ['title', 'string', '是', '商品名称'],
                            ['price', 'number', '是', '销售价格'],
                            ['original_price', 'number', '否', '原价（划线价）'],
                            ['sales_count', 'number', '是', '已售数量'],
                            ['images[]', 'array', '否', '商品详情图片列表'],
                            ['specs[]', 'array', '否', '规格选项列表'],
                            ['stock', 'number', '是', '库存数量'],
                            ['description', 'string', '否', '商品详情富文本']
                        ]
                    },
                    {
                        title: '购物车字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['cart_id', 'number', '是', '购物车项唯一标识'],
                            ['product_id', 'number', '是', '商品ID'],
                            ['sku_id', 'number', '是', 'SKU标识'],
                            ['selected', 'boolean', '是', '是否选中'],
                            ['quantity', 'number', '是', '购买数量'],
                            ['product_name', 'string', '是', '商品名称'],
                            ['spec', 'string', '否', '已选规格'],
                            ['price', 'number', '是', '单价'],
                            ['cart_count', 'number', '是', '购物车商品总数']
                        ]
                    }
                ]
            }
        ]
    },

    'user-miniapp/my-packages.html': {
        title: '我的套票',
        subtitle: '已购券包管理 + 展开查看演出券',
        sections: [
            {
                title: '功能描述',
                content: `<p><strong>核心功能：</strong>为用户提供已购买券包的集中管理入口，支持查看券包基本信息、展开查看包含的演出券详情以及进行选座操作。券包状态根据内部演出券的使用情况动态计算，用户可直观了解每个券包的使用进度和有效期。</p>
                <p><strong>业务说明：</strong></p>
                <ul>
                  <li><strong>前置条件：</strong>用户已登录且购买过券包</li>
                  <li><strong>功能实现逻辑：</strong>
                    <ul>
                      <li>进入页面时加载用户已购券包列表，按购买时间降序排列</li>
                      <li>券包卡片展示概要信息（名称、券数量、有效期、整体状态）</li>
                      <li>点击券包展开后加载并展示内部演出券列表</li>
                      <li>演出券状态根据是否选座、是否使用、是否过期自动计算</li>
                    </ul>
                  </li>
                  <li><strong>权限控制：</strong>仅登录用户可查看自己购买的券包</li>
                  <li><strong>数据约束：</strong>券包有效期以最早过期演出券的时间为准；演出券必须在场次开始前完成选座</li>
                  <li><strong>能力边界：</strong>不支持券包转赠；不支持部分退款；过期券包不可使用但可查看记录</li>
                </ul>`
            },
            {
                title: '交互说明',
                content: `<p><strong>展开/收起券包</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击券包卡片</li>
                  <li><strong>执行中：</strong>展开或收起券包详情，加载内部演出券列表</li>
                  <li><strong>成功：</strong>展开动画（高度过渡 + 箭头旋转），展示演出券列表</li>
                  <li><strong>失败：</strong>网络异常时toast提示"加载失败，请重试"</li>
                  <li><strong>边界条件：</strong>券包内无演出券时展开后展示空状态</li>
                </ul>
                <p><strong>选座操作</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击未使用演出券的"选座"按钮</li>
                  <li><strong>执行中：</strong>跳转选座页面</li>
                  <li><strong>成功：</strong>进入选座流程，选座成功后演出券状态变为"已选座"</li>
                  <li><strong>失败：</strong>演出券已过期或已使用时按钮置灰不可点击</li>
                  <li><strong>边界条件：</strong>选座后不可更改座位，如需调整需联系客服</li>
                </ul>
                <p><strong>查看演出券详情</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击演出券卡片</li>
                  <li><strong>执行中：</strong>跳转演出券详情页或弹出详情弹窗</li>
                  <li><strong>成功：</strong>展示演出封面、名称、场次时间、座位信息及使用状态</li>
                  <li><strong>边界条件：</strong>已使用的演出券展示核销时间和入场记录</li>
                </ul>`
            },
            {
                title: '核心字段',
                noTableWrap: true,
                tables: [
                    {
                        title: '已购券包字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['package_id', 'number', '是', '券包唯一标识'],
                            ['name', 'string', '是', '券包名称'],
                            ['coupon_count', 'number', '是', '包含券数量'],
                            ['expire_date', 'string', '是', '有效期截止时间'],
                            ['status', 'enum', '是', '状态：active-可使用 partial-部分使用 used-已使用 expired-已过期']
                        ]
                    },
                    {
                        title: '演出券字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['coupon_id', 'number', '是', '演出券唯一标识'],
                            ['show_title', 'string', '是', '演出名称'],
                            ['cover_image', 'string', '是', '演出封面缩略图URL'],
                            ['session_time', 'string', '是', '场次时间'],
                            ["seat_info", "string", "否", "座位信息，如\"A区3排5座\"或\"未选座\""],
                            ['status', 'enum', '是', '状态：unused-未使用 selected-已选座 used-已使用 expired-已过期']
                        ]
                    }
                ]
            }
        ]
    },

    'user-miniapp/recharge-topup.html': {
        title: '充值页',
        subtitle: '余额显示 + 金额选择 + 支付方式',
        sections: [
            {
                title: '功能描述',
                content: `<p><strong>核心功能：</strong>为用户提供钱包余额的在线充值入口，支持选择预设充值金额或输入自定义金额，并选择支付方式进行支付。系统根据充值金额档位自动计算赠送金额，充值成功后余额实时更新。</p>
                <p><strong>业务说明：</strong></p>
                <ul>
                  <li><strong>前置条件：</strong>用户已登录</li>
                  <li><strong>功能实现逻辑：</strong>
                    <ul>
                      <li>进入页面时加载当前余额和充值优惠活动配置</li>
                      <li>用户选择预设金额或输入自定义金额，系统实时计算赠送金额和到账总额</li>
                      <li>选择支付方式（微信支付/支付宝），点击立即充值调起对应支付SDK</li>
                      <li>支付成功后异步通知服务端，更新用户余额并写入充值流水</li>
                    </ul>
                  </li>
                  <li><strong>权限控制：</strong>仅登录用户可充值，余额数据按用户ID隔离</li>
                  <li><strong>数据约束：</strong>自定义充值金额最低10元，最高5000元；赠送金额按档位固定计算</li>
                  <li><strong>能力边界：</strong>充值金额不可退款；充值赠送金额与充值本金同时到账；不支持充值卡支付</li>
                </ul>`
            },
            {
                title: '交互说明',
                content: `<p><strong>选择充值金额</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击预设金额网格（¥50/¥100/¥200/¥500）或输入自定义金额</li>
                  <li><strong>执行中：</strong>选中金额高亮，实时展示赠送金额和到账总额</li>
                  <li><strong>成功：</strong>金额选中，立即充值按钮变为可点击状态</li>
                  <li><strong>边界条件：</strong>自定义金额低于10元或超过5000元时，输入框下方提示错误信息，充值按钮置灰</li>
                </ul>
                <p><strong>立即充值</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击底部"立即充值"按钮</li>
                  <li><strong>执行中：</strong>校验金额和支付方式，调起支付SDK</li>
                  <li><strong>成功：</strong>支付完成后返回页面，余额实时更新，toast提示"充值成功"</li>
                  <li><strong>失败：</strong>支付取消时无提示，返回页面状态不变；支付失败时toast提示"支付失败，请重试"</li>
                  <li><strong>边界条件：</strong>网络异常导致支付状态未同步时，用户可手动下拉刷新余额</li>
                </ul>
                <p><strong>切换支付方式</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击支付方式选项（微信支付/支付宝）</li>
                  <li><strong>执行中：</strong>切换选中状态</li>
                  <li><strong>边界条件：</strong>默认选中微信支付；仅支持单选</li>
                </ul>`
            },
            {
                title: '核心字段',
                noTableWrap: true,
                tables: [
                    {
                        title: '充值记录字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['balance', 'number', '是', '当前余额'],
                            ['amount', 'number', '是', '充值金额'],
                            ['bonus', 'number', '否', '赠送金额'],
                            ['custom_amount', 'number', '否', '自定义充值金额，最低10元，最高5000元'],
                            ['pay_method', 'enum', '是', '支付方式：wechat-微信支付 alipay-支付宝']
                        ]
                    }
                ]
            }
        ]
    },

    'user-miniapp/recharge-card-bind.html': {
        title: '充值卡绑定',
        subtitle: '绑定新卡 + 已绑定卡片列表 + 转入钱包',
        sections: [
            {
                title: '功能描述',
                content: `<p><strong>核心功能：</strong>为用户提供实体充值卡的线上绑定入口，用户输入充值卡号和充值卡密码后系统将卡内金额充值到用户钱包余额。同时展示已绑定充值卡的历史记录，支持将已绑定卡中的余额转入钱包。绑定流程需验证充值卡密码以确保操作安全。</p>
                <p><strong>业务说明：</strong></p>
                <ul>
                  <li><strong>前置条件：</strong>用户已登录</li>
                  <li><strong>功能实现逻辑：</strong>
                    <ul>
                      <li>进入页面时加载已绑定充值卡列表</li>
                      <li>用户输入充值卡号和充值卡密码，前端校验格式（卡号至少8位字母数字）</li>
                      <li>点击绑定后，后端校验卡号有效性（是否存在、是否已使用、是否过期）及充值卡密码是否正确</li>
                      <li>校验通过后，卡面金额充值到用户钱包余额，并写入充值流水和绑定记录</li>
                      <li>已绑定的充值卡支持"转入钱包"功能，将卡内余额转入用户钱包</li>
                    </ul>
                  </li>
                  <li><strong>权限控制：</strong>仅登录用户可绑定充值卡，每张卡只能绑定一次</li>
                  <li><strong>数据约束：</strong>卡号至少8位，仅允许字母和数字；已绑定的卡不可重复绑定；过期卡不可绑定</li>
                  <li><strong>能力边界：</strong>不支持充值卡解绑；不支持充值卡转赠；充值卡金额一次性全额充值，不可分批</li>
                </ul>`
            },
            {
                title: '交互说明',
                content: `<p><strong>绑定充值卡</strong></p>
                <ul>
                  <li><strong>触发：</strong>输入卡号和充值卡密码后点击"绑定充值卡"按钮</li>
                  <li><strong>执行中：</strong>前端校验卡号格式（至少8位字母数字）和充值卡密码非空，通过后调用绑定接口</li>
                  <li><strong>成功：</strong>卡号有效、密码正确且未使用时，余额增加对应金额，toast提示"绑定成功，余额已到账"，已绑定卡片列表自动刷新</li>
                  <li><strong>失败：</strong>卡号无效时提示"请输入有效的充值卡号"；卡号已使用时提示"该充值卡已被使用"；卡号过期时提示"该充值卡已过期"；密码错误时提示"充值卡密码错误"</li>
                  <li><strong>边界条件：</strong>卡号少于8位或非字母数字组合时，绑定按钮置灰不可点击；充值卡密码为空时提示"请输入充值卡密码"</li>
                </ul>
                <p><strong>转入钱包（新绑定卡）</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击已绑定充值卡上的"转入钱包"按钮</li>
                  <li><strong>执行中：</strong>弹出转入金额输入弹窗，需输入充值卡密码进行验证</li>
                  <li><strong>成功：</strong>密码验证通过后，输入金额转入钱包余额，toast提示"转入成功"，卡片余额更新</li>
                  <li><strong>失败：</strong>密码错误时提示"充值卡密码错误"；余额不足时提示"卡内余额不足"</li>
                  <li><strong>边界条件：</strong>转入金额不能超过卡内余额</li>
                </ul>
                <p><strong>转入钱包（已绑定卡）</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击已绑定充值卡列表中的"转入钱包"按钮</li>
                  <li><strong>执行中：</strong>弹出确认弹窗，显示转入金额，无需输入密码即可确认</li>
                  <li><strong>成功：</strong>确认后金额转入钱包余额，toast提示"转入成功"，卡片余额更新</li>
                  <li><strong>失败：</strong>余额不足时提示"卡内余额不足"</li>
                  <li><strong>边界条件：</strong>转入金额不能超过卡内余额</li>
                </ul>
                <p><strong>查看已绑定卡片</strong></p>
                <ul>
                  <li><strong>触发：</strong>进入页面自动加载</li>
                  <li><strong>成功：</strong>展示已绑定充值卡列表（卡号后4位+绑定时间+金额+状态）</li>
                  <li><strong>边界条件：</strong>无绑定记录时展示空状态</li>
                </ul>`
            },
            {
                title: '核心字段',
                noTableWrap: true,
                tables: [
                    {
                        title: '充值卡字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['card_number', 'string', '是', '充值卡号，至少8位字母数字'],
                            ['card_password', 'string', '是', '充值卡密码，绑定和转入时需验证'],
                            ['card_id', 'number', '是', '已绑定卡片唯一标识'],
                            ['card_last_four', 'string', '是', '卡号后4位'],
                            ['bind_time', 'string', '是', '绑定时间'],
                            ['amount', 'number', '是', '面额金额'],
                            ['status', 'enum', '是', '状态：activated-已激活 used-已使用 expired-已过期']
                        ]
                    },
                    {
                        title: '转入字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['transfer_amount', 'number', '是', '转入钱包金额，不能超过卡内余额'],
                            ['card_password', 'string', '是', '充值卡密码，新绑定卡转入时需验证，已绑定卡转入无需密码']
                        ]
                    }
                ]
            }
        ]
    },

    'user-miniapp/physical-card-apply.html': {
        title: '实体卡申请',
        subtitle: '等级展示 + 卡片选择 + 权益 + 申请表单',
        sections: [
            {
                title: '功能描述',
                content: `<p><strong>核心功能：</strong>为符合条件的会员用户提供实体会员卡申请服务。用户可查看当前会员等级、可选卡片类型及对应权益，填写收件信息后提交申请。系统审核通过后安排实体卡制作和邮寄。</p>
                <p><strong>业务说明：</strong></p>
                <ul>
                  <li><strong>前置条件：</strong>用户已登录且会员等级达到金卡及以上</li>
                  <li><strong>功能实现逻辑：</strong>
                    <ul>
                      <li>进入页面时加载当前会员等级和已解锁的卡片类型</li>
                      <li>低等级卡片类型自动解锁可选，高等级卡片类型根据会员等级锁定或解锁</li>
                      <li>用户选择卡片类型，填写收件信息（姓名、手机号、地址）</li>
                      <li>提交申请后进入审核流程，审核通过后安排制卡和邮寄</li>
                    </ul>
                  </li>
                  <li><strong>权限控制：</strong>仅金卡及以上会员可申请；每个用户限申请一张实体卡</li>
                  <li><strong>数据约束：</strong>姓名2-20字符；手机号11位；所在地区必选（省+市）；详细地址5-100字符</li>
                  <li><strong>能力边界：</strong>已申请过实体卡的用户不可再次申请；申请提交后不可修改收件信息；不支持到付，邮费由平台承担</li>
                </ul>`
            },
            {
                title: '交互说明',
                content: `<p><strong>选择卡片类型</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击金卡或钻石卡选项</li>
                  <li><strong>执行中：</strong>切换选中状态</li>
                  <li><strong>成功：</strong>选中卡片高亮，下方权益展示区域更新为对应卡片权益</li>
                  <li><strong>边界条件：</strong>未解锁的卡片类型置灰不可选，点击时提示"该卡片需达到XX等级后解锁"</li>
                </ul>
                <p><strong>提交申请</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击底部"提交申请"按钮</li>
                  <li><strong>执行中：</strong>前端校验表单完整性（姓名、手机号、所在地区、详细地址），通过后调用提交接口</li>
                  <li><strong>成功：</strong>弹出成功弹窗，提示"申请已提交，审核通过后将安排邮寄"</li>
                  <li><strong>失败：</strong>校验失败时显示对应错误提示（如"请输入正确的手机号"）；接口失败显示"提交失败，请重试"</li>
                  <li><strong>边界条件：</strong>已申请过的用户提交按钮置灰，提示"您已申请过实体卡"</li>
                </ul>
                <p><strong>查看申请记录</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击"申请记录"入口</li>
                  <li><strong>成功：</strong>跳转申请记录页面，展示历史申请状态（审核中/已邮寄/已签收）</li>
                  <li><strong>边界条件：</strong>无申请记录时展示空状态</li>
                </ul>`
            },
            {
                title: '核心字段',
                noTableWrap: true,
                tables: [
                    {
                        title: '申请信息字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['member_level', 'enum', '是', '当前会员等级：0-普通 1-银卡 2-金卡 3-钻石卡(diamond)'],
                            ["level_name", "string", "是", "等级名称，如\"金卡会员\""],
                            ['vip_level', 'number', '是', 'VIP等级数字'],
                            ['card_type', 'enum', '是', '申请卡片类型：gold-金卡 diamond-钻石卡'],
                            ['is_unlocked', 'boolean', '是', '卡片类型是否已解锁'],
                            ['name', 'string', '是', '收件人姓名，2-20字符'],
                            ['phone', 'string', '是', '收件人手机号，11位'],
                            ['province', 'string', '是', '省份'],
                            ['city', 'string', '是', '城市'],
                            ['address', 'string', '是', '详细地址，5-100字符']
                        ]
                    },
                    {
                        title: '权益字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['benefit_id', 'number', '是', '权益唯一标识'],
                            ['name', 'string', '是', '权益名称'],
                            ['description', 'string', '是', '权益说明']
                        ]
                    }
                ]
            }
        ]
    },

    'user-miniapp/transaction-record.html': {
        title: '钱包交易记录',
        subtitle: '交易流水 + 筛选 + 汇总',
        sections: [
            {
                title: '功能描述',
                content: `<p><strong>核心功能：</strong>为用户提供钱包交易流水的查询和统计入口。支持按时间范围筛选交易记录，展示累计收入、累计支出和当前余额的汇总数据。交易列表按月份分组展示，包含交易类型、标题、时间、金额及交易后余额，帮助用户清晰了解资金变动情况。支持充值卡充值和充值卡消费两种特殊交易类型。</p>
                <p><strong>业务说明：</strong></p>
                <ul>
                  <li><strong>前置条件：</strong>用户已登录</li>
                  <li><strong>功能实现逻辑：</strong>
                    <ul>
                      <li>进入页面时加载默认全部时间范围的交易流水和汇总数据</li>
                      <li>切换时间筛选标签时，重新请求对应范围的数据并更新汇总栏</li>
                      <li>交易列表按月份降序分组，组内按时间降序排列</li>
                      <li>支持分页加载，滚动到底部自动加载更多</li>
                      <li>充值卡充值（recharge_card_charge）：用户绑定充值卡后，卡面金额充值到钱包余额</li>
                      <li>充值卡消费（recharge_card_consume）：使用充值卡余额进行消费支付</li>
                    </ul>
                  </li>
                  <li><strong>权限控制：</strong>仅登录用户可查看自己的交易记录</li>
                  <li><strong>数据约束：</strong>交易记录保留最近2年；金额精度为小数点后2位；汇总数据实时计算</li>
                  <li><strong>能力边界：</strong>不支持按交易类型筛选；不支持导出；不支持交易记录删除</li>
                </ul>`
            },
            {
                title: '交互说明',
                content: `<p><strong>时间筛选切换</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击筛选标签（全部/本月/近三月/近半年）</li>
                  <li><strong>执行中：</strong>切换选中标签，请求对应时间范围的数据</li>
                  <li><strong>成功：</strong>交易列表和汇总栏（累计收入/累计支出/当前余额）同步更新</li>
                  <li><strong>失败：</strong>网络异常时toast提示"加载失败，请重试"</li>
                  <li><strong>边界条件：</strong>当前选中标签再次点击无操作；筛选结果为空时展示空状态</li>
                </ul>
                <p><strong>查看交易详情</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击单条交易记录</li>
                  <li><strong>执行中：</strong>展开或跳转交易详情</li>
                  <li><strong>成功：</strong>展示交易完整信息（类型、标题、时间、金额、交易后余额、关联订单号）</li>
                  <li><strong>边界条件：</strong>无关联订单的交易不展示订单号字段</li>
                </ul>
                <p><strong>列表加载</strong></p>
                <ul>
                  <li><strong>触发：</strong>页面进入或滚动到底部</li>
                  <li><strong>执行中：</strong>分页加载交易记录</li>
                  <li><strong>成功：</strong>新记录追加到列表底部</li>
                  <li><strong>边界条件：</strong>无更多数据时展示"没有更多记录"提示</li>
                </ul>`
            },
            {
                title: '核心字段',
                noTableWrap: true,
                tables: [
                    {
                        title: '交易汇总字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['total_income', 'number', '是', '累计收入金额'],
                            ['total_expend', 'number', '是', '累计支出金额'],
                            ['current_balance', 'number', '是', '当前余额'],
                            ['time_range', 'enum', '是', '筛选范围：all-全部 month-本月 quarter-近三月 half_year-近半年']
                        ]
                    },
                    {
                        title: '交易流水字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['record_id', 'number', '是', '流水唯一标识'],
                            ['type', 'enum', '是', '类型：recharge-充值 consume-消费 refund-退款 recharge_card_charge-充值卡充值 recharge_card_consume-充值卡消费'],
                            ["title", "string", "是", "交易标题，如\"微信充值\"\"购买演出-xxx\"\"充值卡充值\""],
                            ['amount', 'number', '是', '交易金额'],
                            ['balance', 'number', '是', '交易后余额'],
                            ['create_time', 'string', '是', '交易时间'],
                            ['order_id', 'number', '否', '关联订单ID']
                        ]
                    }
                ]
            }
        ]
    },

    'user-miniapp/theater-list.html': {
        title: '剧院列表',
        subtitle: '城市筛选 + 剧院列表',
        sections: [
            {
                title: '功能描述',
                content: `<p><strong>核心功能：</strong>为用户提供合作剧院的浏览和筛选入口。支持按城市快速筛选剧院，展示剧院基本信息（封面、地址、演出场次、座位数等），用户可点击剧院卡片查看详情和当前演出场次。该页面帮助用户发现附近的演出场馆并规划观演行程。</p>
                <p><strong>业务说明：</strong></p>
                <ul>
                  <li><strong>前置条件：</strong>无特殊前置条件，所有用户均可浏览</li>
                  <li><strong>功能实现逻辑：</strong>
                    <ul>
                      <li>进入页面时加载全部城市标签和全部剧院列表</li>
                      <li>城市标签支持水平滚动，点击切换时剧院列表异步刷新</li>
                      <li>剧院列表按城市分组或按默认排序展示</li>
                      <li>点击剧院卡片跳转剧院详情页，展示该剧院当前演出场次</li>
                    </ul>
                  </li>
                  <li><strong>权限控制：</strong>浏览剧院列表无需登录</li>
                  <li><strong>数据约束：</strong>仅展示有合作关系的剧院；演出场次数为当前在售场次数量</li>
                  <li><strong>能力边界：</strong>不支持剧院搜索；不支持地图导航；不支持在线选座（需跳转演出详情页）</li>
                </ul>`
            },
            {
                title: '交互说明',
                content: `<p><strong>城市筛选</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击城市标签（全部/海口/三亚/琼海/万宁/儋州等）</li>
                  <li><strong>执行中：</strong>切换选中标签，请求对应城市的剧院数据</li>
                  <li><strong>成功：</strong>剧院列表带淡入淡出动画刷新，展示选中城市的剧院</li>
                  <li><strong>失败：</strong>网络异常时toast提示"加载失败，请重试"</li>
                  <li><strong>边界条件：</strong>默认显示"全部"城市；标签栏支持水平滚动；选中城市无剧院时展示空状态</li>
                </ul>
                <p><strong>查看剧院详情</strong></p>
                <ul>
                  <li><strong>触发：</strong>点击剧院卡片</li>
                  <li><strong>执行中：</strong>跳转剧院详情页面</li>
                  <li><strong>成功：</strong>展示剧院详细信息（封面大图、地址、简介、当前演出场次列表）</li>
                  <li><strong>失败：</strong>网络异常时toast提示"加载失败，请重试"</li>
                </ul>
                <p><strong>列表加载</strong></p>
                <ul>
                  <li><strong>触发：</strong>页面进入或滚动到底部</li>
                  <li><strong>执行中：</strong>分页加载剧院列表</li>
                  <li><strong>成功：</strong>新记录追加到列表底部</li>
                  <li><strong>边界条件：</strong>无更多数据时展示"没有更多剧院"提示</li>
                </ul>`
            },
            {
                title: '核心字段',
                noTableWrap: true,
                tables: [
                    {
                        title: '剧院字段',
                        headers: ['字段名', '类型', '必填', '说明'],
                        rows: [
                            ['theater_id', 'number', '是', '剧院唯一标识'],
                            ['image', 'string', '是', '剧院封面图URL'],
                            ['city', 'string', '是', '所在城市'],
                            ['city_name', 'string', '是', '城市名称'],
                            ['name', 'string', '是', '剧院名称'],
                            ['address', 'string', '是', '剧院地址'],
                            ['show_count', 'number', '是', '当前演出场次数'],
                            ['seat_count', 'number', '是', '座位总数']
                        ]
                    }
                ]
            }
        ]
    },

    // ========== 代理端 + 管理端 + PC后台 ==========
    // ============================================================
  // 代理端小程序 (Agent Mini App)
  // ============================================================

  'user-miniapp/agent-miniapp.html': {
    title: '代理中心',
    subtitle: '代理端小程序',
    sections: [
        {
            title: '功能描述',
            content: `<p><strong>核心功能：</strong>代理中心首页，采用浅色主题（背景色 #F5F6FA），展示代理角色信息、佣金统计、操作入口、热门推广及推广数据概览。</p>
                <p><strong>页面模块：</strong></p>
                <ul>
                    <li><strong>代理角色信息卡片</strong>：金色渐变圆形头像+名称+等级+编号+类型+加入时间</li>
                    <li><strong>佣金统计</strong>：累计佣金/待结算/可提现三项数据，右侧"提现"快捷按钮</li>
                    <li><strong>操作入口</strong>：7项功能入口（分销码/分享海报/推广链接/佣金明细/提现记录/推广数据/分销规则）</li>
                    <li><strong>热门推广</strong>：3个热门演出推广卡片，含佣金比例和推广按钮</li>
                    <li><strong>推广数据概览</strong>：时间Tab切换（今日/本周/本月）+ 访客/下单/支付/退款漏斗数据</li>
                </ul>`
        },
        {
            title: '交互说明',
            content: `<p><strong>点击提现按钮</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击佣金统计右侧"提现"按钮</li>
                    <li><strong>成功：</strong>跳转 agent-miniapp-withdraw.html 提现申请页面</li>
                </ul>
                <p><strong>点击操作入口</strong></p>
                <ul>
                    <li><strong>我的分销码：</strong>跳转 agent-miniapp-qrcode.html</li>
                    <li><strong>分享海报：</strong>跳转 agent-miniapp-poster.html</li>
                    <li><strong>推广链接：</strong>点击复制个人推广链接到剪贴板，显示"复制成功"</li>
                    <li><strong>佣金明细：</strong>跳转 agent-miniapp-commission.html</li>
                    <li><strong>提现记录：</strong>跳转 agent-miniapp-withdraw.html 并切换到提现记录Tab</li>
                    <li><strong>推广数据：</strong>跳转 agent-miniapp-stats.html</li>
                    <li><strong>分销规则：</strong>跳转 agent-miniapp-rules.html</li>
                </ul>
                <p><strong>点击推广按钮</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击热门推广卡片上的"推广"按钮</li>
                    <li><strong>成功：</strong>生成该演出的推广链接/海报</li>
                </ul>
                <p><strong>时间Tab切换</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击今日/本周/本月Tab</li>
                    <li><strong>成功：</strong>推广数据概览按所选时间维度刷新</li>
                </ul>`
        },
        {
            title: '核心字段',
            noTableWrap: true,
            tables: [
                {
                    title: '代理信息字段',
                    headers: ['字段名', '类型', '必填', '说明'],
                    rows: [
                        ['agent_id', 'number', '是', '代理唯一标识'],
                        ['avatar', 'string', '是', '代理头像URL'],
                        ['nickname', 'string', '是', '代理昵称'],
                        ['level', 'enum', '是', '代理等级：普通代理/铜牌/银牌/金牌/钻石'],
                        ['agent_no', 'string', '是', '代理编号'],
                        ['type', 'enum', '是', '代理类型：员工代理/外部代理'],
                        ['join_time', 'string', '是', '加入时间']
                    ]
                },
                {
                    title: '佣金统计字段',
                    headers: ['字段名', '类型', '必填', '说明'],
                    rows: [
                        ['total_commission', 'number', '是', '累计佣金（元）'],
                        ['pending_commission', 'number', '是', '待结算佣金（元）'],
                        ['available_commission', 'number', '是', '可提现佣金（元）']
                    ]
                }
            ]
        }
    ]
  },

  'user-miniapp/agent-miniapp-withdraw.html': {
    title: '佣金管理',
    subtitle: '代理端小程序',
    sections: [
        {
            title: '功能描述',
            content: `<p><strong>核心功能：</strong>佣金提现管理页面，包含提现申请和提现记录两个子Tab，支持快捷金额选择和提现到微信零钱。</p>
                <p><strong>页面模块：</strong></p>
                <ul>
                    <li><strong>子Tab切换</strong>：提现申请 / 提现记录</li>
                    <li><strong>提现申请</strong>：余额卡片+金额输入框+快捷金额按钮+提现方式+规则提示+确认按钮</li>
                    <li><strong>提现记录</strong>：历史提现记录列表，含金额/状态/申请时间/提现方式</li>
                </ul>`
        },
        {
            title: '交互说明',
            content: `<p><strong>子Tab切换</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击"提现申请"或"提现记录"Tab</li>
                    <li><strong>成功：</strong>切换对应面板内容</li>
                </ul>
                <p><strong>快捷金额选择</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击¥50/¥100/¥500/¥1000/全部按钮</li>
                    <li><strong>成功：</strong>一键填入对应金额到输入框</li>
                </ul>
                <p><strong>提交提现申请</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击"确认提现"按钮</li>
                    <li><strong>执行中：</strong>校验提现金额（不超过可提现余额）</li>
                    <li><strong>成功：</strong>提交申请，状态变为"审核中"，刷新提现记录列表</li>
                    <li><strong>失败：</strong>金额超限提示"提现金额超过可提现余额"</li>
                </ul>`
        },
        {
            title: '核心字段',
            noTableWrap: true,
            tables: [
                {
                    title: '提现申请字段',
                    headers: ['字段名', '类型', '必填', '说明'],
                    rows: [
                        ['available_balance', 'number', '是', '当前可提现余额'],
                        ['withdraw_amount', 'number', '是', '提现金额'],
                        ['withdraw_method', 'enum', '是', '提现方式：微信零钱'],
                        ['quick_amounts', 'array', '是', '快捷金额选项（如[50,100,500,1000]）']
                    ]
                },
                {
                    title: '提现记录字段',
                    headers: ['字段名', '类型', '必填', '说明'],
                    rows: [
                        ['record_id', 'number', '是', '提现记录唯一标识'],
                        ['withdraw_amount', 'number', '是', '提现金额'],
                        ['status', 'enum', '是', '状态：已到账/审核中/已驳回'],
                        ['apply_time', 'string', '是', '申请时间'],
                        ['withdraw_method', 'string', '是', '提现方式'],
                        ['remark', 'string', '否', '驳回原因（驳回状态时显示）']
                    ]
                }
            ]
        }
    ]
  },

  'user-miniapp/agent-miniapp-stats.html': {
    title: '推广数据',
    subtitle: '代理端小程序',
    sections: [
        {
            title: '功能描述',
            content: `<p><strong>核心功能：</strong>代理推广数据统计页面，提供时间维度的数据概览、转化漏斗分析和热门推广排行。</p>
                <p><strong>页面模块：</strong></p>
                <ul>
                    <li><strong>时间筛选</strong>：顶部Tab切换（今日/本周/本月）</li>
                    <li><strong>数据概览</strong>：2x2网格展示访客/下单/支付/退款四项指标</li>
                    <li><strong>转化漏斗</strong>：四级漏斗图展示各环节转化率</li>
                    <li><strong>热门推广排行</strong>：Top5演出排行（排名/名称/访客/下单/转化率）</li>
                </ul>`
        },
        {
            title: '交互说明',
            content: `<p><strong>时间Tab切换</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击今日/本周/本月Tab</li>
                    <li><strong>成功：</strong>数据概览、转化漏斗、热门排行按所选时间维度刷新</li>
                </ul>
                <p><strong>查看排行详情</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击热门推广排行中的演出项</li>
                    <li><strong>成功：</strong>跳转该演出的推广详情页</li>
                </ul>`
        },
        {
            title: '核心字段',
            noTableWrap: true,
            tables: [
                {
                    title: '数据概览字段',
                    headers: ['字段名', '类型', '必填', '说明'],
                    rows: [
                        ['time_range', 'enum', '是', '时间维度：今日/本周/本月'],
                        ['visitors', 'number', '是', '访客数'],
                        ['orders', 'number', '是', '下单数'],
                        ['payments', 'number', '是', '支付数'],
                        ['refunds', 'number', '是', '退款数']
                    ]
                },
                {
                    title: '转化漏斗字段',
                    headers: ['字段名', '类型', '必填', '说明'],
                    rows: [
                        ['stage', 'string', '是', '漏斗阶段：访客/下单/支付/退款'],
                        ['count', 'number', '是', '该阶段数量'],
                        ['conversion_rate', 'number', '是', '转化率（百分比），相对于上一阶段']
                    ]
                }
            ]
        }
    ]
  },

  'user-miniapp/agent-miniapp-rules.html': {
    title: '分销规则',
    subtitle: '代理端小程序',
    sections: [
        {
            title: '功能描述',
            content: `<p><strong>核心功能：</strong>分销体系规则说明页面，详细展示分销说明、佣金比例、结算规则、提现规则和注意事项。</p>
                <p><strong>页面模块：</strong></p>
                <ul>
                    <li><strong>一级分销说明</strong>：分销体系基本概念和运作方式</li>
                    <li><strong>佣金比例表格</strong>：5种演出类型对应的佣金比例</li>
                    <li><strong>结算规则</strong>：4条佣金结算规则（周期/条件/方式）</li>
                    <li><strong>提现规则</strong>：5条提现规则（门槛/额度/到账时间/手续费）</li>
                    <li><strong>注意事项</strong>：5条分销注意事项（违规/冻结/调整等）</li>
                </ul>`
        },
        {
            title: '交互说明',
            content: `<p><strong>页面浏览</strong></p>
                <ul>
                    <li>页面为纯信息展示，无复杂交互</li>
                    <li>支持上下滚动查看完整规则内容</li>
                </ul>
                <p><strong>规则更新提示</strong></p>
                <ul>
                    <li>规则更新时进入页面显示"规则已更新"提示条</li>
                    <li>点击提示条可查看更新内容摘要</li>
                </ul>`
        },
        {
            title: '核心字段',
            noTableWrap: true,
            tables: [
                {
                    title: '佣金比例字段',
                    headers: ['字段名', '类型', '必填', '说明'],
                    rows: [
                        ['show_type', 'string', '是', '演出类型（如音乐会/话剧/舞蹈等）'],
                        ['commission_rate', 'number', '是', '佣金比例（百分比）'],
                        ['level_bonus', 'number', '否', '等级加成比例（百分比）']
                    ]
                }
            ]
        }
    ]
  },

  'user-miniapp/agent-miniapp-qrcode.html': {
    title: '我的分销码',
    subtitle: '代理端小程序',
    sections: [
        {
            title: '功能描述',
            content: `<p><strong>核心功能：</strong>展示代理专属分销二维码页面，用户可保存图片或分享给他人进行推广。</p>
                <p><strong>页面模块：</strong></p>
                <ul>
                    <li><strong>提示文字</strong>：页面顶部使用说明，引导扫码或分享</li>
                    <li><strong>分销码卡片</strong>：居中展示200x200像素专属二维码+代理信息</li>
                    <li><strong>操作按钮</strong>：保存图片 / 分享</li>
                </ul>`
        },
        {
            title: '交互说明',
            content: `<p><strong>保存图片</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击"保存图片"按钮</li>
                    <li><strong>执行中：</strong>请求相册权限</li>
                    <li><strong>成功：</strong>分销码卡片保存到手机相册，显示"保存成功"</li>
                    <li><strong>失败：</strong>权限被拒绝时引导用户开启权限</li>
                </ul>
                <p><strong>分享</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击"分享"按钮</li>
                    <li><strong>成功：</strong>调起微信分享面板，可分享给好友或群聊</li>
                </ul>`
        },
        {
            title: '核心字段',
            noTableWrap: true,
            tables: [
                {
                    title: '分销码字段',
                    headers: ['字段名', '类型', '必填', '说明'],
                    rows: [
                        ['agent_id', 'number', '是', '代理唯一标识'],
                        ['agent_name', 'string', '是', '代理姓名'],
                        ['agent_no', 'string', '是', '代理编号'],
                        ['agent_level', 'enum', '是', '代理等级'],
                        ['qrcode_url', 'string', '是', '分销二维码图片URL'],
                        ['qrcode_size', 'number', '是', '二维码尺寸（像素），默认200x200']
                    ]
                }
            ]
        }
    ]
  },

  'user-miniapp/agent-miniapp-poster.html': {
    title: '分享海报',
    subtitle: '代理端小程序',
    sections: [
        {
            title: '功能描述',
            content: `<p><strong>核心功能：</strong>代理推广海报生成页面，支持选择不同演出海报模板，预览并保存或分享。</p>
                <p><strong>页面模块：</strong></p>
                <ul>
                    <li><strong>海报预览</strong>：大尺寸预览区域（高度560px），含封面图+演出信息+代理信息+二维码</li>
                    <li><strong>海报选择</strong>：底部3个缩略图模板（天涯海角/椰风海韵/南海奇缘）</li>
                    <li><strong>操作按钮</strong>：保存海报 / 分享好友</li>
                </ul>`
        },
        {
            title: '交互说明',
            content: `<p><strong>切换海报模板</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击底部缩略图</li>
                    <li><strong>成功：</strong>预览区切换为选中模板样式，选中项高亮边框</li>
                </ul>
                <p><strong>保存海报</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击"保存海报"按钮</li>
                    <li><strong>成功：</strong>海报保存到手机相册，显示"保存成功"</li>
                </ul>
                <p><strong>分享好友</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击"分享好友"按钮</li>
                    <li><strong>成功：</strong>调起微信分享面板</li>
                </ul>`
        },
        {
            title: '核心字段',
            noTableWrap: true,
            tables: [
                {
                    title: '海报字段',
                    headers: ['字段名', '类型', '必填', '说明'],
                    rows: [
                        ['poster_id', 'number', '是', '海报唯一标识'],
                        ['show_id', 'number', '是', '关联演出ID'],
                        ['show_name', 'string', '是', '演出名称'],
                        ['show_time', 'string', '是', '演出时间'],
                        ['show_venue', 'string', '否', '演出场馆'],
                        ['cover_image', 'string', '是', '海报封面图URL'],
                        ['agent_name', 'string', '是', '代理名称'],
                        ['agent_no', 'string', '是', '代理编号'],
                        ['mini_qrcode', 'string', '是', '代理专属分销二维码URL'],
                        ['poster_url', 'string', '是', '生成的海报图片URL']
                    ]
                }
            ]
        }
    ]
  },

  'user-miniapp/agent-miniapp-commission.html': {
    title: '佣金明细',
    subtitle: '代理端小程序',
    sections: [
        {
            title: '功能描述',
            content: `<p><strong>核心功能：</strong>代理佣金收入明细页面，支持时间筛选，展示佣金汇总和详细的佣金记录列表。</p>
                <p><strong>页面模块：</strong></p>
                <ul>
                    <li><strong>筛选栏</strong>：顶部时间筛选（今日/本周/本月/自定义）</li>
                    <li><strong>佣金汇总</strong>：本月佣金/已结算/待结算三项数据</li>
                    <li><strong>明细列表</strong>：8条佣金记录（演出/状态/购买人/金额/比例/时间）</li>
                </ul>`
        },
        {
            title: '交互说明',
            content: `<p><strong>时间筛选</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击今日/本周/本月/自定义Tab</li>
                    <li><strong>成功：</strong>佣金汇总和明细列表按所选时间刷新</li>
                    <li><strong>自定义：</strong>点击"自定义"弹出日期范围选择器</li>
                </ul>
                <p><strong>查看明细</strong></p>
                <ul>
                    <li><strong>触发：</strong>点击佣金明细记录</li>
                    <li><strong>成功：</strong>展开显示该笔佣金的详细信息</li>
                </ul>`
        },
        {
            title: '核心字段',
            noTableWrap: true,
            tables: [
                {
                    title: '佣金汇总字段',
                    headers: ['字段名', '类型', '必填', '说明'],
                    rows: [
                        ['time_range', 'enum', '是', '时间维度：今日/本周/本月/自定义'],
                        ['month_commission', 'number', '是', '本月佣金（元）'],
                        ['settled_commission', 'number', '是', '已结算佣金（元）'],
                        ['pending_commission', 'number', '是', '待结算佣金（元）']
                    ]
                },
                {
                    title: '佣金流水字段',
                    headers: ['字段名', '类型', '必填', '说明'],
                    rows: [
                        ['record_id', 'number', '是', '佣金流水唯一标识'],
                        ['show_name', 'string', '是', '关联演出名称'],
                        ['status', 'enum', '是', '状态：已结算/待结算'],
                        ['buyer_name', 'string', '是', '购买人'],
                        ['order_amount', 'number', '是', '订单金额'],
                        ['commission_rate', 'number', '是', '佣金比例（百分比）'],
                        ['commission_amount', 'number', '是', '佣金金额'],
                        ['create_time', 'string', '是', '交易时间']
                    ]
                }
            ]
        }
    ]
  },

  // ============================================================
  // 管理员小程序 (Admin Mini App)
  // ============================================================

  'admin-miniapp/login.html': {
    title: '管理员登录',
    subtitle: '管理员小程序',
    sections: [
      {
        title: '功能描述',
        content: `<p><strong>核心功能：</strong>管理员端小程序的登录入口页面，仅支持账号密码登录，需输入图形验证码。页面采用深色渐变背景（与用户端风格统一但使用金色主题色），品牌Logo居中展示（PC端同款logo.png），带"管理员端"标识徽章。</p>
<p><strong>业务说明：</strong></p>
<ul>
  <li><strong>前置条件：</strong>管理员已开通系统账号（由PC管理后台创建）</li>
  <li><strong>功能实现逻辑：</strong>
    <ul>
      <li>品牌展示：页面中央展示品牌Logo（浮动动画）和品牌名称"海南演艺"，下方显示金色"管理员端"徽章</li>
      <li>登录表单：毛玻璃效果卡片，包含账号输入框（fa-user图标）、密码输入框（fa-lock图标+密码可见切换）、验证码输入框+Canvas图形验证码</li>
      <li>图形验证码：Canvas绘制4位字母数字（排除易混淆字符0/O/I/1），深色背景+金色文字+随机旋转角度+干扰线和噪点，点击验证码图片可刷新</li>
      <li>密码可见切换：点击眼睛图标切换密码明文/密文显示</li>
      <li>登录验证：校验账号非空、密码非空、验证码匹配（不区分大小写），验证码错误时显示红色错误提示并自动刷新验证码</li>
      <li>登录加载：验证通过后显示全屏加载遮罩（毛玻璃背景+金色旋转动画），1.5秒后跳转</li>
      <li>登录跳转：优先跳转 sessionStorage.adminLoginRedirect 目标页面，无则默认跳转管理员首页（admin-home-verify.html）</li>
      <li>页面特效：背景粒子漂浮、光球漂移、Logo浮动、卡片微光扫过、入场分层动画</li>
    </ul>
  </li>
  <li><strong>数据约束：</strong>账号为PC管理后台创建的管理员账号；密码长度不少于6位；验证码4位字母数字</li>
  <li><strong>安全策略：</strong>验证码错误后自动刷新；不支持微信登录；不支持手机号登录；连续错误5次建议锁定账号（演示环境未实现）</li>
  <li><strong>能力边界：</strong>仅支持账号密码登录；不支持忘记密码找回（需联系PC管理后台重置）；不支持注册（账号由后台创建）</li>
</ul>`
      },
      {
        title: '交互说明',
        content: `<p><strong>输入账号</strong></p>
<ul>
  <li><strong>触发：</strong>点击账号输入框</li>
  <li><strong>执行中：</strong>输入框获得焦点，边框变为金色半透明</li>
  <li><strong>成功：</strong>输入管理员账号</li>
</ul>
<p><strong>输入密码</strong></p>
<ul>
  <li><strong>触发：</strong>点击密码输入框</li>
  <li><strong>执行中：</strong>输入框获得焦点，右侧显示/隐藏密码图标</li>
  <li><strong>密码切换：</strong>点击眼睛图标切换密文/明文显示，图标在 fa-eye 和 fa-eye-slash 之间切换</li>
</ul>
<p><strong>图形验证码</strong></p>
<ul>
  <li><strong>生成：</strong>页面加载时自动生成4位验证码（Canvas绘制），包含干扰线和噪点</li>
  <li><strong>刷新：</strong>点击验证码图片区域重新生成，输入框自动清空</li>
  <li><strong>校验：</strong>不区分大小写，错误时显示红色提示"验证码错误"并自动刷新</li>
</ul>
<p><strong>点击登录</strong></p>
<ul>
  <li><strong>触发：</strong>点击"登录"按钮（金色渐变）或按 Enter 键</li>
  <li><strong>执行中：</strong>依次校验账号→密码→验证码非空→验证码匹配→显示加载遮罩→模拟登录（1.5秒）</li>
  <li><strong>成功：</strong>跳转管理员首页或 redirect 目标页面</li>
  <li><strong>失败：</strong>验证码错误时显示错误提示+刷新验证码，不触发登录</li>
</ul>`
      },
      {
        title: '核心字段',
        noTableWrap: true,
        tables: [
          {
            title: '登录字段',
                            headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                    ['username', 'string', '是', '管理员账号'],
                    ['password', 'string', '是', '密码（最少6位）'],
                    ['captcha', 'string', '是', '图形验证码（4位，不区分大小写）']
                ]
          }
        ]
      }
    ]
  },

  'admin-miniapp/admin-home-verify.html': {
    title: '管理员首页 & 验票',
    subtitle: '管理员小程序',
    sections: [
        {
            title: '功能说明',
            content: `<p><strong>核心功能：</strong>管理员小程序主页面，采用混合主题设计（首页浅色+扫码深色），包含首页数据概览和扫码验票两大核心功能，通过底部Tab切换。</p>`
        },
        {
            title: '核心字段',
            tables: [
                {
                    title: '管理员信息字段',
                    headers: ['字段名', '中文名', '类型', '必填', '说明'],
                    rows: [
                        ['admin_id', 'number', '是', '管理员唯一标识'],
                        ['name', 'string', '是', '管理员姓名'],
                        ['avatar', 'string', '否', '管理员头像URL'],
                        ['role', 'string', '是', '管理员角色/职位'],
                        ['theater_name', 'string', '是', '所属场馆名称']
                    ]
                },
                {
                    title: '场次字段',
                    headers: ['字段名', '中文名', '类型', '必填', '说明'],
                    rows: [
                        ['session_id', 'number', '是', '场次唯一标识'],
                        ['show_name', 'string', '是', '演出名称'],
                        ['session_time', 'string', '是', '场次时间'],
                        ['theater_name', 'string', '是', '场馆名称'],
                        ['hall_name', 'string', '否', '厅/场名称'],
                        ['status', 'enum', '是', '场次状态：待开场/进行中/已结束']
                    ]
                },
                {
                    title: '验票字段',
                    headers: ['字段名', '中文名', '类型', '必填', '说明'],
                    rows: [
                        ['ticket_id', 'number', '是', '门票唯一标识'],
                        ['ticket_no', 'string', '是', '票号'],
                        ['verify_status', 'enum', '是', '验票结果：验票成功/验票失败'],
                        ['fail_reason', 'string', '否', '失败原因（如票已核销/无效票）'],
                        ['show_name', 'string', '是', '关联演出名称'],
                        ['session_time', 'string', '是', '场次时间'],
                        ['seat_info', 'string', '是', '座位信息'],
                        ['verify_time', 'string', '是', '核验时间'],
                        ['operator_id', 'number', '是', '核验操作员ID'],
                        ['today_verified_count', 'number', '是', '今日已扫码数量']
                    ]
                }
            ]
        },
        {
            title: '首页 - 管理员信息头部',
            content: `页面顶部深色渐变区域，展示当前登录管理员的基本信息`
        },
        {
            title: '首页 - 数据卡片',
            content: `三张核心数据统计卡片： - <b>门票销售</b>：1,286张 - <b>已核销</b>：892张 - <b>待核销</b>：394张`
        },
        {
            title: '首页 - 今日场次',
            content: `展示今日3个待开场/进行中的演出场次信息，包含场次名称、时间、场馆等`
        },
        {
            title: '首页 - 快捷操作',
            content: `三个快捷操作入口： - <b>扫码验票</b> - 跳转至扫码验票页面 - <b>销售数据</b> - 查看销售统计数据 - <b>场次管理</b> - 管理演出场次`
        },
        {
            title: '底部Tab导航',
            content: `底部固定Tab栏，两个Tab： - <b>首页</b> - 数据概览与快捷操作 - <b>验票</b> - 扫码验票功能`
        },
        {
            title: '扫码验票页 - 扫描区域',
            content: `深色主题扫码页面，包含： - <b>扫描框</b>：260x260像素的扫码取景框 - <b>扫描动画线</b>：上下往复移动的扫描线动画 - <b>闪光灯</b> - 开启/关闭手电筒辅助扫码 - <b>手动输入</b> - 手动输入票号进行核验 - <b>扫描统计</b> - 显示今日已扫码数量`
        },
        {
            title: '验票结果弹窗',
            content: `扫码完成后弹出结果弹窗： - <b>验票成功弹窗</b> - 绿色主题，显示票务信息和核销成功状态 - <b>验票失败弹窗</b> - 红色主题，显示失败原因（如票已核销/无效票等）`
        },
        {
            title: '手动输入弹窗',
            content: `点击"手动输入"按钮弹出输入弹窗： - <b>票号输入框</b> - 输入门票编号 - <b>确认查询</b> - 提交查询并显示核验结果`
        },
    ]
  },

  // ============================================================
  // PC管理后台 (PC Admin)
  // ============================================================

  'pc-admin/login.html': {
    title: '登录页 v1',
    subtitle: 'PC管理后台',
    sections: [
        {
            title: '功能说明',
            content: `<p><strong>核心功能：</strong>PC管理后台管理员登录入口，为运营管理人员提供安全的身份认证服务。支持账号密码登录方式，登录成功后进入数据看板首页。背景有轻动效（粒子浮动、光晕呼吸、网格流动）提升视觉体验。</p>`
        },
        {
            title: '核心字段',
            tables: [
                {
                    title: '登录表单字段',
                    headers: ['字段名', '中文名', '类型', '必填', '说明'],
                    rows: [
                        ['username', 'string', '是', '管理员登录账号，4-20字符，支持字母/数字/下划线'],
                        ['password', 'string', '是', '登录密码，6-20字符，前端加密传输'],
                        ['captcha_code', 'string', '是', '图形验证码，4位字母数字，不区分大小写，点击刷新'],
                        ['remember_me', 'boolean', '否', '记住登录状态，勾选后凭证有效期7天，否则24小时'],
                        ['login_status', 'enum', '是', '登录结果状态：success/账号不存在/密码错误/验证码错误/账号被禁用/登录频繁']
                    ]
                }
            ]
        },
        {
            title: '登录表单字段',
            content: `<b>账号输入框</b><br>功能说明：管理员登录账号<br>校验规则：必填，长度4-20字符，支持字母/数字/下划线<br>数据来源：系统中已注册的管理员账号<br><br><b>密码输入框</b><br>功能说明：账号对应的登录密码<br>校验规则：必填，长度6-20字符<br>安全机制：前端加密后传输，后端二次加密存储<br><br><b>图形验证码</b><br>功能说明：防止暴力破解的安全验证<br>业务逻辑：Canvas绘制4位随机字母数字验证码，带干扰线和噪点；点击验证码图片可刷新；不区分大小写<br><br><b>记住我</b><br>功能说明：保持登录状态选项<br>业务逻辑：勾选后登录凭证有效期延长至7天，未勾选为24小时<br>存储方式：本地存储记住登录偏好，Cookie存储登录凭证<br><br><b>忘记密码</b><br>功能说明：密码找回入口<br>业务流程：点击跳转密码找回页面，通过绑定的手机号验证身份后重置密码`
        },
        {
            title: '登录流程',
            content: `1. 前端校验：校验账号密码格式是否符合规则<br>2. 验证码校验：校验图形验证码是否正确（不区分大小写）<br>3. 身份认证：提交账号密码至服务端进行身份验证<br>4. 凭证生成：验证通过后生成登录凭证<br>5. 登录成功：存储登录凭证，跳转至数据看板首页<br>6. 登录失败：显示具体错误提示（账号不存在/密码错误/验证码错误/账号被禁用）`
        },
        {
            title: '状态定义',
            content: `<b>账号状态</b><br>- 正常：账号可正常登录使用<br>- 禁用：账号已被禁用，禁止登录<br><br><b>登录失败原因</b><br>- 账号不存在：系统中未找到该账号<br>- 密码错误：输入密码与账号不匹配<br>- 验证码错误：图形验证码输入不正确<br>- 账号被禁用：该账号已被管理员禁用<br>- 登录频繁：短时间内登录次数过多，触发安全限制`
        },
    ]
  },

  'pc-admin/login-v2.html': {
    title: '登录页 v2',
    subtitle: 'PC管理后台',
    sections: [
        {
            title: '功能说明',
            content: `<p><strong>核心功能：</strong>PC管理后台管理员登录入口（升级版），提供多种登录方式，提升登录体验和安全性。支持账号密码登录和手机验证码登录两种方式，满足不同场景需求。</p>`
        },
        {
            title: '核心字段',
            tables: [
                {
                    title: '账号登录字段',
                    headers: ['字段名', '中文名', '类型', '必填', '说明'],
                    rows: [
                        ['username', 'string', '是', '管理员登录账号，4-20字符'],
                        ['password', 'string', '是', '登录密码，6-20字符，前端加密传输'],
                        ['captcha_code', 'string', '是', '图形验证码，不区分大小写'],
                        ['captcha_token', 'string', '是', '验证码token，用于服务端校验']
                    ]
                },
                {
                    title: '手机登录字段',
                    headers: ['字段名', '中文名', '类型', '必填', '说明'],
                    rows: [
                        ['phone', 'string', '是', '管理员绑定手机号，11位手机号格式'],
                        ['sms_code', 'string', '是', '短信验证码，6位数字，有效期5分钟'],
                        ['sms_token', 'string', '是', '短信发送token，用于防刷校验']
                    ]
                }
            ]
        },
        {
            title: 'Tab功能说明',
            content: `<b>Tab 1：账号登录</b><br>功能说明：使用管理员账号和密码进行身份认证登录<br>适用场景：日常登录使用<br><br><b>Tab 2：手机登录</b><br>功能说明：使用绑定手机号和短信验证码登录<br>适用场景：忘记密码时的快捷登录方式<br><br>Tab切换交互：点击Tab切换登录方式，当前选中Tab高亮显示`
        },
        {
            title: '账号登录表单字段',
            content: `<b>账号输入框</b><br>功能说明：管理员登录账号<br>校验规则：必填，长度4-20字符<br><br><b>密码输入框</b><br>功能说明：账号对应的登录密码<br>校验规则：必填，长度6-20字符<br>安全机制：前端加密后传输，保障密码安全<br><br><b>图形验证码</b><br>功能说明：人机验证，防止暴力破解<br>校验规则：必填，不区分大小写<br>刷新机制：点击验证码图片可刷新获取新的验证码`
        },
        {
            title: '手机登录表单字段',
            content: `<b>手机号输入框</b><br>功能说明：管理员绑定的手机号<br>校验规则：必填，11位手机号格式<br>数据来源：系统中已绑定的管理员手机号<br><br><b>短信验证码输入框</b><br>功能说明：手机收到的短信验证码<br>校验规则：必填，6位数字<br>有效期：5分钟<br><br><b>获取验证码按钮</b><br>功能说明：发送短信验证码到绑定手机号<br>限制规则：同一手机号60秒内只能发送一次，防止短信轰炸`
        },
        {
            title: '登录流程',
            content: `1. 前端校验：校验表单字段格式是否符合规则<br>2. 身份认证：根据登录方式提交对应凭证至服务端验证<br>3. 凭证生成：验证通过后生成登录凭证<br>4. 登录成功：存储登录凭证，返回管理员信息，跳转至数据看板<br>5. 登录失败：返回具体错误信息提示用户<br><br>两种登录方式统一处理，系统自动识别登录类型进行相应验证`
        },
        {
            title: '状态定义',
            content: `<b>账号状态</b><br>- 正常：账号可正常登录使用<br>- 禁用：账号已被禁用，禁止登录<br><br><b>验证码状态</b><br>- 有效：验证码在有效期内，可正常使用<br>- 过期：验证码超过有效期，需重新获取<br><br><b>登录限制</b><br>- 同一手机号60秒内只能获取一次验证码<br>- 同一IP每小时获取验证码次数有限制，防止恶意刷取`
        },
    ]
  },

  'pc-admin/dashboard.html': {
    title: '数据看板',
    subtitle: '全渠道票务运营数据概览',
    sections: [
      {
        title: '数据看板',
        sections: [
          {
            title: '功能描述',
            content: `<p><strong>核心功能：</strong>展示全渠道票务运营的核心数据指标和分析图表。顶部提供时间范围筛选（今日/近7天/近30天/自定义日期范围）和剧院筛选，下方依次展示6个核心KPI统计卡片、营收分析（含4个二级Tab：营收趋势/票房分析/充值分析/钱包概况）、渠道分布与会员等级分布、剧院票房对比与热门演出排行、各剧院经营概览表格。所有数据实时汇总，支持按时间范围和剧院维度筛选。</p>
            <p><strong>业务说明：</strong></p>
            <ul>
              <li><strong>前置条件：</strong>操作人需具有"数据看板"查看权限；系统需已产生订单数据</li>
              <li><strong>功能实现逻辑：</strong>
                <ul>
                  <li>时间筛选：支持快捷选择（今日/近7天/近30天）和自定义日期范围；自定义弹窗内提供8种快捷选择（今日/昨日/近7天/近30天/本月/上月/本季度/本年），点击后自动填充开始/结束日期</li>
                  <li>KPI统计卡片（6张）：总收入（统计时间范围内所有已支付订单实付金额之和，含票房+商城+充值）、票房收入（统计时间范围内所有票务已支付订单实付金额之和）、商城收入（统计时间范围内所有商城已支付订单实付金额之和）、充值金额（统计时间范围内所有充值订单实付金额之和）、新增会员（统计时间范围内新注册会员数）、会员消费占比（会员消费金额 ÷ 总收入 × 100%），每项带环比趋势（较上周/较上月，计算公式：（本期值-上期值）÷ 上期值 × 100%）</li>
                  <li>营收趋势：SVG折线图展示4条曲线（综合营收=总收入按日汇总、票房收入=票房按日汇总、充值收入=充值按日汇总、商城收入=商城按日汇总），X轴为日期，Y轴为金额</li>
                  <li>票房分析：百分比堆积柱状图展示线上自助/线下窗口/第三方渠道占比（占比 = 该渠道票房 ÷ 总票房 × 100%），顶部4张汇总卡片分别为：票房总额（统计时间范围内所有票务已支付订单实付金额之和）、线上自助占比（线上自助票房 ÷ 总票房 × 100%）、线下窗口占比（线下窗口票房 ÷ 总票房 × 100%）、第三方渠道占比（第三方渠道票房 ÷ 总票房 × 100%），总额标题根据时间范围动态显示（本周票房总额/本月票房总额/本季度票房总额/本年票房总额）</li>
                  <li>充值分析：百分比堆积柱状图展示在线充值/充值卡充值占比（占比 = 该方式充值金额 ÷ 总充值金额 × 100%），顶部3张汇总卡片分别为：充值总额（统计时间范围内所有充值订单实付金额之和）、在线充值占比（在线充值金额 ÷ 总充值金额 × 100%）、充值卡充值占比（充值卡充值金额 ÷ 总充值金额 × 100%），总额标题固定显示为充值总额</li>
                  <li>钱包概况：双饼图——钱包余额构成（存量余额 = 当前钱包可用余额总和、消费余额 = 已消费的充值金额总和）；充值卡状态（已充值 = 已充值到账的充值卡金额总和、绑定账户 = 已绑定到用户账户但未消费的充值卡金额、未使用 = 未绑定到账户的充值卡金额）</li>
                  <li>渠道分布：环形图展示微信小程序/大麦网/猫眼/美团/线下窗口5个渠道的销售占比（占比 = 该渠道销售额 ÷ 总销售额 × 100%）和金额（该渠道已支付订单实付金额之和）</li>
                  <li>会员等级分布：展示普通/银卡/金卡/钻石4个等级的会员人数（各等级当前有效会员数）和占比（占比 = 该等级会员数 ÷ 总会员数 × 100%）</li>
                  <li>剧院票房对比：水平条形图对比5个剧院的票房金额（各剧院已支付票务订单实付金额之和）和占比（占比 = 该剧院票房 ÷ 总票房 × 100%）</li>
                  <li>热门演出排行：Top5演出按售票数（该演出已支付订单购票数量之和）和销售额（该演出已支付订单实付金额之和）排名，带金银铜奖牌标识</li>
                  <li>剧院经营概览：表格展示各剧院的座位数（该剧院座位总数）、场次（该剧院已结束场次数）、售票数（该剧院已支付订单购票数量之和）、销售额（该剧院已支付订单实付金额之和）、上座率（售票数 ÷ (座位数 × 场次) × 100%）、场均票房（销售额 ÷ 场次）、票房占比（该剧院销售额 ÷ 总票房 × 100%）、状态（营业中/已关闭）</li>
                </ul>
              </li>
              <li><strong>权限控制：</strong>需"数据看板"查看权限；部分敏感数据（如充值金额）需"财务"权限</li>
              <li><strong>数据约束：</strong>时间范围最大支持365天（一年）；剧院筛选"全部剧院"时展示汇总数据</li>
              <li><strong>能力边界：</strong>不支持数据导出；不支持自定义图表；不支持实时刷新（需手动切换筛选条件触发更新）</li>
            </ul>`
          },
          {
            title: '交互说明',
            content: `<p><strong>切换时间范围</strong></p>
            <ul>
              <li><strong>触发：</strong>点击顶部"今日"/"近7天"/"近30天"按钮，或点击自定义日期范围选择器</li>
              <li><strong>执行中：</strong>按钮激活（橙色背景），日期选择器自动填充对应范围，所有图表和卡片数据刷新</li>
              <li><strong>成功：</strong>页面所有数据更新为对应时间范围</li>
              <li><strong>失败：</strong>Toast提示"数据加载失败"</li>
              <li><strong>边界条件：</strong>自定义日期范围时，开始日期不可晚于结束日期；最大跨度365天（一年）</li>
            </ul>
            <p><strong>切换剧院筛选</strong></p>
            <ul>
              <li><strong>触发：</strong>在顶部剧院下拉框中选择具体剧院</li>
              <li><strong>执行中：</strong>下拉框选中，页面数据刷新为该剧院的数据</li>
              <li><strong>成功：</strong>KPI卡片、图表、表格数据更新；经营概览表格中选中剧院行高亮，其他行置灰</li>
              <li><strong>失败：</strong>Toast提示"数据加载失败"</li>
              <li><strong>边界条件：</strong>选择"全部剧院"时展示汇总数据，表格所有行恢复正常显示</li>
            </ul>
            <p><strong>切换营收分析Tab</strong></p>
            <ul>
              <li><strong>触发：</strong>点击营收分析卡片内的"营收趋势"/"票房分析"/"充值分析"/"钱包概况"Tab</li>
              <li><strong>执行中：</strong>Tab激活（橙色背景白色文字），对应图表区域切换显示并播放入场动画</li>
              <li><strong>成功：</strong>对应图表正常渲染，折线图/柱状图/饼图按动画序列依次呈现</li>
              <li><strong>失败：</strong>无</li>
              <li><strong>边界条件：</strong>无数据时显示空状态占位图</li>
            </ul>
            <p><strong>查看帮助提示</strong></p>
            <ul>
              <li><strong>触发：</strong>鼠标悬停在经营概览表格表头的帮助图标（fa-question-circle）上</li>
              <li><strong>执行中：</strong>弹出Tooltip，深色背景，显示指标计算公式</li>
              <li><strong>成功：</strong>Tooltip正常显示公式说明，智能判断上下边界避免溢出视口</li>
              <li><strong>失败：</strong>无</li>
              <li><strong>边界条件：</strong>无</li>
            </ul>`
          },
          {
            title: '核心字段',
            noTableWrap: true,
            tables: [
              {
                title: '筛选条件字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['time_range', 'enum', '是', '时间范围：today(今日)/week(近7天)/month(近30天)/custom(自定义)'],
                  ['start_date', 'date', '条件', '自定义开始日期，time_range=custom时必填'],
                  ['end_date', 'date', '条件', '自定义结束日期，time_range=custom时必填'],
                  ['theater_id', 'string', '否', '剧院ID，all表示全部剧院']
                ]
              },
              {
                title: 'KPI统计卡片字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['total_revenue', 'number', '是', '总收入（元）'],
                  ['box_revenue', 'number', '是', '票房收入（元）'],
                  ['mall_revenue', 'number', '是', '总商城收入（元）'],
                  ['recharge_amount', 'number', '是', '充值金额（元）'],
                  ['new_members', 'number', '是', '新增会员数（人）'],
                  ['member_consumption_rate', 'number', '是', '会员消费占比（%）'],
                  ['trend_direction', 'enum', '是', '环比趋势方向：up(上升)/down(下降)'],
                  ['trend_percent', 'number', '是', '环比变化百分比（%）'],
                  ['trend_text', 'string', '是', '环比对比文本：较上周/较上月']
                ]
              },
              {
                title: '营收趋势字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['date', 'date', '是', '日期'],
                  ['total_revenue', 'number', '是', '综合营收（万元）'],
                  ['box_revenue', 'number', '是', '票房收入（万元）'],
                  ['recharge_revenue', 'number', '是', '充值收入（万元）'],
                  ['mall_revenue', 'number', '是', '商城收入（万元）']
                ]
              },
              {
                title: '票房分析字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['date', 'date', '是', '日期'],
                  ['daily_total', 'number', '是', '当日票房总额（万元）'],
                  ['online_self_percent', 'number', '是', '线上自助占比（%）'],
                  ['offline_window_percent', 'number', '是', '线下窗口占比（%）'],
                  ['third_party_percent', 'number', '是', '第三方渠道占比（%）'],
                  ['total_box_amount', 'number', '是', '票房总额（万元）'],
                  ['online_self_amount', 'number', '是', '线上自助票房金额（万元）'],
                  ['offline_window_amount', 'number', '是', '线下窗口票房金额（万元）'],
                  ['third_party_amount', 'number', '是', '第三方渠道票房金额（万元）']
                ]
              },
              {
                title: '充值分析字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['date', 'date', '是', '日期'],
                  ['daily_recharge_total', 'number', '是', '当日充值总额（万元）'],
                  ['online_recharge_percent', 'number', '是', '在线充值占比（%）'],
                  ['card_recharge_percent', 'number', '是', '充值卡充值占比（%）'],
                  ['total_recharge_amount', 'number', '是', '充值总额（万元）'],
                  ['online_recharge_amount', 'number', '是', '在线充值金额（万元）'],
                  ['card_recharge_amount', 'number', '是', '充值卡充值金额（万元）']
                ]
              },
              {
                title: '钱包概况字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['wallet_total_balance', 'number', '是', '钱包总余额（元）'],
                  ['stock_balance', 'number', '是', '存量余额（元）'],
                  ['stock_balance_percent', 'number', '是', '存量余额占比（%）'],
                  ['consumption_balance', 'number', '是', '消费余额（元）'],
                  ['consumption_balance_percent', 'number', '是', '消费余额占比（%）'],
                  ['recharge_card_total', 'number', '是', '充值卡总额（元）'],
                  ['recharged_amount', 'number', '是', '已充值金额（元）'],
                  ['recharged_percent', 'number', '是', '已充值占比（%）'],
                  ['bound_amount', 'number', '是', '绑定账户金额（元）'],
                  ['bound_percent', 'number', '是', '绑定账户占比（%）'],
                  ['unused_amount', 'number', '是', '未使用金额（元）'],
                  ['unused_percent', 'number', '是', '未使用占比（%）']
                ]
              },
              {
                title: '渠道分布字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['channel_name', 'string', '是', '渠道名称：微信小程序/大麦网/猫眼/美团/线下窗口'],
                  ['channel_color', 'string', '是', '渠道颜色标识'],
                  ['sales_amount', 'number', '是', '销售金额（元）'],
                  ['sales_percent', 'number', '是', '销售占比（%）']
                ]
              },
              {
                title: '会员等级分布字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['level_name', 'string', '是', '等级名称：普通会员/银卡会员/金卡会员/钻石会员'],
                  ['level_icon', 'string', '是', '等级图标标识'],
                  ['member_count', 'number', '是', '会员人数'],
                  ['member_percent', 'number', '是', '占比（%）'],
                  ['total_members', 'number', '是', '会员总数']
                ]
              },
              {
                title: '剧院票房对比字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['theater_name', 'string', '是', '剧院名称'],
                  ['theater_color', 'string', '是', '剧院颜色标识'],
                  ['box_amount', 'number', '是', '票房金额（万元）'],
                  ['box_percent', 'number', '是', '票房占比（%）']
                ]
              },
              {
                title: '热门演出排行字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['rank', 'number', '是', '排名（1-5）'],
                  ['rank_badge_type', 'enum', '是', '奖牌类型：gold(金)/silver(银)/bronze(铜)/normal(普通)'],
                  ['show_name', 'string', '是', '演出名称'],
                  ['ticket_count', 'number', '是', '售票数（张）'],
                  ['sales_amount', 'number', '是', '销售额（元）']
                ]
              },
              {
                title: '剧院经营概览字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['theater_name', 'string', '是', '剧院名称'],
                  ['theater_color', 'string', '是', '剧院颜色标识'],
                  ['total_seats', 'number', '是', '座位数'],
                  ['session_count', 'number', '是', '场次'],
                  ['ticket_count', 'number', '是', '售票数'],
                  ['sales_amount', 'number', '是', '销售额（元）'],
                  ['occupancy_rate', 'number', '是', '上座率（%），计算公式：售票数/(座位数*场次)*100%'],
                  ['avg_box_per_session', 'number', '是', '场均票房（元），计算公式：销售额/场次'],
                  ['box_percent', 'number', '是', '票房占比（%），计算公式：该剧院销售额/总销售额*100%'],
                  ['status', 'enum', '是', '状态：active(运营中)/inactive(停业中)']
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  'pc-admin/order-management.html': {
    title: '订单管理',
    subtitle: '全渠道订单查询、处理与售后管理',
    sections: [
      {
        title: '票务订单',
        sections: [
          {
            title: '功能描述',
            content: `<p><strong>核心功能：</strong>管理全渠道票务订单的查询、查看详情、收款、出票、核销与退款处理。顶部提供5张统计卡片（年营业额/年订单数/预约/待核销/退款中），支持多维度筛选（订单状态/关键词/渠道订单号/下单日期/支付方式/销售渠道/出票状态/销售员），订单列表展示完整票务信息，支持查看订单详情弹窗、订单收款弹窗（3步流程：收款→出票→完成）、打印出票弹窗、退票申请弹窗，以及批量导入渠道订单功能。</p>
            <p><strong>业务说明：</strong></p>
            <ul>
              <li><strong>前置条件：</strong>操作人需具有"订单管理"权限；收款操作需"收银"权限；出票操作需"出票"权限；退款审核需"退款审核"权限</li>
              <li><strong>功能实现逻辑：</strong>
                <ul>
                  <li>统计卡片：年营业额（带同比趋势）、年订单数（带同比趋势）、预约订单数、待核销订单数、退款中订单数，均带环比趋势指示</li>
                  <li>筛选查询：支持订单状态（全部/预约/已支付/待核销/已核销/退款中/已取消）、关键词模糊搜索（订单号/演出名称/手机号）、渠道订单号精确查询、下单日期范围、支付方式（微信支付/支付宝/钱包支付/现金）、销售渠道（小程序/大麦/猫眼/美团/线下窗口）、出票状态（已出票/待出票/未出票）、销售员筛选</li>
                  <li>订单列表：展示订单号、渠道订单号、演出信息（名称+场次+票档）、数量、应收/实收金额、支付方式（带图标）、订单状态（彩色标签）、出票状态（圆点标签）、销售渠道（带图标标签）、销售员、下单时间、操作按钮</li>
                  <li>订单详情弹窗：分Tab展示订单信息（订单号/状态/时间/渠道/销售员/备注）、演出座位（演出名称/场馆/演出厅/场次/数量及座位明细表格）、支付减免（支付信息含商品总价/优惠减免/实付金额/支付时间/交易单号/组合支付明细；减免明细表格始终显示5种减免类型行：票品折扣/优惠券/券包/会员折扣/积分抵扣，有数据显示具体名称和金额，无数据显示0）、出票日志（出票状态/渠道/取票码/出票明细折叠面板含取票码、操作日志时间轴）。底部操作按钮：已支付状态显示"确认核销"和"申请退款"</li>
                  <li>订单收款（3步流程）：Step1选择支付方式（微信支付/支付宝/现金/充值卡/钱包支付）→ 打开对应二级弹窗完成收款 → Step2选择出票方式（纸质票/电子票/暂不出票）及打印模板，电子票需填写接收手机号 → Step3完成，订单状态更新为"已支付"，出票状态更新为"待出票"</li>
                  <li>出票：选择出票方式（纸质票/电子票），确认后更新出票状态为"已出票"，记录出票明细（含取票码）</li>
                  <li>退票申请：选择退款手续费比例（0%/5%/10%），选择退票原因（观众原因/演出取消/演出延期/场次合并/其他，可多选），填写退票说明，系统根据手续费比例计算实际退款金额。提示：退款仅返还实付金额、钱包余额、充值卡金额，不返还任何优惠券、券包或积分</li>
                  <li>批量导入：下载Excel模板 → 填写渠道订单数据 → 上传文件 → 选择导入渠道 → 开始导入，支持大麦/猫眼/美团/票大师/票务通/线下窗口/其他渠道</li>
                  <li>订单状态流转：预约 → 收款 → 已支付 → 出票 → 已出票 → 核销 → 已核销；预约超时未支付 → 已取消；已支付/已出票 → 退款中 → 已退款</li>
                </ul>
              </li>
              <li><strong>权限控制：</strong>查看需"订单查看"权限；收款需"收银"权限；出票需"出票"权限；退款审核需"退款审核"权限；批量导入需"渠道订单导入"权限</li>
              <li><strong>数据约束：</strong>订单编号唯一；已退款订单不可再次退款；已取消订单不可收款；组合支付需记录各支付方式明细</li>
              <li><strong>能力边界：</strong>不支持修改订单信息；不支持手动创建订单；不支持部分退款（整单退）</li>
            </ul>`
          },
          {
            title: '交互说明',
            content: `<p><strong>筛选查询订单</strong></p>
            <ul>
              <li><strong>触发：</strong>在筛选栏输入条件后点击"查询"按钮（btn-primary）</li>
              <li><strong>执行中：</strong>按钮loading，表格数据刷新</li>
              <li><strong>成功：</strong>表格显示符合条件的订单列表，Toast提示筛选结果数量</li>
              <li><strong>失败：</strong>Toast提示"查询失败"</li>
              <li><strong>边界条件：</strong>无筛选条件时显示全部订单；点击"重置"清空所有筛选条件；点击"导出"导出当前筛选结果</li>
            </ul>
            <p><strong>查看订单详情</strong></p>
            <ul>
              <li><strong>触发：</strong>点击表格行操作列的"查看"文字按钮</li>
              <li><strong>执行中：</strong>弹出订单详情弹窗（720px），分多个区域展示完整订单数据</li>
              <li><strong>成功：</strong>弹窗正常展示完整订单数据，底部根据状态显示不同操作按钮（已支付显示"确认核销"/"申请退款"）</li>
              <li><strong>失败：</strong>Toast提示"加载失败"</li>
              <li><strong>边界条件：</strong>弹窗内信息为只读，不可编辑；出票明细可点击展开/折叠</li>
            </ul>
            <p><strong>订单收款（预约订单）</strong></p>
            <ul>
              <li><strong>触发：</strong>点击预约状态订单操作列的"收款"按钮（橙色高亮）</li>
              <li><strong>执行中：</strong>弹出订单收款弹窗（520px），显示3步流程指示器（收款→出票→完成），Step1展示5种支付方式选择</li>
              <li><strong>成功：</strong>选择支付方式后打开二级弹窗完成收款，返回后进入Step2出票，选择出票方式后点击"完成出票"进入Step3成功状态</li>
              <li><strong>失败：</strong>现金支付时实收金额不足提示"实收金额不足"；未选择支付方式点击下一步提示"请选择支付方式"</li>
              <li><strong>边界条件：</strong>预约订单显示预约到期时间提醒；收款成功后订单状态实时更新，表格自动刷新</li>
            </ul>
            <p><strong>打印出票</strong></p>
            <ul>
              <li><strong>触发：</strong>点击已支付订单操作列的"出票"按钮</li>
              <li><strong>执行中：</strong>弹出打印出票弹窗（580px），显示订单摘要、出票方式选择、是否显示票价选择、座位列表预览</li>
              <li><strong>成功：</strong>确认出票后出票状态更新为"已出票"，记录出票明细（时间/操作员/地点），Toast提示"出票成功"</li>
              <li><strong>失败：</strong>Toast提示"打印失败"</li>
              <li><strong>边界条件：</strong>已出票订单再次打印为"重印出票"；电子票无需打印直接发送短信</li>
            </ul>
            <p><strong>申请退票</strong></p>
            <ul>
              <li><strong>触发：</strong>点击已支付/已出票订单详情弹窗底部的"申请退款"按钮</li>
              <li><strong>执行中：</strong>弹出退票申请弹窗（560px），显示订单摘要、退款手续费比例选择（0%/5%/10%，选择后实时更新手续费和实际退款金额）、退票原因多选、退票说明文本框，底部提示"退款仅返还实付金额、钱包余额、充值卡金额，不返还任何优惠券、券包或积分"</li>
              <li><strong>成功：</strong>确认退票后订单状态变为"退款中"，座位状态更新为"已退票"，Toast提示"退票申请已提交"</li>
              <li><strong>失败：</strong>未选择退票原因提示"请至少选择一个退票原因"</li>
              <li><strong>边界条件：</strong>距演出不足2小时的退款申请自动拒绝；已核销订单不可退款</li>
            </ul>
            <p><strong>批量导入渠道订单</strong></p>
            <ul>
              <li><strong>触发：</strong>点击筛选栏"批量导入"按钮（btn-coral 珊瑚红色）</li>
              <li><strong>执行中：</strong>弹出导入弹窗（560px），分两步：下载模板 → 上传Excel文件 → 选择导入渠道 → 开始导入</li>
              <li><strong>成功：</strong>导入完成后Toast提示成功导入数量，列表自动刷新</li>
              <li><strong>失败：</strong>文件格式错误提示"请上传.xlsx或.xls格式文件"；未选择渠道时"开始导入"按钮禁用</li>
              <li><strong>边界条件：</strong>单次最多导入500条；支持拖拽上传</li>
            </ul>`
          },
          {
            title: '核心字段',
            noTableWrap: true,
            tables: [
              {
                title: '统计卡片字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['annual_revenue', 'number', '是', '年营业额（元），带同比趋势'],
                  ['annual_orders', 'number', '是', '年订单数，带同比趋势'],
                  ['reservation_count', 'number', '是', '预约订单数'],
                  ['pending_verify_count', 'number', '是', '待核销订单数'],
                  ['refunding_count', 'number', '是', '退款中订单数']
                ]
              },
              {
                title: '筛选条件字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['filter_status', 'enum', '否', '订单状态：全部/预约/已支付/待核销/已核销/退款中/已取消'],
                  ['filter_keyword', 'string', '否', '关键词：订单号/演出名称/手机号模糊搜索'],
                  ['filter_channel_no', 'string', '否', '渠道订单号精确查询'],
                  ['filter_date_start', 'string', '否', '下单开始日期，格式YYYY-MM-DD'],
                  ['filter_date_end', 'string', '否', '下单结束日期，格式YYYY-MM-DD'],
                  ['filter_payment', 'enum', '否', '支付方式：微信支付/支付宝/钱包支付/现金'],
                  ['filter_channel', 'enum', '否', '销售渠道：小程序/大麦/猫眼/美团/线下窗口'],
                  ['filter_ticket_status', 'enum', '否', '出票状态：已出票/待出票/未出票'],
                  ['filter_seller', 'string', '否', '销售员：线上自助/具体销售员姓名']
                ]
              },
              {
                title: '订单列表字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['order_id', 'string', '是', '订单编号，如HN202604100001'],
                  ['channel_no', 'string', '否', '渠道订单号，如DM20260410087321'],
                  ['show_name', 'string', '是', '演出名称'],
                  ['session_time', 'string', '是', '场次时间，格式MM-DD HH:mm'],
                  ['ticket_tier', 'string', '是', '票档名称，如VIP贵宾席/A区甲等'],
                  ['quantity', 'number', '是', '购票数量'],
                  ['should_pay', 'number', '是', '应收金额（元）'],
                  ['actual_pay', 'number', '是', '实收金额（元）'],
                  ['payment_method', 'enum', '是', '支付方式：微信支付/支付宝/钱包支付/现金/组合支付'],
                  ['status', 'enum', '是', '订单状态：预约/已支付/已核销/退款中/已取消'],
                  ['ticket_status', 'enum', '是', '出票状态：已出票/待出票/未出票'],
                  ['sales_channel', 'enum', '是', '销售渠道：小程序/大麦/猫眼/美团/线下窗口'],
                  ['seller', 'string', '是', '销售员：线上自助或窗口操作员姓名'],
                  ['order_time', 'string', '是', '下单时间，格式YYYY-MM-DD HH:mm']
                ]
              },
              {
                title: '订单详情弹窗字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['user_name', 'string', '是', '用户姓名'],
                  ['user_phone', 'string', '是', '用户手机号（脱敏）'],
                  ['member_level', 'enum', '否', '会员等级：普通会员/银卡会员/金卡会员/钻石会员'],
                  ['venue_name', 'string', '是', '演出场馆名称'],
                  ['hall_name', 'string', '否', '演出厅名称，如大剧场/小剧场'],
                  ['total_amount', 'number', '是', '商品总价（元）'],
                  ['discount_amount', 'number', '是', '总优惠减免金额（元）'],
                  ['service_fee', 'number', '否', '服务费（元）'],
                  ['pay_time', 'string', '否', '支付时间，格式YYYY-MM-DD HH:mm:ss'],
                  ['transaction_id', 'string', '否', '交易流水号'],
                  ['ticket_method', 'enum', '否', '出票方式：纸质票/电子票/-'],
                  ['pickup_code', 'string', '否', '取票码'],
                  ['operator', 'string', '否', '操作员'],
                  ['remark', 'string', '否', '订单备注'],
                  ['reserve_expire', 'string', '否', '预约到期时间，仅预约订单'],
                  ['ticket_detail_logs', 'array', '否', '出票明细数组，包含time/operator/location/print_times'],
                  ['payment_details', 'array', '否', '组合支付明细数组，包含method/amount/transactionId'],
                  ['discount_details', 'array', '否', '减免明细数组，包含type(减免类型：票品折扣/优惠券/券包/会员折扣/积分抵扣)/name(子类型+名称)/amount(减免金额)']
                ]
              },
              {
                title: '座位明细字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['seat_no', 'string', '是', '座位号，如A区 3排 5座'],
                  ['seat_tier', 'string', '是', '座位票档'],
                  ['seat_price', 'number', '是', '座位单价（元）'],
                  ['seat_status', 'enum', '是', '座位状态：已出票/已核销/已退票/未出票']
                ]
              },
              {
                title: '批量导入字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['import_channel', 'enum', '是', '导入渠道：大麦/猫眼/美团/票大师/票务通/线下窗口/其他'],
                  ['channel_order_no', 'string', '是', '渠道订单号（必填）'],
                  ['import_show_name', 'string', '是', '演出名称（必填）'],
                  ['import_session_time', 'string', '是', '场次时间（必填）'],
                  ['import_ticket_tier', 'string', '是', '票档（必填）'],
                  ['import_quantity', 'number', '是', '数量（必填）'],
                  ['import_amount', 'number', '是', '金额（必填）'],
                  ['import_buyer_name', 'string', '否', '购票人'],
                  ['import_buyer_phone', 'string', '否', '手机号'],
                  ['import_payment_method', 'string', '否', '支付方式'],
                  ['import_seat_info', 'string', '否', '座位信息']
                ]
              },
              {
                title: '出票日志字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['log_id', 'string', '是', '日志唯一标识'],
                  ['log_type', 'enum', '是', '日志类型：ticket_detail(出票明细) / operation_log(操作日志)'],
                  ['order_id', 'string', '是', '关联订单编号'],
                  ['create_time', 'string', '是', '记录时间，格式YYYY-MM-DD HH:mm:ss'],
                  ['pickup_code', 'string', '是', '取票码，8位随机数字(10000000-99999999)，订单支付成功后生成，用于线下取票核验']
                ]
              },
              {
                title: '出票明细字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['ticket_time', 'string', '是', '出票时间，格式YYYY-MM-DD HH:mm:ss'],
                  ['operator_name', 'string', '是', '执行出票的操作员姓名'],
                  ['ticket_location', 'string', '是', '出票地点，如售票窗口A/大厅自助机'],
                  ['pickup_code', 'string', '否', '本次出票取票码'],
                  ['ticket_device', 'string', '否', '出票设备名称/编号'],
                  ['ticket_type', 'enum', '是', '出票方式：纸质票/电子票'],
                  ['print_times', 'number', '是', '打印次数，首次出票为1，每次重印累加']
                ]
              },
              {
                title: '操作日志字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['action_time', 'string', '是', '操作时间，格式YYYY-MM-DD HH:mm:ss'],
                  ['operator_name', 'string', '是', '执行操作的操作员姓名'],
                  ['action_type', 'enum', '是', '操作类型：收款/出票/核销/退款/取消/修改备注/重印'],
                  ['action_desc', 'string', '是', '操作描述，如"确认收款 ¥380"'],
                  ['before_status', 'enum', '否', '操作前订单状态：预约/已支付/已出票/已核销/退款中/已取消'],
                  ['after_status', 'enum', '否', '操作后订单状态'],
                  ['amount', 'number', '否', '涉及金额（元），收款/退款时必填'],
                  ['payment_method', 'enum', '否', '支付方式：微信支付/支付宝/现金/充值卡/钱包支付'],
                  ['remark', 'string', '否', '操作备注，如退款原因、特殊情况说明']
                ]
              }
            ]
          }
        ]
      },
      {
        title: '充值订单',
        sections: [
          {
            title: '功能描述',
            content: `<p><strong>核心功能：</strong>管理用户钱包充值订单的查询与查看详情。顶部提供5张统计卡片（总充值笔数/充值总额/赠送总额/人均充值/充值卡笔数），支持按状态和关键词筛选，充值订单列表展示用户充值记录，支持查看充值订单详情弹窗。</p>
            <p><strong>业务说明：</strong></p>
            <ul>
              <li><strong>前置条件：</strong>操作人需具有"订单管理"权限</li>
              <li><strong>功能实现逻辑：</strong>
                <ul>
                  <li>统计卡片：总充值笔数、充值总额、赠送总额、人均充值、充值卡笔数，均带较上月环比趋势</li>
                  <li>筛选查询：支持状态筛选（全部/充值成功/充值失败/处理中）、关键词搜索（订单号/用户手机号）</li>
                  <li>充值列表：展示订单号、用户姓名、手机号（脱敏）、充值金额、赠送金额、支付方式、状态（彩色标签）、时间、操作按钮</li>
                  <li>充值详情：弹窗展示订单完整信息，包括订单号、用户、手机号、充值金额、赠送金额、实际到账金额、支付方式、状态、充值时间</li>
                  <li>赠送规则：根据充值档位自动计算赠送金额，如充500送50、充1000送150、充3000送600</li>
                </ul>
              </li>
              <li><strong>权限控制：</strong>查看需"订单查看"权限</li>
              <li><strong>数据约束：</strong>充值订单编号唯一；充值成功后用户钱包余额实时增加；赠送金额同步到账</li>
              <li><strong>能力边界：</strong>不支持手动创建充值订单；不支持修改充值金额；不支持充值退款</li>
            </ul>`
          },
          {
            title: '交互说明',
            content: `<p><strong>筛选查询充值订单</strong></p>
            <ul>
              <li><strong>触发：</strong>在筛选栏选择状态或输入关键词后点击"查询"按钮</li>
              <li><strong>执行中：</strong>按钮loading，表格数据刷新</li>
              <li><strong>成功：</strong>表格显示符合条件的充值订单列表</li>
              <li><strong>失败：</strong>Toast提示"查询失败"</li>
              <li><strong>边界条件：</strong>无筛选条件时显示全部充值订单；点击"导出"导出当前筛选结果</li>
            </ul>
            <p><strong>查看充值订单详情</strong></p>
            <ul>
              <li><strong>触发：</strong>点击表格行操作列的"查看"文字按钮</li>
              <li><strong>执行中：</strong>弹出充值订单详情弹窗（520px），展示订单完整信息</li>
              <li><strong>成功：</strong>弹窗正常展示充值订单数据，包含实际到账金额（充值金额+赠送金额）自动计算</li>
              <li><strong>失败：</strong>Toast提示"加载失败"</li>
              <li><strong>边界条件：</strong>弹窗内信息为只读，不可编辑</li>
            </ul>`
          },
          {
            title: '核心字段',
            noTableWrap: true,
            tables: [
              {
                title: '统计卡片字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['total_recharge_count', 'number', '是', '总充值笔数'],
                  ['total_recharge_amount', 'number', '是', '充值总额（元）'],
                  ['total_bonus_amount', 'number', '是', '赠送总额（元）'],
                  ['per_capita_recharge', 'number', '是', '人均充值（元）'],
                  ['recharge_card_count', 'number', '是', '充值卡笔数']
                ]
              },
              {
                title: '筛选条件字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['filter_status', 'enum', '否', '状态：全部/充值成功/充值失败/处理中'],
                  ['filter_keyword', 'string', '否', '关键词：订单号/用户手机号']
                ]
              },
              {
                title: '充值列表字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['order_id', 'string', '是', '订单编号，如CZ202604100001'],
                  ['user_name', 'string', '是', '用户姓名'],
                  ['user_phone', 'string', '是', '用户手机号（脱敏）'],
                  ['recharge_amount', 'number', '是', '充值金额（元）'],
                  ['bonus_amount', 'number', '是', '赠送金额（元），无赠送显示"-"'],
                  ['payment_method', 'enum', '是', '支付方式：微信支付/支付宝/钱包支付/充值卡'],
                  ['status', 'enum', '是', '状态：充值成功/充值失败/处理中'],
                  ['recharge_time', 'string', '是', '充值时间，格式YYYY-MM-DD HH:mm']
                ]
              },
              {
                title: '充值详情弹窗字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['actual_arrival', 'number', '是', '实际到账金额（元）= 充值金额 + 赠送金额']
                ]
              }
            ]
          }
        ]
      },
      {
        title: '券包订单',
        sections: [
          {
            title: '功能描述',
            content: `<p><strong>核心功能：</strong>管理券包（套票）订单的查询与查看详情。顶部提供4张统计卡片（总订单数/已售券数/已使用/使用率），支持按状态和关键词筛选，券包订单列表展示用户购买记录，支持查看券包订单详情弹窗（含门票使用情况明细）。</p>
            <p><strong>业务说明：</strong></p>
            <ul>
              <li><strong>前置条件：</strong>操作人需具有"订单管理"权限</li>
              <li><strong>功能实现逻辑：</strong>
                <ul>
                  <li>统计卡片：总订单数、已售券数、已使用券数、使用率（%），均带较上月环比趋势</li>
                  <li>筛选查询：支持状态筛选（全部/已支付/预约/已退款）、关键词搜索（订单号/券包名称）</li>
                  <li>券包列表：展示订单号、用户姓名、券包名称（含数量，如"春日观演套票 x5"）、券数量、金额、支付方式、状态（彩色标签）、时间、操作按钮</li>
                  <li>券包详情：弹窗展示订单信息（订单号/用户/券包名称/券数量/支付金额/单价/支付方式/状态/下单时间），以及门票使用情况明细表格（序号/关联演出/状态/使用时间）</li>
                  <li>门票使用状态：每张券关联具体演出，状态为"已使用"或"未使用"，已使用显示使用时间</li>
                </ul>
              </li>
              <li><strong>权限控制：</strong>查看需"订单查看"权限</li>
              <li><strong>数据约束：</strong>券包订单编号唯一；券包内每张券独立记录使用状态；已使用的券不可退款</li>
              <li><strong>能力边界：</strong>不支持手动创建券包订单；不支持修改券包内容；不支持部分券退款</li>
            </ul>`
          },
          {
            title: '交互说明',
            content: `<p><strong>筛选查询券包订单</strong></p>
            <ul>
              <li><strong>触发：</strong>在筛选栏选择状态或输入关键词后点击"查询"按钮</li>
              <li><strong>执行中：</strong>按钮loading，表格数据刷新</li>
              <li><strong>成功：</strong>表格显示符合条件的券包订单列表</li>
              <li><strong>失败：</strong>Toast提示"查询失败"</li>
              <li><strong>边界条件：</strong>无筛选条件时显示全部券包订单；点击"导出"导出当前筛选结果</li>
            </ul>
            <p><strong>查看券包订单详情</strong></p>
            <ul>
              <li><strong>触发：</strong>点击表格行操作列的"查看"文字按钮</li>
              <li><strong>执行中：</strong>弹出券包订单详情弹窗（520px），上方展示订单信息，下方展示门票使用情况明细表格</li>
              <li><strong>成功：</strong>弹窗正常展示券包订单数据，门票使用状态以彩色标签区分（已使用-绿色/未使用-灰色）</li>
              <li><strong>失败：</strong>Toast提示"加载失败"</li>
              <li><strong>边界条件：</strong>弹窗内信息为只读，不可编辑；已使用/未使用数量实时统计</li>
            </ul>`
          },
          {
            title: '核心字段',
            noTableWrap: true,
            tables: [
              {
                title: '统计卡片字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['total_order_count', 'number', '是', '总订单数'],
                  ['total_ticket_count', 'number', '是', '已售券数'],
                  ['used_ticket_count', 'number', '是', '已使用券数'],
                  ['usage_rate', 'number', '是', '使用率（%）']
                ]
              },
              {
                title: '筛选条件字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['filter_status', 'enum', '否', '状态：全部/已支付/预约/已退款'],
                  ['filter_keyword', 'string', '否', '关键词：订单号/券包名称']
                ]
              },
              {
                title: '券包列表字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['order_id', 'string', '是', '订单编号，如QB202604100001'],
                  ['user_name', 'string', '是', '用户姓名'],
                  ['pack_name', 'string', '是', '券包名称，如春日观演套票'],
                  ['pack_quantity', 'number', '是', '券数量（张）'],
                  ['amount', 'number', '是', '支付金额（元）'],
                  ['payment_method', 'enum', '是', '支付方式：微信支付/支付宝'],
                  ['status', 'enum', '是', '状态：已支付/预约/已退款'],
                  ['order_time', 'string', '是', '下单时间，格式YYYY-MM-DD HH:mm']
                ]
              },
              {
                title: '券包详情-门票使用明细字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['ticket_no', 'number', '是', '序号'],
                  ['related_show', 'string', '是', '关联演出名称'],
                  ['ticket_status', 'enum', '是', '券状态：已使用/未使用'],
                  ['use_time', 'string', '否', '使用时间，格式YYYY-MM-DD HH:mm，未使用显示"—"']
                ]
              }
            ]
          }
        ]
      },
      {
        title: '商城订单',
        sections: [
          {
            title: '功能描述',
            content: `<p><strong>核心功能：</strong>管理商城商品订单的查询、查看详情与发货处理。顶部提供4张统计卡片（总订单数/待发货/销售额/退款率），支持按状态和关键词筛选，商城订单列表展示用户购买记录，支持查看商城订单详情弹窗（含物流信息），待发货订单支持发货操作。</p>
            <p><strong>业务说明：</strong></p>
            <ul>
              <li><strong>前置条件：</strong>操作人需具有"订单管理"权限；发货操作需"商城发货"权限</li>
              <li><strong>功能实现逻辑：</strong>
                <ul>
                  <li>统计卡片：总订单数、待发货订单数、销售额（元）、退款率（%），均带较上月环比趋势</li>
                  <li>筛选查询：支持状态筛选（全部/待发货/已发货/已完成/退款中）、关键词搜索（订单号/商品名称）</li>
                  <li>商城列表：展示订单号、用户姓名、商品信息（名称+SKU/分类）、数量、金额、收货地址、状态（彩色标签）、时间、操作按钮</li>
                  <li>商城详情：弹窗展示订单信息（订单号/用户/商品名称/SKU/分类/数量/金额/收货地址/状态/下单时间），以及物流信息时间轴（已发货/已完成订单显示物流节点：已揽收→运输中→已签收）</li>
                  <li>发货操作：待发货订单操作列显示"发货"按钮，点击后可在详情中更新发货状态</li>
                  <li>退款操作：退款中订单操作列显示"退款"按钮，点击后审核通过退款</li>
                  <li>商品类型：演出衍生品、文创周边、定制礼品等</li>
                </ul>
              </li>
              <li><strong>权限控制：</strong>查看需"订单查看"权限；发货需"商城发货"权限；退款审核需"退款审核"权限</li>
              <li><strong>数据约束：</strong>商城订单编号唯一；已发货订单不可取消；已完成订单不可退款</li>
              <li><strong>能力边界：</strong>不支持手动创建商城订单；不支持修改收货地址；不支持部分发货</li>
            </ul>`
          },
          {
            title: '交互说明',
            content: `<p><strong>筛选查询商城订单</strong></p>
            <ul>
              <li><strong>触发：</strong>在筛选栏选择状态或输入关键词后点击"查询"按钮</li>
              <li><strong>执行中：</strong>按钮loading，表格数据刷新</li>
              <li><strong>成功：</strong>表格显示符合条件的商城订单列表</li>
              <li><strong>失败：</strong>Toast提示"查询失败"</li>
              <li><strong>边界条件：</strong>无筛选条件时显示全部商城订单；点击"导出"导出当前筛选结果</li>
            </ul>
            <p><strong>查看商城订单详情</strong></p>
            <ul>
              <li><strong>触发：</strong>点击表格行操作列的"查看"文字按钮</li>
              <li><strong>执行中：</strong>弹出商城订单详情弹窗（560px），上方展示订单信息，已发货/已完成订单下方展示物流信息时间轴，待发货订单下方展示发货等待提示</li>
              <li><strong>成功：</strong>弹窗正常展示商城订单数据，物流节点以时间轴形式展示</li>
              <li><strong>失败：</strong>Toast提示"加载失败"</li>
              <li><strong>边界条件：</strong>弹窗内信息为只读，不可编辑</li>
            </ul>
            <p><strong>发货操作</strong></p>
            <ul>
              <li><strong>触发：</strong>点击待发货订单操作列的"发货"按钮（带卡车图标）</li>
              <li><strong>执行中：</strong>在详情弹窗中更新发货状态，或弹出发货确认弹窗</li>
              <li><strong>成功：</strong>订单状态更新为"已发货"，物流信息开始记录，Toast提示"发货成功"</li>
              <li><strong>失败：</strong>Toast提示"发货失败"</li>
              <li><strong>边界条件：</strong>仅待发货订单显示发货按钮；发货后不可撤销</li>
            </ul>
            <p><strong>退款审核</strong></p>
            <ul>
              <li><strong>触发：</strong>点击退款中订单操作列的"退款"按钮</li>
              <li><strong>执行中：</strong>弹出退款确认，确认后订单状态更新</li>
              <li><strong>成功：</strong>订单状态更新，Toast提示"退款审核通过"</li>
              <li><strong>失败：</strong>Toast提示"退款失败"</li>
              <li><strong>边界条件：</strong>已完成订单不可退款；已发货未签收订单需先拦截物流</li>
            </ul>`
          },
          {
            title: '核心字段',
            noTableWrap: true,
            tables: [
              {
                title: '统计卡片字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['total_order_count', 'number', '是', '总订单数'],
                  ['pending_shipment_count', 'number', '是', '待发货订单数'],
                  ['sales_amount', 'number', '是', '销售额（元）'],
                  ['refund_rate', 'number', '是', '退款率（%）']
                ]
              },
              {
                title: '筛选条件字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['filter_status', 'enum', '否', '状态：全部/待发货/已发货/已完成/退款中'],
                  ['filter_keyword', 'string', '否', '关键词：订单号/商品名称']
                ]
              },
              {
                title: '商城列表字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['order_id', 'string', '是', '订单编号，如SC202604100001'],
                  ['user_name', 'string', '是', '用户姓名'],
                  ['product_name', 'string', '是', '商品名称'],
                  ['sku_info', 'string', '是', 'SKU及分类，如SKU: HN-TSHIRT-002 · 演出衍生品'],
                  ['quantity', 'number', '是', '购买数量'],
                  ['amount', 'number', '是', '订单金额（元）'],
                  ['shipping_address', 'string', '是', '收货地址'],
                  ['status', 'enum', '是', '状态：待发货/已发货/已完成/退款中'],
                  ['order_time', 'string', '是', '下单时间，格式YYYY-MM-DD HH:mm']
                ]
              },
              {
                title: '物流信息字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['logistics_node', 'enum', '是', '物流节点：已揽收/运输中/已签收'],
                  ['logistics_location', 'string', '是', '物流地点，如海口仓库/海口转运中心'],
                  ['logistics_time', 'string', '是', '物流时间，格式YYYY-MM-DD HH:mm']
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  'pc-admin/show-management.html': {
    title: '演出管理',
    subtitle: '演出项目全生命周期管理 - 演出/场次/场馆/座位/评论',
    sections: [
      {
        title: '演出项目',
        sections: [
          {
            title: '功能描述',
            content: `<p><strong>核心功能：</strong>管理演出项目的完整生命周期，包括创建、编辑、上架/下架、删除。支持3步向导式创建与编辑（基础信息→票价与场次→票务策略），一个演出统一设置一个开票时间，基于开票时间配置会员优先购（开票前N天提前购买）。列表页提供统计卡片（总演出数/售票中/总售票数/总票房/今年票房）、快捷状态筛选（全部/售票中/已结束）、高级筛选（场馆·演出厅/演出类型/演出日期范围）和搜索功能。</p>
            <p><strong>业务说明：</strong></p>
            <ul>
              <li><strong>前置条件：</strong>操作人需具有"演出管理"权限；场馆需已在"场馆管理"中创建并配置演出厅；演出厅需已在"场馆座位配置"中完成座位布局和分区设置</li>
              <li><strong>功能实现逻辑：</strong>
                <ul>
                  <li>创建演出（3步向导）：Step1 基础信息（名称/类型/场馆/演出厅/封面/简介/时长/入场时间/儿童规则/语言/主办方/禁止携带/须知/日期范围）→ Step2 票价与场次（根据场馆座位分区自动生成票档，可设置票价和限购数量；手动添加多个场次日期和时间）→ Step3 票务策略（设置统一开票时间；可选开启会员优先购：开票前N天会员可提前购买）→ 保存</li>
                  <li>编辑演出（3步向导）：Step1 基础信息（字段与创建一致，回填现有数据，包含日期范围）→ Step2 票价与场次（只读展示现有票档和场次，提示"如需修改请前往场次管理"）→ Step3 票务策略（修改开票时间/会员优先购配置）→ 保存</li>
                  <li>封面裁剪：上传后支持3种比例裁剪（列表页16:9 / 详情页3:4 / 分享图1:1），带九宫格辅助线和四角拖拽</li>
                  <li>上架/下架：列表行内操作，切换演出可见状态，已结束演出不可操作</li>
                  <li>删除：仅草稿状态可删除，已产生订单不可删除</li>
                  <li>票房展示：列表每行显示累计票房金额、已售/总数、百分比进度条</li>
                </ul>
              </li>
              <li><strong>开票时间规则：</strong>一个演出统一设置一个开票时间，所有场次在此时间同时开售；系统根据当前时间与开票时间自动计算状态（待开票/已开票）</li>
              <li><strong>早鸟票规则：</strong>早鸟票不再在演出项目级别配置，统一在营销中心-票品折扣中创建"早鸟票"类型折扣活动进行管理</li>
              <li><strong>会员优先购规则：</strong>开票前N天会员可提前购买（如开票前3天），仅指定会员等级可享受；可设置限购数量</li>
              <li><strong>权限控制：</strong>新建/编辑需"演出编辑"权限；上架/下架需"演出发布"权限；删除需"演出删除"权限</li>
              <li><strong>数据约束：</strong>演出名称不可重复；演出厅选项联动场馆选择；票档名称和库存由场馆座位分区决定不可修改</li>
              <li><strong>能力边界：</strong>不支持批量创建；不支持跨场馆复制配置；编辑时Step2票档和场次只读（需通过场次管理Tab操作）</li>
            </ul>`
          },
          {
            title: '交互说明',
            content: `<p><strong>新建演出</strong></p>
            <ul>
              <li><strong>触发：</strong>点击列表页右上角"新建演出"按钮（btn-primary，带 fa-plus 图标）</li>
              <li><strong>执行中：</strong>弹出3步向导弹窗（modalNewShow），顶部步骤指示器显示当前进度，底部按钮：取消/下一步（Step1-2）/上一步+保存（Step3）；Step3包含：统一开票时间设置（datetime-local输入）、会员优先购开关（开启后显示提前天数/会员等级/限购数量）</li>
              <li><strong>成功：</strong>保存成功后弹窗关闭，列表刷新显示新演出，Toast提示"创建成功"</li>
              <li><strong>失败：</strong>必填字段未填时在字段下方显示红色错误提示；名称重复时提示"该演出名称已存在"</li>
              <li><strong>边界条件：</strong>未选择场馆时演出厅下拉框为空；未配置座位分区的演出厅提示"请先在场馆座位配置中设置分区"</li>
            </ul>
            <p><strong>编辑演出</strong></p>
            <ul>
              <li><strong>触发：</strong>点击列表行操作列"编辑"按钮（fa-pen + 编辑）</li>
              <li><strong>执行中：</strong>弹出3步向导弹窗（modalEditShow），顶部步骤指示器，Step1回填现有数据，Step2只读展示票档和场次并提示"如需修改请前往场次管理"，Step3可修改开票时间及票务策略（开票时间/会员优先购配置，与新建一致）；底部按钮：取消/下一步（Step1-2）/上一步+保存（Step3）</li>
              <li><strong>成功：</strong>弹窗关闭，列表对应行数据更新，Toast提示"保存成功"</li>
              <li><strong>失败：</strong>校验不通过显示错误提示</li>
              <li><strong>边界条件：</strong>封面图显示已上传状态，可重新裁剪；已售出票的演出不可修改场馆和演出厅</li>
            </ul>
            <p><strong>上架/下架演出</strong></p>
            <ul>
              <li><strong>触发：</strong>点击列表行操作列"上架"/"下架"按钮（fa-eye/fa-eye-slash + 上架/下架），按钮带 data-sold 属性标识已售票数</li>
              <li><strong>执行中：</strong>若演出已售出门票（data-sold > 0），弹出警告弹窗（modalConfirmOffShelf），红色背景提示"该演出已有售出门票"，显示演出名称和已售数量，说明"下架后已购票用户仍可使用，但新用户将无法购买"，提供"取消"和"确认下架"按钮；若无已售出票，直接切换状态</li>
              <li><strong>成功：</strong>状态标签更新（售票中↔已下架），按钮文字与图标切换，Toast提示"演出已上架"/"演出已下架"/"演出已强制下架"</li>
              <li><strong>失败：</strong>Toast提示"操作失败"</li>
              <li><strong>边界条件：</strong>已结束的演出不显示上架/下架按钮；已售出门票的演出下架需二次确认</li>
            </ul>
            <p><strong>删除演出</strong></p>
            <ul>
              <li><strong>触发：</strong>点击列表行操作列"删除"按钮（fa-trash + 删除）</li>
              <li><strong>执行中：</strong>弹出确认弹窗"删除后不可恢复，确认删除？"</li>
              <li><strong>成功：</strong>演出从列表移除，Toast提示"删除成功"</li>
              <li><strong>失败：</strong>Toast提示"删除失败"</li>
              <li><strong>边界条件：</strong>非草稿状态不显示删除按钮；已产生订单不可删除</li>
            </ul>
            <p><strong>场次管理快捷入口</strong></p>
            <ul>
              <li><strong>触发：</strong>点击列表行操作列"场次"按钮（fa-calendar-days + 场次）</li>
              <li><strong>执行中：</strong>自动切换到"场次管理"Tab，并筛选该演出的场次</li>
              <li><strong>成功：</strong>场次Tab激活，筛选条件自动填入</li>
              <li><strong>失败：</strong>无</li>
              <li><strong>边界条件：</strong>无</li>
            </ul>
            <p><strong>票品折扣快捷入口</strong></p>
            <ul>
              <li><strong>触发：</strong>点击列表行操作列"票品折扣"按钮（fa-percent + 票品折扣）</li>
              <li><strong>执行中：</strong>跳转至营销中心-票品折扣Tab，URL参数携带演出名称，页面自动筛选该演出的折扣活动</li>
              <li><strong>成功：</strong>营销中心页面打开，票品折扣Tab激活，关联演出筛选自动匹配该演出</li>
              <li><strong>失败：</strong>若演出名称无匹配项，筛选保持"全部演出"</li>
              <li><strong>边界条件：</strong>无</li>
            </ul>
            <p><strong>标签管理</strong></p>
            <ul>
              <li><strong>触发：</strong>点击列表行操作列"标签"按钮（fa-tag + 标签/已有标签名），无标签时显示灰色"标签"文字，有标签时显示带背景色的标签名称</li>
              <li><strong>执行中：</strong>弹出标签编辑弹窗（modalTagEdit），包含：标签名称输入框（最多6个字符）、10色颜色选择器（圆形色块，选中带白色对勾和深蓝边框）、预览区域（实时显示标签效果）</li>
              <li><strong>成功：</strong>弹窗关闭，操作按钮更新为带背景色的标签样式（--tag-bg + --tag-color），Toast提示"标签设置成功"</li>
              <li><strong>失败：</strong>标签名称为空时Toast提示"请输入标签名称"</li>
              <li><strong>边界条件：</strong>点击"清除标签"可移除标签，按钮恢复为灰色默认样式，Toast提示"标签已清除"；标签名称最多6个字符，超出截断</li>
            </ul>`
          },
          {
            title: '核心字段',
            noTableWrap: true,
            tables: [
              {
                title: '演出项目字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['show_id', 'number', '是', '演出唯一标识'],
                  ['title', 'string', '是', '演出名称，不可重复'],
                  ['type', 'enum', '是', '演出类型：演唱会/话剧/音乐剧/舞蹈/体育赛事/儿童剧/音乐节/芭蕾舞/脱口秀/其他'],
                  ['cover_image', 'string', '是', '演出封面图URL，支持3种比例裁剪（16:9/3:4/1:1）'],
                  ['date_range', 'object', '是', '演出日期范围（start_date + end_date）'],
                  ['venue_id', 'number', '是', '所属场馆ID'],
                  ['hall_id', 'number', '是', '所属演出厅ID'],
                  ['hall_name', 'string', '是', '演出厅名称（主剧场/音乐厅/小剧场等）'],
                  ['description', 'string', '否', '演出详细介绍，富文本'],
                  ['duration', 'number', '否', '演出时长（分钟），默认120'],
                  ['entry_time', 'enum', '否', '入场时间：开演前15/30/45/60分钟'],
                  ['child_rule', 'enum', '否', '儿童入场规定：全票/1.2米以下免票不占座/免票占座/不可入场'],
                  ['language', 'string', '否', '演出语言，默认"中文"'],
                  ['organizer', 'string', '否', '主办方名称'],
                  ['prohibited_items', 'string', '否', '禁止携带物品，多项用顿号分隔'],
                  ['notice', 'string', '否', '观演须知，富文本'],
                  ['status', 'enum', '是', '状态：草稿/售票中/已下架/已结束/售罄'],
                  ['ticket_open_time', 'datetime', '是', '统一开票时间，所有场次同时开售'],
                  ['ticket_open_status', 'enum', '是', '开票状态：待开票/已开票（根据当前时间自动计算）'],
                  ['total_tickets', 'number', '是', '总售票数'],
                  ['yearly_revenue', 'number', '是', '今年票房收入（元）'],
                  ['box_revenue', 'number', '是', '累计票房收入（元）'],
                  ['created_at', 'string', '是', '创建时间']
                ]
              },
              {
                title: '演出标签字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['tag_name', 'string', '否', '标签名称，最多6个字符，如：热门/推荐/限时'],
                  ['tag_color', 'string', '否', '标签颜色（HEX格式），如：#FF6B4A'],
                  ['tag_bg', 'string', '否', '标签背景色（带透明度），如：rgba(255,107,74,0.1)']
                ]
              },
              {
                title: '票档字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['ticket_id', 'number', '是', '票档唯一标识'],
                  ['show_id', 'number', '是', '关联演出ID'],
                  ['zone_name', 'string', '是', '票档名称（由场馆座位分区自动生成，如VIP区/A区/B区）'],
                  ['zone_color', 'string', '是', '分区颜色标识'],
                  ['price', 'number', '是', '票价（元），可编辑'],
                  ['available_stock', 'number', '是', '可用库存（已售/总数）'],
                  ['limit_per_user', 'number', '是', '限购数量（张/人）'],
                  ['total_seats', 'number', '是', '分区总座位数（只读）'],
                  ['status', 'enum', '是', '票档状态：在售/停售/售罄']
                ]
              },
              {
                title: '开票时间字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['ticket_open_time', 'datetime', '是', '统一开票时间（datetime-local），所有场次同时开售'],
                  ['ticket_open_status', 'enum', '是', '开票状态：待开票/已开票（系统自动计算）']
                ]
              },

              {
                title: '会员优先购字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['is_enabled', 'boolean', '是', '是否启用会员优先购'],
                  ['priority_days', 'number', '是', '提前天数（开票前N天），1-14'],
                  ['member_levels', 'array', '是', '可优先购会员等级（银卡/金卡/铂金/钻石）'],
                  ['limit_per_user', 'number', '是', '限购数量（张/人），1-10']
                ]
              }
            ]
          }
        ]
      },
      {
        title: '场次管理',
        sections: [
          {
            title: '功能描述',
            content: `<p><strong>核心功能：</strong>管理所有演出的场次信息。支持按演出项目、场馆·厅、状态、日期范围筛选，支持批量选择和搜索。每个场次显示演出名称、场次时间、场馆·厅、已售数量、上座率（带进度条和颜色标识）、票房金额和状态。操作包括编辑、查看场次数据（弹窗含统计卡片+柱状图+票档明细表格）。新建场次通过弹窗创建，选择演出后自动展示演出信息。</p>
            <p><strong>业务说明：</strong></p>
            <ul>
              <li><strong>前置条件：</strong>演出项目需已创建；关联的演出厅需已配置座位</li>
              <li><strong>功能实现逻辑：</strong>
                <ul>
                  <li>场次列表：支持筛选（演出/场馆·厅/状态/日期）+ 搜索 + 批量选择（checkbox）</li>
                  <li>统计卡片：总场次/已开票/进行中/已结束，4个指标</li>
                  <li>上座率颜色规则：≥70%翠绿、40%-69%珊瑚、＜40%金色、0%灰色、100%已结束灰色</li>
                  <li>场次状态：未开票/售票中/已暂停/已售罄/已结束，5种状态</li>
                  <li>新建场次：弹窗选择演出→自动展示演出信息（时间/场馆·厅/已建场次/时长）→设置日期/时间/状态→创建</li>
                  <li>场次数据：弹窗展示票房金额/售票数/上座率/总座位4个统计卡片 + 各票档销售柱状图 + 票档明细表格（票档名/单价/总座位/已售/销售额/上座率）</li>
                  <li>编辑场次：弹窗回填数据，可修改日期/时间/状态；切换状态为"已暂停"时，若该演出正在演出中则提示不可暂停</li>
                </ul>
              </li>
              <li><strong>权限控制：</strong>新建/编辑需"演出编辑"权限</li>
              <li><strong>数据约束：</strong>同一演出同一时间不可重复创建场次；已售出票的场次不可修改日期时间</li>
              <li><strong>能力边界：</strong>不支持批量删除；不支持场次复制；不支持停售/开售操作（需通过编辑场次修改状态）；不支持删除场次</li>
            </ul>`
          },
          {
            title: '交互说明',
            content: `<p><strong>新建场次</strong></p>
            <ul>
              <li><strong>触发：</strong>点击筛选栏右侧"新建场次"按钮（btn-primary）</li>
              <li><strong>执行中：</strong>弹出新场次弹窗（modalNewSession），选择演出后自动展示演出信息卡和已有场次列表</li>
              <li><strong>成功：</strong>弹窗关闭，列表刷新，Toast提示"创建成功"</li>
              <li><strong>失败：</strong>校验不通过显示错误提示</li>
              <li><strong>边界条件：</strong>未选择演出时信息卡和场次列表不显示；重复时间提示"该时段已有场次"</li>
            </ul>
            <p><strong>编辑场次</strong></p>
            <ul>
              <li><strong>触发：</strong>点击操作列"编辑"按钮（fa-pen + 编辑）</li>
              <li><strong>执行中：</strong>弹出编辑弹窗，回填数据，可修改日期/时间/状态</li>
              <li><strong>成功：</strong>列表数据更新</li>
              <li><strong>失败：</strong>Toast提示"更新失败"</li>
              <li><strong>边界条件：</strong>已售出票的场次日期和时间字段置灰；切换状态为"已暂停"时，若该演出正在演出中则Toast提示"该演出正在演出中，不可暂停"并回退状态</li>
            </ul>
            <p><strong>查看座位图</strong></p>
            <ul>
              <li><strong>触发：</strong>点击操作列"座位"按钮（fa-chair + 座位）</li>
              <li><strong>执行中：</strong>弹出座位图弹窗，展示该场次座位布局与销售状态</li>
              <li><strong>成功：</strong>座位图正常展示，可查看各分区销售情况</li>
              <li><strong>失败：</strong>无</li>
              <li><strong>边界条件：</strong>无座位数据时显示空状态</li>
            </ul>`
          },
          {
            title: '核心字段',
            noTableWrap: true,
            tables: [
              {
                title: '场次字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['session_id', 'number', '是', '场次唯一标识'],
                  ['show_id', 'number', '是', '关联演出ID'],
                  ['show_name', 'string', '是', '演出名称'],
                  ['show_time', 'string', '是', '场次时间，格式 YYYY-MM-DD HH:MM'],
                  ['venue_hall', 'string', '是', '场馆·厅名称'],
                  ['sold_count', 'number', '是', '已售数量'],
                  ['occupancy_rate', 'number', '是', '上座率（百分比），带颜色标识'],
                  ['box_revenue', 'number', '是', '票房金额（元）'],
                  ['status', 'enum', '是', '状态：未开票/售票中/已暂停/已售罄/已结束']
                ]
              }
            ]
          }
        ]
      },
      {
        title: '场馆管理',
        sections: [
          {
            title: '功能描述',
            content: `<p><strong>核心功能：</strong>以卡片网格布局管理场馆信息。每张场馆卡片展示封面图、名称、地址、座位数、分区数、厅数、演出数，提供编辑/演出厅/管理座位3个操作入口。新建场馆通过弹窗创建，支持地图定位选择。演出厅管理通过独立弹窗实现，支持新增/编辑厅（名称/类型/座位数/分区数/设备信息/状态），座位数由座位配置模块自动计算。</p>
            <p><strong>业务说明：</strong></p>
            <ul>
              <li><strong>前置条件：</strong>操作人需具有"场馆管理"权限</li>
              <li><strong>功能实现逻辑：</strong>
                <ul>
                  <li>场馆列表：卡片网格布局，末尾有"+"新建入口卡片</li>
                  <li>新建场馆：弹窗表单（名称/地址/地图定位/所属城市/联系电话/描述/图片），支持地图选点</li>
                  <li>编辑场馆：同新建弹窗，回填数据</li>
                  <li>演出厅管理：弹窗展示厅列表表格（厅名称/类型/座位数/分区数/状态/操作），支持新增/编辑厅</li>
                  <li>新增/编辑厅：弹窗表单（厅名称/厅类型/座位数自动计算/分区信息只读/设备信息textarea/状态toggle），厅类型选项：主剧场/音乐厅/小剧场/多功能厅/实验剧场/露天剧场</li>
                  <li>管理座位：跳转到"场馆座位配置"Tab</li>
                </ul>
              </li>
              <li><strong>权限控制：</strong>新增/编辑需"场馆编辑"权限</li>
              <li><strong>数据约束：</strong>场馆名称不可重复；有关联演出的场馆不可删除</li>
              <li><strong>能力边界：</strong>不支持场馆删除操作（原型中未提供）</li>
            </ul>`
          },
          {
            title: '交互说明',
            content: `<p><strong>新建场馆</strong></p>
            <ul>
              <li><strong>触发：</strong>点击列表末尾的"+"新建卡片，或点击"新建场馆"按钮</li>
              <li><strong>执行中：</strong>弹出新场馆弹窗（modalNewVenue），包含地图定位选择器和图片上传区域</li>
              <li><strong>成功：</strong>弹窗关闭，卡片网格新增场馆卡片，Toast提示"创建成功"</li>
              <li><strong>失败：</strong>校验不通过显示错误提示</li>
              <li><strong>边界条件：</strong>名称重复提示"该场馆名称已存在"</li>
            </ul>
            <p><strong>编辑场馆</strong></p>
            <ul>
              <li><strong>触发：</strong>点击场馆卡片上的"编辑"按钮</li>
              <li><strong>执行中：</strong>弹出编辑弹窗，回填数据</li>
              <li><strong>成功：</strong>卡片信息更新</li>
              <li><strong>失败：</strong>Toast提示"更新失败"</li>
              <li><strong>边界条件：</strong>无</li>
            </ul>
            <p><strong>管理演出厅</strong></p>
            <ul>
              <li><strong>触发：</strong>点击场馆卡片上的"演出厅"按钮</li>
              <li><strong>执行中：</strong>弹出厅管理弹窗（modalHallManage），展示厅列表表格</li>
              <li><strong>成功：</strong>正常展示厅列表</li>
              <li><strong>失败：</strong>无</li>
              <li><strong>边界条件：</strong>无演出厅时显示空状态</li>
            </ul>
            <p><strong>新增/编辑演出厅</strong></p>
            <ul>
              <li><strong>触发：</strong>在厅管理弹窗中点击"新增厅"或行的"编辑"操作</li>
              <li><strong>执行中：</strong>弹出厅编辑弹窗（modalHallEdit），座位数和分区信息为只读（由座位配置自动计算）</li>
              <li><strong>成功：</strong>厅列表刷新</li>
              <li><strong>失败：</strong>Toast提示"保存失败"</li>
              <li><strong>边界条件：</strong>座位数字段显示"由座位管理模块自动计算"，disabled状态</li>
            </ul>`
          },
          {
            title: '核心字段',
            noTableWrap: true,
            tables: [
              {
                title: '场馆字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['venue_id', 'number', '是', '场馆唯一标识'],
                  ['name', 'string', '是', '场馆名称，不可重复'],
                  ['address', 'string', '是', '场馆详细地址'],
                  ['city', 'enum', '是', '所属城市：海口/三亚/琼海/万宁/儋州/其他'],
                  ['latitude', 'number', '否', '纬度（地图定位）'],
                  ['longitude', 'number', '否', '经度（地图定位）'],
                  ['phone', 'string', '否', '联系电话'],
                  ['description', 'string', '否', '场馆描述'],
                  ['cover_image', 'string', '否', '场馆封面图，建议600x320px'],
                  ['total_seats', 'number', '是', '总座位数（所有厅合计）'],
                  ['total_halls', 'number', '是', '演出厅数量'],
                  ['total_zones', 'number', '是', '总分区数'],
                  ['show_count', 'number', '是', '关联演出数量']
                ]
              },
              {
                title: '演出厅字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['hall_id', 'number', '是', '演出厅唯一标识'],
                  ['venue_id', 'number', '是', '所属场馆ID'],
                  ['name', 'string', '是', '厅名称'],
                  ['type', 'enum', '是', '厅类型：主剧场/音乐厅/小剧场/多功能厅/实验剧场/露天剧场'],
                  ['total_seats', 'number', '是', '总座位数（由座位配置自动计算）'],
                  ['zone_count', 'number', '是', '分区数'],
                  ['equipment_info', 'string', '否', '设备信息（灯光/音响/LED屏幕等）'],
                  ['status', 'enum', '是', '状态：启用/停用']
                ]
              }
            ]
          }
        ]
      },
      {
        title: '场馆座位配置',
        sections: [
          {
            title: '功能描述',
            content: `<p><strong>核心功能：</strong>左右分栏布局的座位图编辑器。左侧为可视化点阵座位图（顶部显示舞台标签，底部显示已选座位数和框选操作栏），右侧为配置面板（网格设置/分区管理/编号规则3个可折叠卡片）。支持工具栏操作（撤销/重做/清空/保存/缩放），支持框选座位并批量分配到分区。分区管理支持新建/编辑/删除分区（名称/颜色/票价），编号规则支持按顺序/中间开始编号，支持方向和单双号规则配置。</p>
            <p><strong>业务说明：</strong></p>
            <ul>
              <li><strong>前置条件：</strong>场馆和演出厅需已创建；操作人需具有"座位配置"权限</li>
              <li><strong>功能实现逻辑：</strong>
                <ul>
                  <li>场馆·厅选择：顶部下拉框选择场馆和演出厅，联动加载座位布局</li>
                  <li>楼层Tab：支持多楼层，默认"一层"，可添加新楼层</li>
                  <li>网格设置：设置行数和列数，点击"应用"重新生成网格</li>
                  <li>分区管理：新建分区（名称/颜色/票价），编辑分区（修改名称/颜色/票价），删除分区（分区删除后该分区座位变为未分配）</li>
                  <li>座位操作：点选或框选座位 → 底部显示"分配到:" + 各分区按钮 → 点击分配；使用工具栏"清空"按钮可清除所有座位分区</li>
                  <li>编号规则：横轴纵轴不显示默认编号；仅已分配分区的座位才分配编号；排号仅统计有已分配座位的行（空行不占排号）；座号联动编号规则设置，支持顺序编号（左到右/右到左）和中间开始编号（左单右双/左双右单），仅对已分配座位进行编号，空位/未分配不占座号</li>
                  <li>保存：点击保存按钮，布局数据持久化</li>
                </ul>
              </li>
              <li><strong>权限控制：</strong>编辑需"座位编辑"权限；保存需"座位发布"权限</li>
              <li><strong>数据约束：</strong>修改布局后已有场次的票档库存需重新计算；分区删除后该分区座位变为未分配</li>
              <li><strong>能力边界：</strong>不支持不规则排列；不支持实时同步到已售票场次</li>
            </ul>`
          },
          {
            title: '交互说明',
            content: `<p><strong>新建分区</strong></p>
            <ul>
              <li><strong>触发：</strong>在右侧分区管理卡片中点击"新建分区"按钮</li>
              <li><strong>执行中：</strong>弹出新建分区弹窗，包含名称输入框、颜色选择器（预设颜色+自定义颜色）、票价输入框</li>
              <li><strong>成功：</strong>分区创建成功，列表新增一条分区记录，座位图工具栏分区按钮更新</li>
              <li><strong>失败：</strong>Toast提示"保存失败"</li>
              <li><strong>边界条件：</strong>名称不可为空且不可与已有分区重复；颜色不可与已有分区重复；票价需为非负数字</li>
            </ul>
            <p><strong>编辑分区</strong></p>
            <ul>
              <li><strong>触发：</strong>点击分区项的编辑图标（fa-pen）</li>
              <li><strong>执行中：</strong>弹出编辑弹窗，回填当前分区名称、颜色、票价，可修改名称/颜色/票价</li>
              <li><strong>成功：</strong>分区信息更新，分区列表（含座位数）和座位图同步刷新</li>
              <li><strong>失败：</strong>Toast提示"保存失败"</li>
              <li><strong>边界条件：</strong>名称不可为空且不可与其他分区重复；颜色不可与其他分区重复；票价需为非负数字</li>
            </ul>
            <p><strong>删除分区</strong></p>
            <ul>
              <li><strong>触发：</strong>点击分区项的删除图标</li>
              <li><strong>执行中：</strong>弹出确认弹窗"删除后该分区座位将变为未分配，确认删除？"</li>
              <li><strong>成功：</strong>分区删除，该分区所有座位变为未分配状态，列表和座位图同步刷新</li>
              <li><strong>失败：</strong>Toast提示"删除失败"</li>
              <li><strong>边界条件：</strong>无分区时可删除；已关联场次的分区仍可删除但需二次确认</li>
            </ul>
            <p><strong>修改票价</strong></p>
            <ul>
              <li><strong>触发：</strong>在分区列表中直接点击票价输入框修改数值</li>
              <li><strong>执行中：</strong>输入框获得焦点，可修改票价数值</li>
              <li><strong>成功：</strong>输入框失焦后自动保存，Toast提示"票价已更新"</li>
              <li><strong>失败：</strong>Toast提示"保存失败"，输入框恢复原值</li>
              <li><strong>边界条件：</strong>票价需为非负数字，输入非法值时失焦后恢复原值并提示</li>
            </ul>
            <p><strong>座位分配</strong></p>
            <ul>
              <li><strong>触发：</strong>在座位图上点击单个座位或拖拽框选多个座位</li>
              <li><strong>执行中：</strong>底部出现"已选座位：N"和"分配到:"按钮组（各分区名称+颜色标识）</li>
              <li><strong>成功：</strong>点击分区按钮后，选中座位变为该分区颜色</li>
              <li><strong>失败：</strong>无</li>
              <li><strong>边界条件：</strong>已售出的座位不可选中；使用工具栏"清空"按钮可清除所有座位分区分配</li>
            </ul>
            <p><strong>切换编号规则</strong></p>
            <ul>
              <li><strong>触发：</strong>在编号规则卡片中修改编号模式（顺序编号/中间开始编号）或方向</li>
              <li><strong>执行中：</strong>座位图即时刷新，重新计算所有座位编号</li>
              <li><strong>成功：</strong>座位图显示更新后的编号</li>
              <li><strong>失败：</strong>无</li>
              <li><strong>边界条件：</strong>横轴纵轴不显示默认编号；仅已分配分区的座位才分配编号；排号仅统计有已分配座位的行（空行不占排号）；座号联动编号规则设置（顺序/中间开始），仅对已分配座位编号，空位/未分配不占座号</li>
            </ul>`
          },
          {
            title: '核心字段',
            noTableWrap: true,
            tables: [
              {
                title: '分区字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['zone_id', 'number', '是', '分区唯一标识'],
                  ['zone_name', 'string', '是', '分区名称，如VIP区/A区/B区'],
                  ['zone_color', 'string', '是', '分区颜色标识（预设颜色+自定义颜色）'],
                  ['zone_price', 'number', '否', '分区票价（元），支持列表内联修改和弹窗修改'],
                  ['seat_count', 'number', '是', '该分区已分配的座位总数'],
                  ['is_editable', 'boolean', '是', '是否可编辑（已关联场次且已售票的分区不可编辑）']
                ]
              },
              {
                title: '座位网格字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['grid_rows', 'number', '是', '网格行数'],
                  ['grid_cols', 'number', '是', '网格列数'],
                  ['seat_status', 'enum', '是', '座位状态：可选/已售/已锁定/已预留/已维修/未分配'],
                  ['seat_zone_id', 'number', '否', '所属分区ID（null表示未分配）']
                ]
              },
              {
                title: '编号规则字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['row_label_type', 'string', '是', '行号标签类型，固定为中文排号（一排/二排/三排...）'],
                  ['numbering_type', 'enum', '是', '编号方式：sequential(按顺序编号)/center(中间开始编号)'],
                  ['sequential_dir', 'enum', '条件', '顺序编号方向（numbering_type=sequential时显示）：left_to_right(从左到右)/right_to_left(从右到左)'],
                  ['numbering_mode', 'enum', '条件', '单双号规则（numbering_type=center时显示）：odd_even(左单右双)/even_odd(左双右单)']
                ]
              }
            ]
          }
        ]
      },
      {
        title: '评论管理',
        sections: [
          {
            title: '功能描述',
            content: `<p><strong>核心功能：</strong>以卡片式布局管理用户对演出的评论。每条评论卡片展示用户头像、用户名、所属演出、评论时间、评论内容。支持状态快捷筛选（全部/待审核/已通过）、按演出项目筛选和搜索。操作包括通过审核、删除评论、回复评论（展开textarea输入框）。评论列表支持分页浏览。</p>
            <p><strong>业务说明：</strong></p>
            <ul>
              <li><strong>前置条件：</strong>操作人需具有"评论管理"权限；演出需已发布</li>
              <li><strong>功能实现逻辑：</strong>
                <ul>
                  <li>评论列表：卡片式布局，每张卡片含头像(84x84)/用户名/所属演出/时间/内容</li>
                  <li>状态筛选：全部/待审核/已通过，3个快捷按钮</li>
                  <li>审核操作：点击"通过"（fa-check，绿色）→ 评论状态变为已通过；点击"删除"（fa-trash，红色）→ 评论移除</li>
                  <li>回复功能：点击"回复"（fa-reply）→ 展开textarea输入框 + 取消/发送按钮 → 提交回复显示在评论下方</li>
                  <li>分页：每页显示固定条数，支持翻页</li>
                </ul>
              </li>
              <li><strong>权限控制：</strong>查看需"评论查看"权限；审核/删除需"评论审核"权限；回复需"评论回复"权限</li>
              <li><strong>数据约束：</strong>同一用户对同一演出仅可评论一次；评论内容经敏感词过滤</li>
              <li><strong>能力边界：</strong>不支持评论置顶；不支持批量审核；不支持评分管理（评分由用户提交时确定）</li>
            </ul>`
          },
          {
            title: '交互说明',
            content: `<p><strong>通过审核</strong></p>
            <ul>
              <li><strong>触发：</strong>点击评论卡片的"通过"按钮（fa-check，绿色）</li>
              <li><strong>执行中：</strong>按钮loading</li>
              <li><strong>成功：</strong>评论状态更新为已通过，在"待审核"筛选下该评论消失</li>
              <li><strong>失败：</strong>Toast提示"操作失败"</li>
              <li><strong>边界条件：</strong>已通过的评论不显示"通过"按钮</li>
            </ul>
            <p><strong>删除评论</strong></p>
            <ul>
              <li><strong>触发：</strong>点击评论卡片的"删除"按钮（fa-trash，红色）</li>
              <li><strong>执行中：</strong>弹出确认弹窗"删除后不可恢复，确认删除？"</li>
              <li><strong>成功：</strong>评论从列表移除</li>
              <li><strong>失败：</strong>Toast提示"删除失败"</li>
              <li><strong>边界条件：</strong>无</li>
            </ul>
            <p><strong>回复评论</strong></p>
            <ul>
              <li><strong>触发：</strong>点击评论卡片的"回复"按钮（fa-reply）</li>
              <li><strong>执行中：</strong>在评论下方展开textarea输入框 + "取消"和"发送回复"按钮</li>
              <li><strong>成功：</strong>回复内容显示在评论下方，输入框收起</li>
              <li><strong>失败：</strong>Toast提示"回复失败"</li>
              <li><strong>边界条件：</strong>回复内容不可为空；点击"取消"收起输入框不提交</li>
            </ul>`
          },
          {
            title: '核心字段',
            noTableWrap: true,
            tables: [
              {
                title: '评论字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['comment_id', 'number', '是', '评论唯一标识'],
                  ['show_id', 'number', '是', '关联演出ID'],
                  ['show_name', 'string', '是', '所属演出名称'],
                  ['user_id', 'number', '是', '评论用户ID'],
                  ['user_name', 'string', '是', '用户昵称'],
                  ['avatar', 'string', '是', '用户头像URL（84x84）'],
                  ['content', 'string', '是', '评论文字内容'],
                  ['rating', 'number', '否', '评分，1-5星'],
                  ['status', 'enum', '是', '评论状态：待审核/已通过/已拒绝/已隐藏/已删除'],
                  ['reply_content', 'string', '否', '官方回复内容'],
                  ['reply_time', 'string', '否', '回复时间'],
                  ['created_at', 'string', '是', '评论时间']
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  'pc-admin/ticket-sales.html': {
    title: '售票管理',
    subtitle: '窗口售票/选座售票 - 实时座位图操作',
    sections: [
      {
        title: '窗口售票',
        sections: [
          {
            title: '功能描述',
            content: `<p><strong>核心功能：</strong>线下窗口售票的三栏操作界面。左栏选择场馆和演出场次（场次显示折扣类型标签：满减/折扣/早鸟），中栏为可视化座位图（支持点选、框选、缩放），右栏为已选座位列表（带清除全部按钮）、购票人信息、会员卡信息（默认显示，支持弹窗读取）、订单摘要（含票品折扣/早鸟票/会员卡折扣减免金额）。座位图顶部有"STAGE · 舞台"标签，底部图例栏显示各分区颜色+价格图例及当前场次优惠信息。支持确认售票（订单确认→收款→出票→完成）和预约售票两种模式。确认售票流程：点击确认售票→弹出订单生成确认弹窗（显示座位数量/原价总计/优惠信息/应付金额）→确认后生成待支付订单（自动生成订单号）→进入收款步骤（3步流程：收款→出票→完成）。收款支持5种支付方式（微信/支付宝/现金/充值卡/会员卡），现金支付提供"全额支付"快捷按钮自动填入应付金额。出票支持纸质票/电子票/暂不出票。任何环节关闭或取消弹窗均进入待支付订单页面（显示订单编号/演出信息/座位列表/15分钟倒计时），支持取消订单或继续支付。页面布局为内容撑高滚动，无固定视口高度限制。</p>
<p><strong>业务说明：</strong></p>
<ul>
  <li><strong>前置条件：</strong>操作人需具有"窗口售票"权限；演出场次需处于"售票中"状态；窗口需已配置工号和操作员信息</li>
  <li><strong>功能实现逻辑：</strong>
    <ul>
      <li>场馆选择：下拉切换场馆，联动更新演出列表和座位图</li>
      <li>演出选择：点击演出卡片展开场次列表，显示每个场次的售票数/总数、上座率和折扣类型标签（满减/折扣/早鸟）</li>
      <li>座位选择：支持点选单个座位和鼠标拖拽框选多个座位，已售/不可选/待支付座位不可操作</li>
      <li>座位图：按楼层分组（一楼/二楼），每个分区用不同颜色标识，顶部有"STAGE · 舞台"标签，支持50%-300%缩放</li>
      <li>会员卡信息：右栏默认显示会员卡信息面板（卡号/等级/折扣/余额），点击"读取会员卡"弹出读取弹窗（stReadCardModal，400px宽），模拟读卡器读取后自动填充会员信息并关闭弹窗</li>
      <li>订单摘要：显示已选座位数量、原价总额、票品折扣减免（满减/折扣）、早鸟票减免、会员卡折扣减免、应付金额；折扣减免根据场次配置和会员卡信息自动计算</li>
      <li>底部图例栏：显示各分区颜色+价格图例，以及当前选中场次的优惠类型标签（票品折扣/早鸟票）</li>
      <li>确认售票流程：点击确认售票→弹出订单生成确认弹窗（stOrderConfirmModal，440px宽，显示订单摘要）→确认后生成待支付订单（订单号ORD+时间戳）→进入3步售票流程弹窗（stSellFlowModal，520px宽）</li>
      <li>订单生成确认弹窗：显示即将生成订单提示、座位数量、原价总计、优惠信息、应付金额，支持取消（不生成订单）或确认生成订单</li>
      <li>待支付订单页面：任何环节关闭/取消弹窗后进入，显示订单编号、演出名称、场次时间、座位数量、应付金额、已选座位标签列表、15分钟支付倒计时（不足2分钟变红色，超时提示重新下单），支持取消订单（释放座位）或继续支付（重新进入收款步骤）</li>
      <li>支付方式：微信/支付宝弹出扫码弹窗（模拟扫码），现金需输入实收金额（提供"全额支付"按钮自动填入应付金额）并自动计算找零（实收-应收），充值卡/会员卡弹出读卡弹窗（余额不足时扣除全部余额后进入二次支付，需选择其他支付方式补足差额）</li>
      <li>预约售票：输入手机号查找用户→显示用户信息→设置预约到期时间（默认24小时）→确认预约</li>
      <li>购票人信息：姓名、证件类型（身份证/护照/其他）、证件号码（非必填），支持读取证件（身份证读卡器自动填入）</li>
    </ul>
  </li>
  <li><strong>权限控制：</strong>需"窗口售票"权限；读取证件需连接身份证读卡器硬件；读取会员卡需连接读卡器硬件</li>
  <li><strong>数据约束：</strong>同一座位不可重复售卖；已售/不可选/待支付状态座位不可选中；无座位时确认售票和预约售票按钮disabled</li>
  <li><strong>能力边界：</strong>不支持退票操作（需到订单管理）；不支持批量售票；不支持跨场次选座</li>
</ul>`
          },
          {
            title: '交互说明',
            content: `<p><strong>选择场次</strong></p>
<ul>
  <li><strong>触发：</strong>在左栏点击演出卡片展开场次列表，再点击具体场次</li>
  <li><strong>执行中：</strong>选中场次高亮（浅橙背景+橙色文字），中栏座位图重新加载，底部图例栏更新当前场次优惠信息标签</li>
  <li><strong>成功：</strong>座位图显示该场次的座位布局，各分区颜色和票价正确渲染；有折扣的场次在列表中显示折扣类型标签（满减/折扣/早鸟）</li>
  <li><strong>失败：</strong>无</li>
  <li><strong>边界条件：</strong>切换场次时已选座位自动清空；无折扣场次不显示折扣标签</li>
</ul>
<p><strong>选择座位</strong></p>
<ul>
  <li><strong>触发：</strong>在中栏座位图上点击可售座位，或鼠标拖拽框选多个座位</li>
  <li><strong>执行中：</strong>选中座位显示白色描边+check标记，右栏已选列表实时更新，底部显示"已选座位：N"</li>
  <li><strong>成功：</strong>右栏显示已选座位详情（分区标签+座位号+价格），订单摘要更新数量和金额（含折扣减免）</li>
  <li><strong>失败：</strong>无</li>
  <li><strong>边界条件：</strong>已售/不可选/待支付座位点击无反应；再次点击已选座位可取消选中；座位悬浮显示Tooltip（分区名+排号+座位号+票价）；已选座位列表过多时页面出现滚动条</li>
</ul>
<p><strong>读取会员卡</strong></p>
<ul>
  <li><strong>触发：</strong>点击右栏会员卡信息面板的"读取会员卡"按钮（fa-credit-card图标，宽度100%）</li>
  <li><strong>执行中：</strong>弹出读取会员卡弹窗（stReadCardModal，400px宽），显示读卡器图标和"请在读卡器上放置会员卡..."提示</li>
  <li><strong>成功：</strong>2秒后弹窗自动关闭，会员卡信息面板更新卡号/等级/折扣/余额，订单摘要重新计算会员折扣减免金额，Toast提示"会员卡读取成功：XX会员"</li>
  <li><strong>失败：</strong>无</li>
  <li><strong>边界条件：</strong>会员卡信息面板默认始终显示，未读卡时字段显示"-"；切换场次时会员卡信息保持不变</li>
</ul>
<p><strong>确认售票</strong></p>
<ul>
  <li><strong>触发：</strong>点击右栏"确认售票"按钮（橙色渐变，fa-shopping-cart图标）</li>
  <li><strong>执行中：</strong>弹出订单生成确认弹窗（stOrderConfirmModal，440px宽），显示即将生成订单提示和订单摘要（座位数量/原价总计/优惠信息/应付金额），用户可取消（不生成订单）或确认生成订单</li>
  <li><strong>确认生成订单：</strong>自动生成订单号（ORD+时间戳），保存订单信息，进入确认售票流程弹窗（stSellFlowModal，520px宽），3步流程。Step1显示应收金额+5种支付方式选择→选择后打开对应支付弹窗→Step2选择出票方式→Step3显示成功</li>
  <li><strong>关闭/取消：</strong>在订单确认弹窗、售票流程弹窗（任何步骤）或支付弹窗中关闭/取消，均进入待支付订单页面（stPendingOrderModal，480px宽），显示订单编号/演出信息/座位列表/15分钟倒计时，header和footer固定不滚动，body区域可独立滚动</li>
  <li><strong>待支付订单操作：</strong>支持"取消订单"（释放座位，清空已选，返回选座界面）或"继续支付"（保留订单，重新进入收款步骤）</li>
  <li><strong>成功：</strong>Step3显示绿色大勾+"售票成功"+"已成功售出X张门票"，座位图更新为已售状态，右栏清空，订单状态清除</li>
  <li><strong>失败：</strong>支付失败时Toast提示"支付失败，请重试"</li>
  <li><strong>边界条件：</strong>无座位时按钮disabled；现金支付时提供"全额支付"按钮自动填入应付金额，输入实收金额后自动计算找零（实收-应收），实收不足提示"实收金额不足，还差XX"；充值卡/会员卡余额不足时扣除全部余额，剩余金额进入二次支付流程，需选择其他支付方式补足差额；待支付订单15分钟倒计时超时后提示"订单已超时，请重新下单"</li>
</ul>
<p><strong>预约售票</strong></p>
<ul>
  <li><strong>触发：</strong>点击右栏"预约售票"按钮（紫色渐变，fa-calendar-check图标）</li>
  <li><strong>执行中：</strong>弹出预约售票弹窗（stReserveModal，520px宽），输入手机号→查找用户→显示用户信息→设置到期时间</li>
  <li><strong>成功：</strong>弹窗关闭，座位状态变为"待支付(pending)"，右栏清空，Toast提示"预约成功"</li>
  <li><strong>失败：</strong>手机号未找到用户时提示"未找到该用户"</li>
  <li><strong>边界条件：</strong>无座位时按钮disabled；到期时间默认24小时后</li>
</ul>
<p><strong>读取证件</strong></p>
<ul>
  <li><strong>触发：</strong>点击购票人信息区域的"读取证件"按钮</li>
  <li><strong>执行中：</strong>弹出读取证件弹窗（stReadIdModal，480px宽），显示"请将身份证放置在读卡器上"</li>
  <li><strong>成功：</strong>读取成功后显示绿色勾+"读取成功"，姓名和证件号码自动填入（readonly），点击"确认填入"回填到购票人表单</li>
  <li><strong>失败：</strong>读取超时提示"读取失败，请重试"</li>
  <li><strong>边界条件：</strong>无读卡器硬件时按钮应隐藏或禁用</li>
</ul>`
          },
          {
            title: '核心字段',
            noTableWrap: true,
            tables: [
              {
                title: '座位字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['seat_id', 'number', '是', '座位唯一标识'],
                  ['zone_id', 'number', '是', '所属分区ID'],
                  ['zone_name', 'string', '是', '分区名称（VIP区/甲等区/乙等区/丙等区）'],
                  ['row_num', 'number', '是', '排号'],
                  ['col_num', 'number', '是', '列号'],
                  ['seat_no', 'string', '是', '座位编号，如"3排5号"'],
                  ['floor', 'string', '是', '所属楼层（一楼/二楼）'],
                  ['status', 'enum', '是', '座位状态：可售(available)/已售(sold)/不可选(unavailable)/已选中(selected)/待支付(pending)'],
                  ['price', 'number', '是', '票价（元）']
                ]
              },
              {
                title: '购票人信息字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['buyer_name', 'string', '否', '购票人姓名'],
                  ['id_type', 'enum', '否', '证件类型：身份证/护照/其他'],
                  ['id_number', 'string', '否', '证件号码（非必填）']
                ]
              },
              {
                title: '会员卡字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['card_no', 'string', '是', '会员卡号'],
                  ['member_level', 'enum', '是', '会员等级：普通会员/银卡会员/金卡会员/钻石会员'],
                  ['member_discount', 'number', '是', '会员折扣（0-1之间，如0.9表示9折）'],
                  ['card_balance', 'number', '是', '卡内余额（元）']
                ]
              },
              {
                title: '订单折扣字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['ticket_discount_type', 'enum', '否', '票品折扣类型：满减(amount)/折扣(percentage)'],
                  ['ticket_discount_value', 'number', '否', '票品折扣值（满减为金额，折扣为比例）'],
                  ['ticket_discount_threshold', 'number', '否', '满减门槛金额（元，仅满减类型）'],
                  ['early_bird_discount', 'number', '否', '早鸟票折扣（0-1之间）'],
                  ['early_bird_deadline', 'string', '否', '早鸟票截止日期，格式 YYYY-MM-DD'],
                  ['member_discount_amount', 'number', '否', '会员卡折扣减免金额（元），只读，自动计算'],
                  ['original_total', 'number', '是', '原价总额（元），只读'],
                  ['final_total', 'number', '是', '应付金额（元），只读，原价-各项减免']
                ]
              },
              {
                title: '订单字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['order_id', 'number', '是', '订单唯一标识'],
                  ['session_id', 'number', '是', '关联场次ID'],
                  ['seat_ids', 'array', '是', '已选座位ID列表'],
                  ['total_amount', 'number', '是', '金额总计（元）'],
                  ['total_seats', 'number', '是', '座位数量'],
                  ['pay_method', 'enum', '是', '支付方式：微信/支付宝/现金/充值卡/会员卡'],
                  ['ticket_type', 'enum', '是', '出票方式：纸质票/电子票/暂不出票'],
                  ['print_template', 'string', '否', '打印票面模版（纸质票）：标准票面/简约票面/VIP票面'],
                  ['show_price', 'boolean', '否', '是否展示票价（纸质票）'],
                  ['replace_text', 'string', '否', '替代文案（关闭票价展示时）'],
                  ['receive_phone', 'string', '否', '接收手机号（电子票）'],
                  ['ticket_remark', 'string', '否', '票面备注'],
                  ['status', 'enum', '是', '订单状态：待支付/已完成/已取消/预约中'],
                  ['operator_id', 'string', '是', '操作员工号'],
                  ['window_name', 'string', '是', '窗口名称']
                ]
              },
              {
                title: '预约订单字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['reservation_id', 'number', '是', '预约唯一标识'],
                  ['user_phone', 'string', '是', '用户手机号'],
                  ['user_name', 'string', '是', '用户昵称'],
                  ['real_name', 'string', '是', '真实姓名'],
                  ['member_level', 'enum', '否', '会员等级：普通/银卡/金卡/钻石'],
                  ['expire_time', 'string', '是', '预约到期时间'],
                  ['status', 'enum', '是', '预约状态：待支付/已取消/已完成']
                ]
              }
            ]
          }
        ]
      },
      {
        title: '渠道售票',
        sections: [
          {
            title: '功能描述',
            content: `<p><strong>核心功能：</strong>管理各渠道（大麦/猫眼/抖音/美团等）的座位分配。左栏选择演出场次（与窗口售票相同），中栏座位图用渠道颜色标注已分配座位，右栏为已选座位和渠道管理面板。支持将选中座位分配到指定渠道，或取消已分配座位的渠道归属。渠道管理支持预设渠道（大麦/猫眼/抖音/美团）和自定义添加渠道（名称+颜色）。</p>
<p><strong>业务说明：</strong></p>
<ul>
  <li><strong>前置条件：</strong>操作人需具有"渠道售票"权限；渠道需已配置</li>
  <li><strong>功能实现逻辑：</strong>
    <ul>
      <li>座位图：与窗口售票相同的三栏布局，但座位状态增加"渠道已分配"状态（显示渠道颜色描边+渠道首字标记）</li>
      <li>渠道管理：右栏显示渠道列表（颜色方块+名称+已分配座位数），点击选择激活渠道</li>
      <li>分配操作：选中可售座位→点击"分配到渠道"按钮→座位变为该渠道颜色标识</li>
      <li>取消分配：选中已分配座位→点击"取消分配"按钮→座位恢复为可售状态</li>
      <li>添加渠道：弹窗输入渠道名称+选择颜色（10种预设色）</li>
      <li>预设渠道：大麦(#FF6B35)/猫眼(#E4393C)/抖音(#111)/美团(#FFD100)，固定不可删除</li>
    </ul>
  </li>
  <li><strong>权限控制：</strong>分配/取消需"渠道管理"权限；添加渠道需"渠道配置"权限</li>
  <li><strong>数据约束：</strong>已售座位不可分配渠道；已分配座位的渠道不可重复分配其他渠道（需先取消）</li>
  <li><strong>能力边界：</strong>不支持批量分配；不支持设置渠道库存上限；不支持渠道间的座位调拨</li>
</ul>`
          },
          {
            title: '交互说明',
            content: `<p><strong>选择激活渠道</strong></p>
<ul>
  <li><strong>触发：</strong>在右栏渠道管理面板中点击某个渠道项</li>
  <li><strong>执行中：</strong>渠道项高亮（渠道颜色边框+浅色背景），中栏座位图更新渠道颜色标注</li>
  <li><strong>成功：</strong>后续分配操作将使用该渠道</li>
  <li><strong>失败：</strong>无</li>
  <li><strong>边界条件：</strong>默认无激活渠道，需手动选择</li>
</ul>
<p><strong>分配座位到渠道</strong></p>
<ul>
  <li><strong>触发：</strong>在中栏选中可售座位后，点击底部"分配到渠道"按钮（橙色渐变，fa-share-alt图标）</li>
  <li><strong>执行中：</strong>按钮loading，座位状态变为"渠道已分配"（渠道颜色描边+渠道首字标记）</li>
  <li><strong>成功：</strong>右栏渠道列表该渠道的已分配座位数+1，Toast提示"分配成功"</li>
  <li><strong>失败：</strong>未选择激活渠道时Toast提示"请先选择渠道"</li>
  <li><strong>边界条件：</strong>已售/不可选座位不可选中分配；已分配其他渠道的座位需先取消再分配</li>
</ul>
<p><strong>取消渠道分配</strong></p>
<ul>
  <li><strong>触发：</strong>在中栏选中已分配渠道的座位后，点击底部"取消分配"按钮（灰色次要按钮）</li>
  <li><strong>执行中：</strong>按钮loading，座位恢复为可售状态</li>
  <li><strong>成功：</strong>右栏渠道列表对应渠道的已分配座位数-1</li>
  <li><strong>失败：</strong>Toast提示"取消失败"</li>
  <li><strong>边界条件：</strong>仅可取消渠道已分配状态的座位</li>
</ul>
<p><strong>添加渠道</strong></p>
<ul>
  <li><strong>触发：</strong>点击右栏渠道管理底部的"添加渠道"按钮（灰色边框，fa-plus图标）</li>
  <li><strong>执行中：</strong>弹出添加渠道弹窗（chAddChannelModal，420px宽），输入渠道名称+选择颜色（10种预设色圆形色块）</li>
  <li><strong>成功：</strong>弹窗关闭，渠道列表新增渠道项，Toast提示"添加成功"</li>
  <li><strong>失败：</strong>名称为空提示"请输入渠道名称"；名称重复提示"该渠道名称已存在"</li>
  <li><strong>边界条件：</strong>预设渠道（大麦/猫眼/抖音/美团）不可删除</li>
</ul>`
          },
          {
            title: '核心字段',
            noTableWrap: true,
            tables: [
              {
                title: '渠道字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['channel_id', 'number', '是', '渠道唯一标识'],
                  ['channel_name', 'string', '是', '渠道名称'],
                  ['channel_color', 'string', '是', '渠道颜色标识（6位hex）'],
                  ['is_preset', 'boolean', '是', '是否预设渠道（预设渠道不可删除）'],
                  ['assigned_seats', 'number', '是', '已分配座位数'],
                  ['created_at', 'string', '是', '创建时间']
                ]
              },
              {
                title: '渠道座位分配字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['assignment_id', 'number', '是', '分配唯一标识'],
                  ['seat_id', 'number', '是', '座位ID'],
                  ['channel_id', 'number', '是', '渠道ID'],
                  ['session_id', 'number', '是', '场次ID'],
                  ['assigned_at', 'string', '是', '分配时间'],
                  ['assigned_by', 'string', '是', '操作人']
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  'pc-admin/member-management.html': {
    title: '会员管理',
    subtitle: '会员信息、等级、充值与消费全生命周期管理',
    sections: [
      {
        title: '会员列表',
        sections: [
          {
            title: '功能描述',
            content: `<p><strong>核心功能：</strong>管理会员的基础信息和状态。展示4张统计卡片（总会员数/新增本月/银卡以上/月活跃率），支持多维度筛选（全部等级/搜索昵称手机号/注册时间范围），表格展示会员完整信息（会员信息/手机号/会员等级/成长值/余额/消费总额/注册时间），支持查看详情、编辑操作。会员详情弹窗包含基本信息/消费记录/积分明细/成长值明细四个标签页。</p>
            <p><strong>业务说明：</strong></p>
            <ul>
              <li><strong>前置条件：</strong>操作人需具有"会员管理"权限</li>
              <li><strong>功能实现逻辑：</strong>
                <ul>
                  <li>会员注册：用户通过小程序注册自动成为普通会员</li>
                  <li>会员等级：根据成长值自动升级（普通/银卡/金卡/钻石/充值年卡），不同等级享受不同折扣和权益</li>
                  <li>统计卡片：总会员数、新增本月、银卡以上会员数、月活跃率</li>
                  <li>会员详情：弹窗展示基本信息、消费记录、积分明细、成长值明细四个标签页</li>
                </ul>
              </li>
              <li><strong>权限控制：</strong>查看需"会员查看"权限；编辑需"会员编辑"权限</li>
              <li><strong>数据约束：</strong>手机号唯一；会员ID唯一</li>
              <li><strong>能力边界：</strong>不支持批量导入；不支持批量编辑；不支持手动新增会员</li>
            </ul>`
          },
          {
            title: '交互说明',
            content: `<p><strong>筛选查询会员</strong></p>
            <ul>
              <li><strong>触发：</strong>在筛选栏选择等级、输入搜索词、选择时间范围后点击"查询"按钮</li>
              <li><strong>执行中：</strong>按钮loading，表格数据刷新</li>
              <li><strong>成功：</strong>表格显示符合条件的会员列表</li>
              <li><strong>失败：</strong>Toast提示"查询失败"</li>
              <li><strong>边界条件：</strong>点击"重置"清空所有筛选条件；点击"导出Excel"导出当前筛选结果</li>
            </ul>
            <p><strong>查看会员详情</strong></p>
            <ul>
              <li><strong>触发：</strong>点击操作列"查看"按钮（眼睛图标）</li>
              <li><strong>执行中：</strong>弹出会员详情弹窗，顶部展示头像和基本信息，下方有4个标签页：基本信息/消费记录/积分明细/成长值明细</li>
              <li><strong>成功：</strong>正常展示会员完整信息</li>
              <li><strong>失败：</strong>Toast提示"加载失败"</li>
              <li><strong>边界条件：</strong>无</li>
            </ul>
            <p><strong>编辑会员</strong></p>
            <ul>
              <li><strong>触发：</strong>点击操作列"编辑"按钮（笔图标）</li>
              <li><strong>执行中：</strong>弹出编辑弹窗，回填数据，可修改姓名、手机号、身份证号、所在地区、备注</li>
              <li><strong>成功：</strong>列表数据更新，Toast提示"保存成功"</li>
              <li><strong>失败：</strong>手机号重复提示"该手机号已注册"；身份证号格式错误提示"身份证号格式不正确"</li>
              <li><strong>边界条件：</strong>姓名和手机号为必填项</li>
            </ul>`
          },
          {
            title: '核心字段',
            noTableWrap: true,
            tables: [
              {
                title: '统计卡片字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['total_members', 'number', '是', '总会员数'],
                  ['new_this_month', 'number', '是', '本月新增会员数'],
                  ['silver_and_above', 'number', '是', '银卡及以上会员数'],
                  ['monthly_active_rate', 'number', '是', '月活跃率（%）']
                ]
              },
              {
                title: '筛选条件字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['member_level', 'enum', '否', '会员等级：全部/普通/银卡/金卡/钻石/充值年卡'],
                  ['search_keyword', 'string', '否', '搜索昵称/手机号'],
                  ['start_date', 'string', '否', '注册时间开始，格式YYYY-MM-DD'],
                  ['end_date', 'string', '否', '注册时间结束，格式YYYY-MM-DD']
                ]
              },
              {
                title: '会员列表表格字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['member_id', 'string', '是', '会员ID，如M20260001'],
                  ['nickname', 'string', '是', '会员昵称'],
                  ['avatar', 'string', '否', '头像URL或渐变背景色'],
                  ['phone', 'string', '是', '手机号（脱敏）'],
                  ['member_level', 'enum', '是', '会员等级：普通/银卡/金卡/钻石/充值年卡'],
                  ['growth_value', 'number', '是', '成长值'],
                  ['balance', 'number', '是', '钱包余额（元）'],
                  ['total_consumption', 'number', '是', '消费总额（元）'],
                  ['register_time', 'string', '是', '注册时间']
                ]
              },
              {
                title: '会员详情-基本信息字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['member_id', 'string', '是', '会员ID'],
                  ['register_time', 'string', '是', '注册时间'],
                  ['member_level', 'enum', '是', '会员等级'],
                  ['growth_value', 'number', '是', '成长值'],
                  ['current_points', 'number', '是', '当前积分'],
                  ['account_balance', 'number', '是', '账户余额（元）'],
                  ['total_consumption', 'number', '是', '累计消费（元）'],
                  ['ticket_count', 'number', '是', '购买门票数量'],
                  ['last_consume_date', 'string', '是', '最近消费日期']
                ]
              },
              {
                title: '会员详情-消费记录字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['order_id', 'string', '是', '订单号'],
                  ['show_name', 'string', '是', '演出名称'],
                  ['amount', 'number', '是', '金额（元）'],
                  ['order_status', 'enum', '是', '状态：已完成/已退款'],
                  ['order_time', 'string', '是', '时间']
                ]
              },
              {
                title: '会员详情-积分明细字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['points_type', 'enum', '是', '类型：签到/消费/兑换/评论'],
                  ['points_value', 'number', '是', '积分值（正数为获取，负数为消耗）'],
                  ['points_time', 'string', '是', '时间'],
                  ['points_desc', 'string', '是', '描述']
                ]
              },
              {
                title: '会员详情-成长值明细字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['growth_source', 'enum', '是', '来源：消费/充值/激活充值卡'],
                  ['growth_value', 'number', '是', '成长值'],
                  ['growth_time', 'string', '是', '时间'],
                  ['growth_desc', 'string', '是', '描述']
                ]
              },
              {
                title: '编辑会员弹窗字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['name', 'string', '是', '姓名'],
                  ['phone', 'string', '是', '手机号'],
                  ['id_card', 'string', '否', '身份证号'],
                  ['region', 'string', '否', '所在地区'],
                  ['remark', 'string', '否', '备注']
                ]
              }
            ]
          }
        ]
      },
      {
        title: '积分管理',
        sections: [
          {
            title: '功能描述',
            content: `<p><strong>核心功能：</strong>管理积分体系。展示3张统计卡片（总发放积分/总消耗积分/当前存量积分），积分规则配置分为三个二级标签（任务配置/使用规则/过期规则），积分明细列表支持筛选（全部类型/获取/消耗/过期）和搜索会员。</p>
            <p><strong>业务说明：</strong></p>
            <ul>
              <li><strong>前置条件：</strong>操作人需具有"积分管理"权限</li>
              <li><strong>功能实现逻辑：</strong>
                <ul>
                  <li>任务配置：设置每日签到、发表评论、分享演出、完成订单等任务的积分奖励值。发表评论和分享演出支持设置每日次数上限，超过上限不再获得积分</li>
                  <li>使用规则：积分抵扣比例固定为1积分=0.01元（不可修改，输入框只读）；可配置单笔最高抵扣比例、最低使用积分、适用范围、积分抽奖消耗</li>
                  <li>过期规则：积分有效期固定12个月，过期结算方式固定为"按获取月份逐月过期"，不可修改。设置到期前提醒天数</li>
                  <li>配置保存时间：任务配置/使用规则/过期规则三个Tab均展示最后一次保存配置的时间</li>
                  <li>积分明细：记录所有会员的积分变动，包括获取和消耗</li>
                </ul>
              </li>
              <li><strong>权限控制：</strong>查看需"积分查看"权限；编辑规则需"积分编辑"权限</li>
              <li><strong>数据约束：</strong>积分值必须为正整数；积分抵扣比例需在合理范围内</li>
              <li><strong>能力边界：</strong>不支持手动调整单个会员积分；不支持积分回滚</li>
            </ul>`
          },
          {
            title: '交互说明',
            content: `<p><strong>保存积分规则配置</strong></p>
            <ul>
              <li><strong>触发：</strong>在任务配置/使用规则/过期规则页面修改数值后，点击"保存配置"按钮</li>
              <li><strong>执行中：</strong>按钮loading，校验输入值合法性</li>
              <li><strong>成功：</strong>Toast提示"保存成功"，配置即时生效，保存时间更新</li>
              <li><strong>失败：</strong>Toast提示"保存失败"，非法输入项高亮提示</li>
              <li><strong>边界条件：</strong>点击"重置"恢复上次保存的数值</li>
            </ul>
            <p><strong>筛选查询积分明细</strong></p>
            <ul>
              <li><strong>触发：</strong>在筛选栏选择变动类型、输入搜索词、选择时间范围后点击"查询"按钮</li>
              <li><strong>执行中：</strong>按钮loading，表格数据刷新</li>
              <li><strong>成功：</strong>表格显示符合条件的积分明细</li>
              <li><strong>失败：</strong>Toast提示"查询失败"</li>
              <li><strong>边界条件：</strong>变动类型支持全部/获取/消耗/过期</li>
            </ul>`
          },
          {
            title: '核心字段',
            noTableWrap: true,
            tables: [
              {
                title: '积分统计卡片字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['total_issued_points', 'number', '是', '总发放积分'],
                  ['total_consumed_points', 'number', '是', '总消耗积分'],
                  ['current_stock_points', 'number', '是', '当前存量积分']
                ]
              },
              {
                title: '任务配置字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['daily_checkin_points', 'number', '是', '每日签到基础积分'],
                  ['continuous_checkin_bonus', 'number', '否', '连续签到加成积分（7天+额外奖励）'],
                  ['comment_points', 'number', '是', '发表评论积分（积分/条）'],
                  ['comment_daily_limit', 'number', '是', '评论积分每日上限（条）'],
                  ['share_points', 'number', '是', '分享演出积分（积分/次）'],
                  ['share_daily_limit', 'number', '是', '分享积分每日上限（次）'],
                  ['order_points_per_yuan', 'number', '是', '每消费1元获得积分']
                ]
              },
              {
                title: '使用规则字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['points_to_yuan_ratio', 'number', '是', '积分抵扣比例：固定1积分=0.01元（只读不可修改）'],
                  ['max_deduction_percent', 'number', '是', '单笔最高抵扣比例（%）'],
                  ['min_use_points', 'number', '是', '最低使用积分数'],
                  ['applicable_scope', 'array', '是', '适用范围：购买门票/购买商品/积分抽奖'],
                  ['lottery_cost_points', 'number', '是', '积分抽奖每次消耗积分数']
                ]
              },
              {
                title: '过期规则字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['points_validity', 'enum', '是', '积分有效期：固定12个月'],
                  ['expire_settlement_type', 'enum', '是', '过期结算方式：固定按获取月份逐月过期，不可修改'],
                  ['expire_remind_days', 'number', '是', '到期前提醒天数']
                ]
              },
              {
                title: '积分明细表格字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['member_id', 'string', '是', '会员ID'],
                  ['member_nickname', 'string', '是', '会员昵称'],
                  ['change_type', 'enum', '是', '变动类型：签到奖励/积分兑换/消费奖励/评论奖励/分享奖励/积分过期'],
                  ['points_value', 'number', '是', '积分值（正数为获取，负数为消耗）'],
                  ['change_time', 'string', '是', '变动时间'],
                  ['change_desc', 'string', '是', '变动描述']
                ]
              },
              {
                title: '积分明细筛选字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['change_type_filter', 'enum', '否', '变动类型：全部/获取/消耗/过期'],
                  ['search_keyword', 'string', '否', '搜索会员'],
                  ['start_date', 'string', '否', '时间范围开始'],
                  ['end_date', 'string', '否', '时间范围结束']
                ]
              }
            ]
          }
        ]
      },
      {
        title: '会员政策',
        sections: [
          {
            title: '功能描述',
            content: `<p><strong>核心功能：</strong>管理会员等级政策和成长值配置。等级配置以卡片形式展示5个等级（普通会员/银卡会员/金卡会员/钻石会员/充值年卡），每个卡片展示等级名称、成长值范围、购票折扣、权益列表，支持编辑和删除等级，支持新增等级。成长值配置包括消费成长值比例、充值成长值比例、充值成长值活动、推荐会员成长值。</p>
            <p><strong>业务说明：</strong></p>
            <ul>
              <li><strong>前置条件：</strong>操作人需具有"会员政策管理"权限</li>
              <li><strong>功能实现逻辑：</strong>
                <ul>
                  <li>等级配置：等级名称、成长值范围（下限-上限）、购票折扣、权益设置（基础权益/购票权益/服务权益/专属特权）</li>
                  <li>权益类型：积分加成倍数、每月优惠券、生日福利、优先购票、免费改签、专属选座区、专属客服、VIP入场通道、会员卡寄送、赠票额度、后台参观、年度答谢活动</li>
                  <li>成长值获取：消费、充值、推荐新用户注册均可获得成长值</li>
                  <li>成长值活动：可开启限时活动，活动期间充值获得额外成长值加成</li>
                  <li>配置保存时间：成长值配置区域展示最后一次保存配置的时间</li>
                </ul>
              </li>
              <li><strong>权限控制：</strong>查看需"会员查看"权限；编辑/新增/删除需"会员政策编辑"权限</li>
              <li><strong>数据约束：</strong>等级名称不可重复；成长值范围不可重叠；至少保留1个等级</li>
              <li><strong>能力边界：</strong>不支持删除最后一个等级；不支持批量修改等级配置</li>
            </ul>`
          },
          {
            title: '交互说明',
            content: `<p><strong>编辑等级</strong></p>
            <ul>
              <li><strong>触发：</strong>点击等级卡片右上角圆形"编辑"按钮（铅笔图标，白色半透明背景）</li>
              <li><strong>执行中：</strong>弹出编辑弹窗，可修改等级名称、成长值下限/上限、购票折扣、权益设置（积分加成倍数/每月优惠券/生日福利/优先购票/免费改签/专属选座区/专属客服/VIP入场通道/会员卡申请/后台参观/年度答谢活动）、颜色选择</li>
              <li><strong>成功：</strong>列表数据更新，已关联会员的权益实时生效</li>
              <li><strong>失败：</strong>Toast提示"保存失败"</li>
              <li><strong>边界条件：</strong>修改成长值范围后，已满足新条件的会员不会自动升级</li>
            </ul>
            <p><strong>新增等级</strong></p>
            <ul>
              <li><strong>触发：</strong>点击等级卡片列表末尾的"新增等级"虚线框卡片（白底、2px虚线边框、加号图标）</li>
              <li><strong>执行中：</strong>弹窗填写等级配置，含实时预览卡片，字段与编辑相同</li>
              <li><strong>成功：</strong>列表新增等级记录</li>
              <li><strong>失败：</strong>名称重复提示"该等级名称已存在"</li>
              <li><strong>边界条件：</strong>新增等级默认颜色为灰色</li>
            </ul>
            <p><strong>删除等级</strong></p>
            <ul>
              <li><strong>触发：</strong>点击等级卡片右上角圆形"删除"按钮（垃圾桶图标，白色半透明背景，hover变红色）</li>
              <li><strong>执行中：</strong>弹出确认弹窗</li>
              <li><strong>成功：</strong>等级卡片移除</li>
              <li><strong>失败：</strong>Toast提示"删除失败"</li>
              <li><strong>边界条件：</strong>最后一个等级不可删除；已有会员的等级不可删除</li>
            </ul>
            <p><strong>保存成长值配置</strong></p>
            <ul>
              <li><strong>触发：</strong>修改成长值配置后点击"保存成长值配置"按钮</li>
              <li><strong>执行中：</strong>校验输入值</li>
              <li><strong>成功：</strong>Toast提示"保存成功"，保存时间更新</li>
              <li><strong>失败：</strong>Toast提示"保存失败"</li>
              <li><strong>边界条件：</strong>充值成长值活动需开启开关后才可配置活动参数</li>
            </ul>`
          },
          {
            title: '核心字段',
            noTableWrap: true,
            tables: [
              {
                title: '等级配置字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['level_id', 'string', '是', '等级ID'],
                  ['level_name', 'string', '是', '等级名称'],
                  ['growth_min', 'number', '是', '成长值下限'],
                  ['growth_max', 'number', '否', '成长值上限，不填则无上限'],
                  ['ticket_discount', 'number', '是', '购票折扣，如9.5表示9.5折'],
                  ['points_multiplier', 'number', '是', '积分加成倍数'],
                  ['monthly_coupon_enabled', 'boolean', '否', '是否启用每月优惠券'],
                  ['monthly_coupon_count', 'number', '否', '每月优惠券张数'],
                  ['birthday_bonus_enabled', 'boolean', '否', '是否启用生日福利'],
                  ['birthday_bonus_points', 'number', '否', '生日福利积分数'],
                  ['priority_purchase_enabled', 'boolean', '否', '是否启用优先购票'],
                  ['priority_purchase_hours', 'number', '否', '优先购票提前小时数'],
                  ['free_change_enabled', 'boolean', '否', '是否启用免费改签'],
                  ['free_change_count', 'number', '否', '免费改签次数/月'],
                  ['exclusive_seat_enabled', 'boolean', '否', '是否启用专属选座区'],
                  ['vip_service_enabled', 'boolean', '否', '是否启用专属客服'],
                  ['vip_channel_enabled', 'boolean', '否', '是否启用VIP入场通道'],
                  ['card_delivery_enabled', 'boolean', '否', '是否启用会员卡寄送'],
                  ['gift_ticket_enabled', 'boolean', '否', '是否启用赠票额度'],
                  ['gift_ticket_count', 'number', '否', '赠票额度张/月'],
                  ['backstage_visit_enabled', 'boolean', '否', '是否启用后台参观'],
                  ['annual_event_enabled', 'boolean', '否', '是否启用年度答谢活动'],
                  ['level_color', 'string', '是', '等级主题色，10种可选：灰#6b7280/蓝#3B82F6/紫#8B5CF6/粉#EC4899/金#D4A853/绿#10B981/橙#F59E0B/红#EF4444/青#06B6D4/橘#F97316']
                ]
              },
              {
                title: '成长值配置字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['referral_growth_value', 'number', '是', '每推荐1人获得成长值'],
                  ['consume_growth_ratio', 'number', '是', '消费成长值比例：每消费1元=多少成长值'],
                  ['recharge_growth_ratio', 'number', '是', '充值成长值比例：每充值1元=多少成长值'],
                  ['activity_enabled', 'boolean', '否', '是否开启充值成长值活动'],
                  ['activity_name', 'string', '否', '活动名称'],
                  ['activity_start_time', 'string', '否', '活动开始时间'],
                  ['activity_end_time', 'string', '否', '活动结束时间'],
                  ['activity_recharge_ratio', 'number', '否', '活动期间充值成长值比例']
                ]
              }
            ]
          }
        ]
      },
      {
        title: '会员钱包',
        sections: [
          {
            title: '功能描述',
            content: `<p><strong>核心功能：</strong>管理会员钱包余额和流水。展示4张统计卡片（钱包总余额/今日充值/今日消费/有余额会员），支持多维度筛选（全部流水类型/全部会员等级/搜索昵称手机号/时间范围），表格展示会员钱包信息（会员信息/手机号/会员等级/当前余额/累计充值/累计消费/最近变动），支持查看流水明细。</p>
            <p><strong>业务说明：</strong></p>
            <ul>
              <li><strong>前置条件：</strong>操作人需具有"会员钱包查看"权限</li>
              <li><strong>功能实现逻辑：</strong>
                <ul>
                  <li>流水类型：充值、消费、退款、转账、赠送</li>
                  <li>钱包统计：总余额、今日充值、今日消费、有余额会员数</li>
                  <li>流水明细：展示每笔变动的类型、金额、时间、关联订单</li>
                </ul>
              </li>
              <li><strong>权限控制：</strong>查看需"会员钱包查看"权限</li>
              <li><strong>数据约束：</strong>钱包余额不可为负；消费记录不可删除</li>
              <li><strong>能力边界：</strong>不支持手动充值；不支持修改流水记录；不支持退款操作</li>
            </ul>`
          },
          {
            title: '交互说明',
            content: `<p><strong>筛选查询钱包记录</strong></p>
            <ul>
              <li><strong>触发：</strong>在筛选栏选择流水类型、会员等级、输入搜索词、选择时间范围后点击"查询"按钮</li>
              <li><strong>执行中：</strong>按钮loading，表格数据刷新</li>
              <li><strong>成功：</strong>表格显示符合条件的钱包记录</li>
              <li><strong>失败：</strong>Toast提示"查询失败"</li>
              <li><strong>边界条件：</strong>点击"重置"清空所有筛选条件；点击"导出Excel"导出当前结果</li>
            </ul>
            <p><strong>查看流水明细</strong></p>
            <ul>
              <li><strong>触发：</strong>点击操作列"流水明细"按钮（列表图标）</li>
              <li><strong>执行中：</strong>弹出流水明细弹窗</li>
              <li><strong>成功：</strong>展示该会员的完整流水记录</li>
              <li><strong>失败：</strong>Toast提示"加载失败"</li>
              <li><strong>边界条件：</strong>无</li>
            </ul>`
          },
          {
            title: '核心字段',
            noTableWrap: true,
            tables: [
              {
                title: '钱包统计卡片字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['total_wallet_balance', 'number', '是', '钱包总余额（元）'],
                  ['today_recharge', 'number', '是', '今日充值金额（元）'],
                  ['today_consume', 'number', '是', '今日消费金额（元）'],
                  ['members_with_balance', 'number', '是', '有余额会员数']
                ]
              },
              {
                title: '筛选条件字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['flow_type', 'enum', '否', '流水类型：全部/充值/消费/退款/转账/赠送'],
                  ['member_level', 'enum', '否', '会员等级：全部/普通/银卡/金卡/钻石/充值年卡'],
                  ['search_keyword', 'string', '否', '搜索昵称/手机号'],
                  ['start_date', 'string', '否', '时间范围开始'],
                  ['end_date', 'string', '否', '时间范围结束']
                ]
              },
              {
                title: '钱包列表表格字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['member_id', 'string', '是', '会员ID'],
                  ['nickname', 'string', '是', '会员昵称'],
                  ['phone', 'string', '是', '手机号（脱敏）'],
                  ['member_level', 'enum', '是', '会员等级'],
                  ['current_balance', 'number', '是', '当前余额（元）'],
                  ['total_recharge', 'number', '是', '累计充值（元）'],
                  ['total_consume', 'number', '是', '累计消费（元）'],
                  ['latest_change', 'string', '是', '最近变动描述（时间+金额）']
                ]
              },
              {
                title: '流水明细字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['flow_id', 'string', '是', '流水ID'],
                  ['member_id', 'string', '是', '会员ID'],
                  ['flow_type', 'enum', '是', '流水类型：充值/消费/退款/转账/赠送'],
                  ['amount', 'number', '是', '变动金额（元）'],
                  ['balance_after', 'number', '是', '变动后余额（元）'],
                  ['flow_time', 'string', '是', '变动时间'],
                  ['flow_desc', 'string', '是', '变动描述'],
                  ['related_order_id', 'string', '否', '关联订单ID']
                ]
              }
            ]
          }
        ]
      },
      {
        title: '会员卡管理',
        sections: [
          {
            title: '功能描述',
            content: `<p><strong>核心功能：</strong>管理实体会员卡的申请、制卡、发货和注销。展示3张统计卡片（已发放会员卡/待审核申请/待发货），支持筛选（全部状态/全部卡类型/搜索会员），表格展示会员卡申请记录（会员信息/申请时间/卡类型/会员ID/绑定IC卡/收货地址/状态/操作），支持查看详情、制卡、填写物流、锁卡、注销等操作。</p>
            <p><strong>业务说明：</strong></p>
            <ul>
              <li><strong>前置条件：</strong>操作人需具有"会员卡管理"权限</li>
              <li><strong>功能实现逻辑：</strong>
                <ul>
                  <li>卡类型：金卡、钻石卡、充值年卡</li>
                  <li>状态流转：待发货→已发货；已发货可锁卡/注销</li>
                  <li>制卡：通过读卡器读取IC卡UID并绑定到会员</li>
                  <li>物流：填写快递公司和快递单号，确认发货</li>
                </ul>
              </li>
              <li><strong>权限控制：</strong>查看需"会员卡查看"权限；制卡/发货/锁卡/注销需"会员卡管理"权限</li>
              <li><strong>数据约束：</strong>一张IC卡只能绑定一个会员；已注销的会员卡不可恢复</li>
              <li><strong>能力边界：</strong>不支持批量制卡；不支持物流轨迹查询</li>
            </ul>`
          },
          {
            title: '交互说明',
            content: `<p><strong>制卡</strong></p>
            <ul>
              <li><strong>触发：</strong>点击操作列"制卡"按钮（芯片图标）</li>
              <li><strong>执行中：</strong>弹出制卡弹窗，提示将空白IC卡放置在读卡器上，系统自动读取UID</li>
              <li><strong>成功：</strong>读取到UID并绑定到会员，状态更新为"已绑定"</li>
              <li><strong>失败：</strong>读卡失败提示"请重新放置IC卡"</li>
              <li><strong>边界条件：</strong>已绑定的会员需先解绑才能重新制卡</li>
            </ul>
            <p><strong>填写物流</strong></p>
            <ul>
              <li><strong>触发：</strong>点击操作列"物流"按钮（卡车图标）</li>
              <li><strong>执行中：</strong>弹出物流信息弹窗，选择快递公司、输入快递单号、填写备注</li>
              <li><strong>成功：</strong>状态变为"已发货"</li>
              <li><strong>失败：</strong>快递公司或单号为空时提示"请填写完整信息"</li>
              <li><strong>边界条件：</strong>选择"其他"快递公司时需手动输入快递公司名称</li>
            </ul>
            <p><strong>锁卡</strong></p>
            <ul>
              <li><strong>触发：</strong>点击操作列"锁卡"按钮（锁图标）</li>
              <li><strong>执行中：</strong>弹出确认弹窗</li>
              <li><strong>成功：</strong>状态变为"已锁定"</li>
              <li><strong>失败：</strong>Toast提示"操作失败"</li>
              <li><strong>边界条件：</strong>仅已发货状态可锁卡</li>
            </ul>
            <p><strong>注销会员卡</strong></p>
            <ul>
              <li><strong>触发：</strong>点击操作列"注销"按钮（禁止图标）</li>
              <li><strong>执行中：</strong>弹出二次确认"注销后不可恢复，确认注销？"</li>
              <li><strong>成功：</strong>状态变为"已注销"，操作按钮仅保留"详情"</li>
              <li><strong>失败：</strong>Toast提示"注销失败"</li>
              <li><strong>边界条件：</strong>已注销的会员卡不可再次操作</li>
            </ul>
            <p><strong>查看会员卡详情</strong></p>
            <ul>
              <li><strong>触发：</strong>点击操作列"详情"按钮</li>
              <li><strong>执行中：</strong>弹出会员卡详情弹窗，展示会员姓名、手机号、所在地区、详细地址、会员卡号、IC卡UID</li>
              <li><strong>成功：</strong>展示完整信息</li>
              <li><strong>失败：</strong>Toast提示"加载失败"</li>
              <li><strong>边界条件：</strong>未制卡的会员不显示制卡按钮</li>
            </ul>`
          },
          {
            title: '核心字段',
            noTableWrap: true,
            tables: [
              {
                title: '会员卡统计卡片字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['issued_card_count', 'number', '是', '已发放会员卡数量'],
                  ['pending_shipment_count', 'number', '是', '待发货数量'],
                  ['shipped_count', 'number', '是', '已发货数量']
                ]
              },
              {
                title: '筛选条件字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['card_status', 'enum', '否', '状态：全部/待发货/已发货/已锁定/已注销'],
                  ['card_type', 'enum', '否', '卡类型：全部/金卡/钻石卡/充值年卡'],
                  ['search_keyword', 'string', '否', '搜索会员']
                ]
              },
              {
                title: '会员卡列表表格字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['member_id', 'string', '是', '会员ID'],
                  ['nickname', 'string', '是', '会员昵称'],
                  ['apply_time', 'string', '是', '申请时间'],
                  ['card_type', 'enum', '是', '卡类型：金卡/钻石卡/充值年卡'],
                  ['ic_card_bound', 'boolean', '是', '是否已绑定IC卡'],
                  ['shipping_address', 'string', '是', '收货地址'],
                  ['card_status', 'enum', '是', '状态：待发货/已发货/已锁定/已注销']
                ]
              },
              {
                title: '物流信息字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['member_name', 'string', '是', '会员姓名'],
                  ['logistics_company', 'enum', '是', '快递公司：顺丰/京东/EMS/圆通/中通/申通/韵达/其他'],
                  ['company_other', 'string', '否', '其他快递公司名称'],
                  ['tracking_no', 'string', '是', '快递单号'],
                  ['remark', 'string', '否', '备注']
                ]
              },
              {
                title: '会员卡详情字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['member_name', 'string', '是', '会员姓名'],
                  ['phone', 'string', '是', '手机号'],
                  ['region', 'string', '是', '所在地区'],
                  ['detail_address', 'string', '是', '详细地址'],
                  ['card_no', 'string', '是', '会员卡号'],
                  ['ic_card_uid', 'string', '否', 'IC卡UID']
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  'pc-admin/marketing-center.html': {
    title: '营销中心',
    subtitle: '充值卡、票品折扣、优惠券、抽奖管理、演出券包等营销活动管理',
    sections: [
      {
        title: '充值卡',
        sections: [
          {
            title: '功能描述',
            content: `<p><strong>核心功能：</strong>管理充值卡批次的创建、制作、发放、冻结/解冻和详情查看。页面展示3张统计卡片（充值卡批次/总卡数量/充值总金额），支持按状态、面值、时间范围筛选，表格展示批次列表（批次号/名称/卡数量/面值参数/制作方式/状态/创建时间/操作），支持新建批次、查看详情、确认发放、制卡（导出二维码或IC卡绑定）、冻结/解冻等操作。批次详情弹窗包含充值卡明细和使用情况两个标签页。</p>
            <p><strong>业务说明：</strong></p>
            <ul>
              <li><strong>前置条件：</strong>操作人需具有"充值卡管理"权限；IC卡绑定需连接读卡器硬件</li>
              <li><strong>功能实现逻辑：</strong>
                <ul>
                  <li>批次生成：输入批次名称、充值金额、赠送积分、成长值、生成数量，系统自动生成批次号（B+年月日+序号）和卡号（批次号+4位序号）</li>
                  <li>制作方式：二维码实体卡（导出卡号密码和二维码图片用于印刷）或IC卡（读取IC卡UID并绑定到卡号）</li>
                  <li>状态流转：待制作→已制作→已发放，已发放可冻结→已冻结，已冻结可解冻→已发放</li>
                  <li>充值卡明细：展示批次下每张卡的卡号、密码、状态（未激活/已激活）、激活时间、激活会员、充值金额</li>
                  <li>使用情况统计：已激活数量、未激活数量、已充值金额、已赠送积分</li>
                </ul>
              </li>
              <li><strong>权限控制：</strong>查看需"充值卡查看"权限；新建批次/制卡/发放需"充值卡编辑"权限；冻结/解冻需"充值卡管理"权限</li>
              <li><strong>数据约束：</strong>单次最多生成500张；批次名称不可重复；已制作批次才可发放；批次无删除功能</li>
              <li><strong>能力边界：</strong>不支持批量删除批次；不支持修改已生成批次的面值参数；IC卡绑定需硬件支持；冻结操作在任何状态下均可执行（已发放/已制作/待制作）</li>
            </ul>`
          },
          {
            title: '交互说明',
            content: `<p><strong>新建批次</strong></p>
            <ul>
              <li><strong>触发：</strong>点击"新建批次"按钮</li>
              <li><strong>执行中：</strong>Step1 弹出"选择制卡方式"弹窗，提供两个选项：二维码充值卡（生成卡号密码二维码，用户扫码充值）或IC卡充值卡（生成卡号预留UID绑定，需后续刷IC卡完成绑定）；Step2 选择后进入"新建充值卡批次"弹窗，填写批次名称、充值金额、赠送积分、成长值、生成数量</li>
              <li><strong>成功：</strong>弹窗关闭，列表新增记录，状态为"待制作"，Toast提示"批次创建成功，共生成N张充值卡"</li>
              <li><strong>失败：</strong>名称重复提示"该批次名称已存在"；数量超过500提示"单次最多生成500张"</li>
              <li><strong>边界条件：</strong>生成数量需大于0；充值金额需大于0</li>
            </ul>
            <p><strong>查看详情</strong></p>
            <ul>
              <li><strong>触发：</strong>点击操作列"详情"按钮</li>
              <li><strong>执行中：</strong>弹出详情弹窗，顶部展示批次概览信息，下方有"充值卡明细"和"使用情况"两个标签页</li>
              <li><strong>成功：</strong>展示完整信息和记录</li>
              <li><strong>失败：</strong>Toast提示"加载失败"</li>
              <li><strong>边界条件：</strong>无</li>
            </ul>
            <p><strong>确认发放</strong></p>
            <ul>
              <li><strong>触发：</strong>点击已制作批次操作列"发放"按钮</li>
              <li><strong>执行中：</strong>状态直接变更为"已发放"</li>
              <li><strong>成功：</strong>批次状态变为"已发放"，操作按钮变为"冻结"</li>
              <li><strong>失败：</strong>Toast提示"发放失败"</li>
              <li><strong>边界条件：</strong>仅"已制作"状态可发放</li>
            </ul>
            <p><strong>制卡（导出二维码）</strong></p>
            <ul>
              <li><strong>触发：</strong>点击操作列"制卡"按钮（二维码批次）</li>
              <li><strong>执行中：</strong>弹出导出弹窗，选择导出内容（卡号密码Excel/二维码PNG/密码加密）</li>
              <li><strong>成功：</strong>文件下载，Toast提示"导出成功"</li>
              <li><strong>失败：</strong>Toast提示"导出失败"</li>
              <li><strong>边界条件：</strong>仅待制作/已制作/已发放状态可导出</li>
            </ul>
            <p><strong>IC卡绑定</strong></p>
            <ul>
              <li><strong>触发：</strong>点击IC卡批次操作列"制卡"按钮</li>
              <li><strong>执行中：</strong>弹出IC卡绑定弹窗，展示当前绑定进度，等待读卡器读取UID，读取成功后点击"绑定并下一张"</li>
              <li><strong>成功：</strong>绑定完成，自动切换到下一张；全部完成后Toast提示"所有IC卡绑定完成"</li>
              <li><strong>失败：</strong>读卡失败提示"请重新放置IC卡"</li>
              <li><strong>边界条件：</strong>需连接读卡器硬件；支持"读取成功自动下一张"开关</li>
            </ul>
            <p><strong>冻结/解冻</strong></p>
            <ul>
              <li><strong>触发：</strong>点击"冻结"或"解冻"按钮</li>
              <li><strong>执行中：</strong>状态直接切换</li>
              <li><strong>成功：</strong>状态变更，按钮文字切换</li>
              <li><strong>失败：</strong>Toast提示"操作失败"</li>
              <li><strong>边界条件：</strong>冻结后该批次下所有充值卡不可使用</li>
            </ul>`
          },
          {
            title: '核心字段',
            noTableWrap: true,
            tables: [
              {
                title: '统计卡片字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['batch_count', 'number', '是', '充值卡批次数量（批）'],
                  ['total_card_count', 'number', '是', '总卡数量（张）'],
                  ['total_recharge_amount', 'number', '是', '充值总金额（元）'],
                  ['activation_rate', 'number', '是', '激活率（%）']
                ]
              },
              {
                title: '筛选条件字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['filter_status', 'enum', '否', '状态筛选：全部状态/待制作/已制作/已发放/已冻结'],
                  ['filter_face_value', 'enum', '否', '面值筛选：全部面值/100元/200元/500元/1000元'],
                  ['filter_time_range', 'enum', '否', '时间筛选：最近7天/最近30天/最近90天/全部时间']
                ]
              },
              {
                title: '充值卡批次列表字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['batch_no', 'string', '是', '批次号，如B20260410001'],
                  ['batch_name', 'string', '是', '批次名称'],
                  ['card_count', 'number', '是', '卡数量（张）'],
                  ['recharge_amount', 'number', '是', '充值金额（元）'],
                  ['bonus_points', 'number', '是', '赠送积分'],
                  ['growth_value', 'number', '否', '成长值'],
                  ['make_type', 'enum', '是', '制作方式：二维码/IC卡/未制卡'],
                  ['status', 'enum', '是', '状态：待制作/已制作/已发放/已冻结'],
                  ['created_at', 'string', '是', '创建时间']
                ]
              },
              {
                title: '新建批次弹窗字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['batch_name', 'string', '是', '批次名称'],
                  ['recharge_amount', 'number', '是', '充值金额（元）'],
                  ['bonus_points', 'number', '是', '赠送积分'],
                  ['growth_value', 'number', '否', '成长值'],
                  ['generate_count', 'number', '是', '生成数量（张），单次最多500']
                ]
              },
              {
                title: '批次详情-充值卡明细字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['seq_no', 'number', '是', '序号'],
                  ['card_no', 'string', '是', '卡号'],
                  ['password', 'string', '是', '密码'],
                  ['card_status', 'enum', '是', '状态：未激活/已激活'],
                  ['activated_at', 'string', '否', '激活时间'],
                  ['member_name', 'string', '否', '激活会员姓名'],
                  ['member_phone', 'string', '否', '激活会员手机号'],
                  ['recharge_amount', 'number', '是', '充值金额（元）']
                ]
              },
              {
                title: '批次详情-使用情况字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['activated_count', 'number', '是', '已激活数量（张）'],
                  ['unactivated_count', 'number', '是', '未激活数量（张）'],
                  ['total_recharged', 'number', '是', '已充值金额（元）'],
                  ['total_points_given', 'number', '是', '已赠送积分']
                ]
              }
            ]
          }
        ]
      },
      {
        title: '票品折扣',
        sections: [
          {
            title: '功能描述',
            content: `<p><strong>核心功能：</strong>管理票品折扣活动的创建、编辑、停止和数据查看。页面展示3张统计卡片（进行中活动/累计优惠金额/受益用户），支持按状态、类型、关联演出筛选，表格展示折扣活动列表（活动名称/关联演出/折扣类型/优惠值/有效期/使用次数/状态/操作），支持新建折扣活动（百分比折扣、满减优惠或早鸟票）。活动数据弹窗展示总使用次数、累计优惠金额、带动订单金额、转化率及使用趋势图表。</p>
            <p><strong>业务说明：</strong></p>
            <ul>
              <li><strong>前置条件：</strong>操作人需具有"折扣活动管理"权限；关联演出需已创建</li>
              <li><strong>功能实现逻辑：</strong>
                <ul>
                  <li>折扣类型：百分比折扣（如8折，可设置最大优惠金额上限）、满减优惠（满X减Y，门槛为0时表示立减）或早鸟票（设置折扣比例/最大优惠金额/持续天数，开票后N天内有效，不设活动时间）</li>
                  <li>关联范围：必须选择指定演出（不可选"全部演出"），指定演出可选择全部场次或部分场次（多选）</li>
                  <li>售票渠道：新建和编辑时可选择适用的售票渠道（小程序/窗口），至少选择一个，默认全选；用户仅在选中的渠道购票时方可享受该折扣</li>
                  <li>状态流转：未开始→进行中→已结束（自动），进行中可手动停止→已停止</li>
                  <li>数据统计：总使用次数、累计优惠金额、带动订单金额、转化率、使用趋势</li>
                </ul>
              </li>
              <li><strong>权限控制：</strong>查看需"折扣活动查看"权限；新增/编辑需"折扣活动编辑"权限；停止/复制需"折扣活动管理"权限</li>
              <li><strong>数据约束：</strong>活动名称不可重复；已结束活动不可编辑；进行中的活动部分字段只读；同一演出同一时段不可有重叠的折扣活动</li>
              <li><strong>能力边界：</strong>不支持与优惠券/满减活动叠加使用；不支持批量创建</li>
            </ul>`
          },
          {
            title: '交互说明',
            content: `<p><strong>新建折扣活动</strong></p>
            <ul>
              <li><strong>触发：</strong>点击"新建折扣活动"按钮</li>
              <li><strong>执行中：</strong>弹出新建弹窗，填写活动名称、关联演出（下拉选择，必须选择具体演出，选演出后加载场次多选）、折扣类型（百分比折扣/满减优惠/早鸟票，切换显示不同字段）、折扣比例/满减门槛和减免金额/早鸟票持续天数、最大优惠金额、开始/结束时间（早鸟票类型不显示活动时间）、活动说明、售票渠道（复选框：小程序/窗口，默认全选）</li>
            <li><strong>成功：</strong>弹窗关闭，列表新增记录，Toast提示"折扣活动已创建"</li>
            <li><strong>失败：</strong>名称重复提示"该活动名称已存在"；时间重叠提示"该时段已有折扣活动"；未选渠道提示"请至少选择一个售票渠道"</li>
            <li><strong>边界条件：</strong>开始时间不可早于当前时间；折扣比例范围1-99；满减门槛需大于等于0；至少选择一个售票渠道；早鸟票类型不设活动时间，以开票后持续天数计算有效期</li>
            </ul>
            <p><strong>编辑折扣活动</strong></p>
            <ul>
              <li><strong>触发：</strong>点击进行中活动操作列"编辑"按钮</li>
              <li><strong>执行中：</strong>弹出编辑弹窗，回填数据，折扣类型和关联演出字段只读</li>
              <li><strong>成功：</strong>列表数据更新，Toast提示"折扣活动已保存"</li>
              <li><strong>失败：</strong>Toast提示"保存失败"</li>
              <li><strong>边界条件：</strong>已结束/已停止活动不可编辑</li>
            </ul>
            <p><strong>停止折扣活动</strong></p>
            <ul>
              <li><strong>触发：</strong>点击"停止"按钮</li>
              <li><strong>执行中：</strong>弹出确认弹窗"确定要停止该折扣活动吗？停止后用户将无法继续使用"</li>
              <li><strong>成功：</strong>状态切换为"已停止"</li>
              <li><strong>失败：</strong>Toast提示"操作失败"</li>
              <li><strong>边界条件：</strong>已结束活动不可停止</li>
            </ul>
            <p><strong>复制折扣活动</strong></p>
            <ul>
              <li><strong>触发：</strong>点击已结束活动操作列"复制"按钮</li>
              <li><strong>执行中：</strong>弹出新建弹窗，名称自动添加"(副本)"，其他字段回填原活动数据</li>
              <li><strong>成功：</strong>弹窗关闭，Toast提示"折扣活动已复制，请修改后保存"</li>
              <li><strong>失败：</strong>Toast提示"复制失败"</li>
              <li><strong>边界条件：</strong>无</li>
            </ul>
            <p><strong>查看活动数据</strong></p>
            <ul>
              <li><strong>触发：</strong>点击操作列"数据"按钮</li>
              <li><strong>执行中：</strong>弹出数据弹窗，展示4张统计卡片、使用趋势折线图、最近使用记录表格</li>
              <li><strong>成功：</strong>展示完整数据</li>
              <li><strong>失败：</strong>Toast提示"加载失败"</li>
              <li><strong>边界条件：</strong>无</li>
            </ul>`
          },
          {
            title: '核心字段',
            noTableWrap: true,
            tables: [
              {
                title: '统计卡片字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['active_activity_count', 'number', '是', '进行中活动数量（个）'],
                  ['total_discount_amount', 'number', '是', '累计优惠金额（元）'],
                  ['benefited_user_count', 'number', '是', '受益用户数量（人）']
                ]
              },
              {
                title: '筛选条件字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['filter_status', 'enum', '否', '状态筛选：全部状态/进行中/已结束/未开始'],
                  ['filter_type', 'enum', '否', '类型筛选：全部类型/满减/折扣/早鸟票']
                ]
              },
              {
                title: '关联演出筛选字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['filter_show', 'enum', '否', '关联演出筛选：全部演出/具体演出名称']
                ]
              },
              {
                title: '折扣活动列表字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['activity_name', 'string', '是', '活动名称'],
                  ['related_show', 'string', '是', '关联演出名称'],
                  ['related_session', 'string', '否', '关联场次，空表示全部场次'],
                  ['discount_type', 'enum', '是', '折扣类型：折扣/满减/早鸟票'],
                  ['discount_value', 'string', '是', '优惠值，如"8折"、"满300减50"或"8折/7天"'],
                  ['valid_start', 'string', '否', '有效期开始时间，早鸟票类型为空'],
                  ['valid_end', 'string', '否', '有效期结束时间，早鸟票类型为空'],
                  ['use_count', 'number', '是', '使用次数'],
                  ['status', 'enum', '是', '状态：进行中/已结束/未开始/已停止']
                ]
              },
              {
                title: '新建折扣活动弹窗字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['activity_name', 'string', '是', '活动名称'],
                  ['related_show', 'string', '是', '关联演出，必须选择具体演出'],
                  ['related_session', 'array', '否', '关联场次ID列表，空表示全部场次'],
                  ['discount_type', 'enum', '是', '折扣类型：percent/reduce/earlybird'],
                  ['discount_percent', 'number', '否', '折扣比例（折），discount_type=percent或earlybird时必填'],
                  ['max_discount_amount', 'number', '否', '最大优惠金额（元），不填则不限制'],
                  ['discount_threshold', 'number', '否', '满减门槛（元），discount_type=reduce时必填'],
                  ['discount_reduce_amount', 'number', '否', '减免金额（元），discount_type=reduce时必填'],
                  ['earlybird_days', 'number', '否', '早鸟持续天数，discount_type=earlybird时必填'],
                  ['discount_channel', 'array', '是', '售票渠道：miniapp（小程序）/window（窗口），可多选'],
                  ['start_time', 'string', '否', '开始时间，discount_type=earlybird时为空'],
                  ['end_time', 'string', '否', '结束时间，discount_type=earlybird时为空'],
                  ['description', 'string', '否', '活动说明']
                ]
              },
              {
                title: '活动数据字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['total_use_count', 'number', '是', '总使用次数'],
                  ['total_save_amount', 'number', '是', '累计优惠金额（元）'],
                  ['total_order_amount', 'number', '是', '带动订单金额（元）'],
                  ['conversion_rate', 'number', '是', '转化率（%）']
                ]
              }
            ]
          }
        ]
      },
      {
        title: '优惠券',
        sections: [
          {
            title: '功能描述',
            content: `<p><strong>核心功能：</strong>管理优惠券的创建、编辑、停用、二维码领券和数据查看。页面展示3张统计卡片（已发放优惠券/已使用/核销总金额），支持按类型、状态筛选，表格展示优惠券列表（券名称/类型/面值或折扣/使用条件/适用范围/已发放已使用/有效期/状态/操作），支持新建优惠券（现金券固定金额减免或折扣券按比例折扣），支持按演出-场次层级指定适用范围，支持设置与会员折扣/票品折扣的叠加规则。编辑弹窗根据优惠券状态（未开始/进行中/已过期/已停用）控制可编辑字段范围。</p>
            <p><strong>业务说明：</strong></p>
            <ul>
              <li><strong>前置条件：</strong>操作人需具有"优惠券管理"权限</li>
              <li><strong>功能实现逻辑：</strong>
                <ul>
                  <li>券类型：现金券（设置减免金额，如满200减50）或折扣券（设置折扣比例，如8折即减免20%，范围1-99折）；两种类型均可独立设置消费门槛（满X元可用），0或不填表示无门槛</li>
                  <li>适用范围：全部演出可用，或指定演出/场次；选择指定演出后，以演出为层级展示该演出下的所有场次，每个演出独立勾选场次，不勾选任何场次则该演出下全部场次可用</li>
                  <li>叠加设置：独立开关控制是否可与会员折扣、票品折扣叠加使用</li>
                  <li>有效期模式：固定日期（设置生效时间和失效时间）或领取后N天（用户领取后N天内有效）</li>
                  <li>状态流转：未开始→进行中→已过期（自动），进行中可手动停用→已停用</li>
                  <li>编辑规则：未开始状态所有字段可编辑；进行中状态仅有效期和使用说明可编辑（核心参数灰显不可修改）；已过期/已停用状态仅可查看，不可编辑，不可复制</li>
                  <li>发放与使用：表格展示已发放数量和已使用数量，带进度条展示使用率；列表操作栏提供编辑、数据、二维码、停用按钮（已过期仅保留查看和数据）</li>
                  <li>数据查看：数据弹窗展示总发放量/已使用/使用率/未使用/核销总金额/平均优惠金额等统计卡片，下方为领取与使用明细表格（含领取时间/使用状态/订单号/订单金额/优惠金额/使用时间），支持按用户姓名/手机号搜索、按使用状态筛选，支持分页</li>
                  <li>二维码：每行操作栏提供"二维码"按钮，点击弹出微信小程序二维码弹窗，仅支持下载二维码，不支持自定义跳转页面，不提供网址链接</li>
                </ul>
              </li>
              <li><strong>权限控制：</strong>查看需"优惠券查看"权限；新增/编辑需"优惠券编辑"权限；停用需"优惠券管理"权限</li>
              <li><strong>数据约束：</strong>券名称不可重复；已过期/已停用优惠券不可编辑；发放数量需大于0；折扣比例范围为1-99的整数；消费门槛为0表示无门槛</li>
              <li><strong>能力边界：</strong>不支持批量创建；不支持发放记录导出；不支持与折扣活动叠加使用（由叠加设置开关控制）；二维码仅支持微信小程序，不支持支付宝等其他渠道</li>
            </ul>`
          },
          {
            title: '交互说明',
            content: `<p><strong>新建优惠券</strong></p>
            <ul>
              <li><strong>触发：</strong>点击"新建优惠券"按钮（右上角，蓝色主按钮，带加号图标）</li>
              <li><strong>执行中：</strong>弹出 modal-coupon-new 弹窗，填写券名称、券类型（下拉选择：现金券/折扣券，切换后下方显示减免金额或折扣比例输入框）、消费门槛（满X元可用，0表示无门槛）、发放数量；适用范围区域选择全部演出可用或指定演出/场次（选择后展示演出多选标签，每个演出下展开场次复选框）；叠加设置区域两个独立开关（会员折扣/票品折扣）；有效期模式（固定日期/领取后N天），固定日期模式下显示生效/失效时间输入框，领取后N天模式下显示有效天数输入框；使用说明</li>
              <li><strong>成功：</strong>弹窗关闭，列表新增记录，Toast提示"创建成功"</li>
              <li><strong>失败：</strong>名称重复提示"该优惠券名称已存在"；未选券类型提示"请选择券类型"</li>
              <li><strong>边界条件：</strong>现金券减免金额需大于0；折扣券比例范围为1-99整数；发放数量需大于0；消费门槛为0表示无门槛；适用范围选择"指定演出/场次"时必须至少选择1个演出</li>
            </ul>

            <p><strong>编辑优惠券（未开始状态）</strong></p>
            <ul>
              <li><strong>触发：</strong>点击未开始状态优惠券操作列"编辑"按钮</li>
              <li><strong>执行中：</strong>弹出 modal-coupon-edit 弹窗，所有字段可编辑，顶部无状态限制提示</li>
              <li><strong>成功：</strong>弹窗关闭，列表数据更新，Toast提示"保存成功"</li>
              <li><strong>失败：</strong>Toast提示"保存失败"</li>
              <li><strong>边界条件：</strong>名称不可与其他优惠券重复</li>
            </ul>

            <p><strong>编辑优惠券（进行中状态）</strong></p>
            <ul>
              <li><strong>触发：</strong>点击进行中状态优惠券操作列"编辑"按钮</li>
              <li><strong>执行中：</strong>弹出 modal-coupon-edit 弹窗，顶部黄色警告提示"当前状态：进行中 — 已有N张券被领取，N张已使用。以下字段不可修改：券类型、面值/折扣、消费门槛、适用范围、叠加设置。仅可修改有效期和使用说明。"券名称、券类型、减免金额/折扣比例、消费门槛、发放数量、适用范围、叠加设置区域均灰显 disabled；有效期设置区域标注"可编辑"标签，固定日期模式下显示生效/失效时间，领取后N天模式下显示有效天数，使用说明可修改</li>
              <li><strong>成功：</strong>弹窗关闭，列表数据更新，Toast提示"保存成功"</li>
              <li><strong>失败：</strong>Toast提示"保存失败"</li>
              <li><strong>边界条件：</strong>核心参数（券类型、面值/折扣、门槛、范围、叠加）不可变更</li>
            </ul>

            <p><strong>查看优惠券（已过期/已停用状态）</strong></p>
            <ul>
              <li><strong>触发：</strong>点击已过期/已停用状态优惠券操作列"查看"按钮（眼睛图标）</li>
              <li><strong>执行中：</strong>弹出 modal-coupon-view 弹窗，顶部红色锁定提示"当前状态：已过期 — 该优惠券已过期，所有内容均为只读，不可修改。"所有表单字段 disabled，叠加设置区域 pointer-events:none，有效期设置区域灰显，底部仅显示"关闭"按钮，无"保存修改"按钮</li>
              <li><strong>成功：</strong>展示完整只读信息</li>
              <li><strong>失败：</strong>Toast提示"加载失败"</li>
              <li><strong>边界条件：</strong>已过期/已停用状态不可编辑，不可复制</li>
            </ul>

            <p><strong>停用优惠券</strong></p>
            <ul>
              <li><strong>触发：</strong>点击进行中/未开始优惠券操作列"停用"按钮（红色禁止图标）</li>
              <li><strong>执行中：</strong>状态直接切换为"已停用"</li>
              <li><strong>成功：</strong>状态变更，操作按钮变为"查看/数据"（已过期/已停用状态不显示编辑、二维码、停用、复制按钮）</li>
              <li><strong>失败：</strong>Toast提示"操作失败"</li>
              <li><strong>边界条件：</strong>已过期优惠券不可停用</li>
            </ul>

            <p><strong>查看二维码</strong></p>
            <ul>
              <li><strong>触发：</strong>点击列表操作列"二维码"按钮（二维码图标）</li>
              <li><strong>执行中：</strong>弹出 modal-coupon-qrcode 弹窗，展示200x200微信小程序码占位图、优惠券名称、说明文字"用户使用微信扫描此二维码，可直接打开小程序领取该优惠券"</li>
              <li><strong>成功：</strong>弹窗展示二维码</li>
              <li><strong>失败：</strong>Toast提示"生成失败"</li>
              <li><strong>边界条件：</strong>仅支持微信小程序二维码；不支持自定义跳转页面；不提供网址链接；仅进行中优惠券显示二维码按钮</li>
            </ul>

            <p><strong>下载二维码</strong></p>
            <ul>
              <li><strong>触发：</strong>在二维码弹窗中点击"下载二维码"按钮</li>
              <li><strong>执行中：</strong>触发图片下载</li>
              <li><strong>成功：</strong>文件下载到本地</li>
              <li><strong>失败：</strong>Toast提示"下载失败"</li>
              <li><strong>边界条件：</strong>无</li>
            </ul>

            <p><strong>查看优惠券数据</strong></p>
            <ul>
              <li><strong>触发：</strong>点击任意状态优惠券操作列"数据"按钮（柱状图图标）</li>
              <li><strong>执行中：</strong>弹出 modal-coupon-data 弹窗（modal-xl 宽屏），顶部6张统计卡片（总发放量/已使用/使用率/未使用/核销总金额/平均优惠金额）；下方为"领取与使用明细"区域，左侧标题右侧搜索框（按用户姓名/手机号搜索）+ 筛选下拉（全部记录/已领取未使用/已使用）；表格列：用户/手机号/领取时间/使用状态/订单号/订单金额/优惠金额/使用时间；表格底部有分页组件</li>
              <li><strong>成功：</strong>展示完整统计数据和明细</li>
              <li><strong>失败：</strong>Toast提示"加载失败"</li>
              <li><strong>边界条件：</strong>已领取未使用记录的使用相关字段显示"—"；支持分页浏览大量记录</li>
            </ul>`
          },
          {
            title: '核心字段',
            noTableWrap: true,
            tables: [
              {
                title: '统计卡片字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['total_issued_count', 'number', '是', '已发放优惠券数量（张）'],
                  ['total_used_count', 'number', '是', '已使用数量（张）'],
                  ['total_write_off_amount', 'number', '是', '核销总金额（元）']
                ]
              },
              {
                title: '筛选条件字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['filter_type', 'enum', '否', '类型筛选：全部类型/现金券/折扣券'],
                  ['filter_status', 'enum', '否', '状态筛选：全部状态/未开始/进行中/已过期/已停用']
                ]
              },
              {
                title: '优惠券列表字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['coupon_name', 'string', '是', '券名称'],
                  ['coupon_type', 'enum', '是', '类型：cash（现金券）/discount（折扣券）'],
                  ['face_value', 'number', '否', '现金券为减免金额（元）；折扣券为折扣比例（折）'],
                  ['min_order_amount', 'number', '否', '消费门槛（元），0表示无门槛'],
                  ['applicable_scope', 'enum', '是', '适用范围：all（全部演出）/specific（指定演出场次）'],
                  ['applicable_shows', 'array', '否', '指定演出ID列表，applicable_scope=specific时必填'],
                  ['applicable_sessions', 'object', '否', '演出场次映射，key为show_id，value为session_id数组，空数组表示该演出全部场次'],
                  ['issued_count', 'number', '是', '已发放数量（张）'],
                  ['used_count', 'number', '是', '已使用数量（张）'],
                  ['usage_rate', 'number', '是', '使用率（%）'],
                  ['valid_start', 'string', '否', '有效期开始时间，validity_mode=fixed时显示'],
                  ['valid_end', 'string', '否', '有效期结束时间，validity_mode=fixed时显示'],
                  ['valid_days', 'number', '否', '有效天数，validity_mode=relative时列表显示为"领取后N天"（绿色标签）'],
                  ['validity_mode', 'enum', '是', '有效期模式：fixed（固定日期范围）/relative（领取后N天）'],
                  ['status', 'enum', '是', '状态：pending（未开始）/active（进行中）/expired（已过期）/stopped（已停用）']
                ]
              },
              {
                title: '新建/编辑优惠券弹窗字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['coupon_name', 'string', '是', '券名称'],
                  ['coupon_type', 'enum', '是', '券类型：cash（现金券）/discount（折扣券）'],
                  ['discount_amount', 'number', '否', '减免金额（元），coupon_type=cash时必填'],
                  ['discount_percent', 'number', '否', '折扣比例（折，1-99整数），coupon_type=discount时必填'],
                  ['min_order_amount', 'number', '否', '消费门槛（元），0表示无门槛'],
                  ['issue_quantity', 'number', '是', '发放数量（张）'],
                  ['applicable_scope', 'enum', '是', '适用范围：all/specific'],
                  ['applicable_shows', 'array', '否', '指定演出ID列表，applicable_scope=specific时必填'],
                  ['applicable_sessions', 'object', '否', '演出场次映射，key为show_id，value为session_id数组'],
                  ['stack_member_discount', 'boolean', '是', '是否可与会员折扣叠加'],
                  ['stack_ticket_discount', 'boolean', '是', '是否可与票品折扣叠加'],
                  ['validity_mode', 'enum', '是', '有效期模式：fixed（固定日期）/relative（领取后N天）'],
                  ['valid_start', 'string', '否', '固定日期模式为生效时间，validity_mode=fixed时必填'],
                  ['valid_end', 'string', '否', '固定日期模式为失效时间，validity_mode=fixed时必填'],
                  ['valid_days', 'number', '否', '有效天数（天），validity_mode=relative时必填'],
                  ['usage_desc', 'string', '否', '使用说明']
                ]
              },
              {
                title: '优惠券数据弹窗-统计卡片字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['total_issued', 'number', '是', '总发放量（张）'],
                  ['total_used', 'number', '是', '已使用（张）'],
                  ['usage_rate', 'number', '是', '使用率（%）'],
                  ['total_unused', 'number', '是', '未使用（张）'],
                  ['total_write_off_amount', 'number', '是', '核销总金额（元）'],
                  ['avg_discount_amount', 'number', '是', '平均优惠金额（元）']
                ]
              },
              {
                title: '优惠券数据弹窗-明细列表字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['user_name', 'string', '是', '用户姓名'],
                  ['user_phone', 'string', '是', '用户手机号（脱敏）'],
                  ['claim_time', 'string', '是', '领取时间'],
                  ['use_status', 'enum', '是', '使用状态：claimed（已领取未使用）/used（已使用）'],
                  ['order_no', 'string', '否', '订单号，use_status=used时必填'],
                  ['order_amount', 'number', '否', '订单金额（元），use_status=used时必填'],
                  ['discount_amount', 'number', '否', '优惠金额（元），use_status=used时必填'],
                  ['use_time', 'string', '否', '使用时间，use_status=used时必填']
                ]
              },
              {
                title: '明细筛选/搜索字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['search_keyword', 'string', '否', '搜索关键词，按用户姓名或手机号模糊匹配'],
                  ['filter_use_status', 'enum', '否', '使用状态筛选：all/claimed/used']
                ]
              }
            ]
          }
        ]
      },
      {
        title: '抽奖管理',
        sections: [
          {
            title: '功能描述',
            content: `<p><strong>核心功能：</strong>管理抽奖活动的创建、奖品配置、获奖记录查看和活动数据查看。页面包含3个子标签页：活动列表、奖品配置、获奖记录。活动列表展示抽奖活动（活动名称/时间范围/参与人数/抽奖次数/状态/操作），支持新建抽奖活动；奖品配置展示活动奖品列表（奖品名称/类型/中奖概率/数量限制），支持添加奖品；获奖记录展示用户中奖信息（用户/手机号/活动/奖品/类型/抽奖时间/领取状态/操作），支持按活动、奖品类型、领取状态筛选和导出。</p>
            <p><strong>业务说明：</strong></p>
            <ul>
              <li><strong>前置条件：</strong>操作人需具有"抽奖管理"权限</li>
              <li><strong>功能实现逻辑：</strong>
                <ul>
                  <li>活动创建：设置活动名称、开始/结束时间、每人抽奖次数限制、参与条件（无限制/注册用户/已购票用户/会员用户）、活动规则说明</li>
                  <li>奖品配置：创建活动后需添加奖品并设置中奖概率，所有奖品概率之和应为100%；奖品类型包括实物奖品、虚拟奖品（积分/优惠券/门票）</li>
                  <li>状态流转：未开始→进行中→已结束（自动），进行中可手动停止→已结束</li>
                  <li>获奖记录：记录每次抽奖的用户信息、奖品、时间、领取状态；支持对未领取用户发送提醒</li>
                </ul>
              </li>
              <li><strong>权限控制：</strong>查看需"抽奖查看"权限；新增/编辑活动/奖品配置需"抽奖编辑"权限；停止活动需"抽奖管理"权限</li>
              <li><strong>数据约束：</strong>活动名称不可重复；奖品概率之和必须等于100%；已结束活动不可编辑</li>
              <li><strong>能力边界：</strong>不支持奖品库存自动扣减；不支持实物奖品物流跟踪</li>
            </ul>`
          },
          {
            title: '交互说明',
            content: `<p><strong>新建抽奖活动</strong></p>
            <ul>
              <li><strong>触发：</strong>点击"新建抽奖活动"按钮</li>
              <li><strong>执行中：</strong>弹出新建弹窗，填写活动名称、开始/结束时间、每人抽奖次数限制（默认1次）、参与条件（下拉选择）、活动规则说明</li>
              <li><strong>成功：</strong>弹窗关闭，列表新增记录，Toast提示"创建活动成功"，提示"创建活动后，请前往「奖品配置」添加奖品并设置中奖概率"</li>
              <li><strong>失败：</strong>名称重复提示"该活动名称已存在"</li>
              <li><strong>边界条件：</strong>开始时间不可早于当前时间；结束时间需晚于开始时间</li>
            </ul>
            <p><strong>编辑抽奖活动</strong></p>
            <ul>
              <li><strong>触发：</strong>点击未开始活动操作列"编辑"按钮</li>
              <li><strong>执行中：</strong>弹出编辑弹窗，回填数据</li>
              <li><strong>成功：</strong>列表数据更新</li>
              <li><strong>失败：</strong>Toast提示"保存失败"</li>
              <li><strong>边界条件：</strong>已结束/进行中活动不可编辑</li>
            </ul>
            <p><strong>奖品配置</strong></p>
            <ul>
              <li><strong>触发：</strong>点击子标签页"奖品配置"或活动列表操作列"奖品配置"按钮</li>
              <li><strong>执行中：</strong>展示当前活动奖品列表，点击"添加奖品"弹出弹窗，填写奖品名称、奖品类型、奖品数量、中奖概率、奖品图片</li>
              <li><strong>成功：</strong>奖品添加到列表，底部显示概率合计，提示"所有奖品概率之和应为100%"</li>
              <li><strong>失败：</strong>概率超过100%提示"概率合计不能超过100%"</li>
              <li><strong>边界条件：</strong>至少需添加1个奖品；"谢谢参与"作为安慰奖可设置不限量</li>
            </ul>
            <p><strong>停止抽奖活动</strong></p>
            <ul>
              <li><strong>触发：</strong>点击进行中活动操作列"停止"按钮</li>
              <li><strong>执行中：</strong>状态直接切换为"已结束"</li>
              <li><strong>成功：</strong>状态变更，操作按钮变为"查看/数据/复制"</li>
              <li><strong>失败：</strong>Toast提示"操作失败"</li>
              <li><strong>边界条件：</strong>已结束活动不可停止</li>
            </ul>
            <p><strong>查看获奖记录</strong></p>
            <ul>
              <li><strong>触发：</strong>点击子标签页"获奖记录"</li>
              <li><strong>执行中：</strong>展示获奖记录表格，支持按活动、奖品类型、领取状态筛选，支持导出记录</li>
              <li><strong>成功：</strong>展示完整记录</li>
              <li><strong>失败：</strong>Toast提示"加载失败"</li>
              <li><strong>边界条件：</strong>无</li>
            </ul>
            <p><strong>提醒未领取用户</strong></p>
            <ul>
              <li><strong>触发：</strong>点击获奖记录操作列"提醒"按钮</li>
              <li><strong>执行中：</strong>向用户发送领取提醒通知</li>
              <li><strong>成功：</strong>Toast提示"提醒已发送"</li>
              <li><strong>失败：</strong>Toast提示"发送失败"</li>
              <li><strong>边界条件：</strong>仅"未领取"状态可提醒</li>
            </ul>`
          },
          {
            title: '核心字段',
            noTableWrap: true,
            tables: [
              {
                title: '抽奖活动列表字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['activity_name', 'string', '是', '活动名称'],
                  ['activity_icon', 'string', '否', '活动图标（渐变色+图标）'],
                  ['start_time', 'string', '是', '开始时间'],
                  ['end_time', 'string', '是', '结束时间'],
                  ['participant_count', 'number', '是', '参与人数'],
                  ['draw_count', 'number', '是', '抽奖次数'],
                  ['status', 'enum', '是', '状态：未开始/进行中/已结束']
                ]
              },
              {
                title: '新建抽奖活动弹窗字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['activity_name', 'string', '是', '活动名称'],
                  ['start_time', 'string', '是', '开始时间'],
                  ['end_time', 'string', '是', '结束时间'],
                  ['draw_limit_per_user', 'number', '否', '每人抽奖次数限制，默认1次'],
                  ['participation_condition', 'enum', '否', '参与条件：无限制/注册用户/已购票用户/会员用户'],
                  ['rule_description', 'string', '否', '活动规则说明']
                ]
              },
              {
                title: '奖品配置字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['prize_name', 'string', '是', '奖品名称'],
                  ['prize_type', 'enum', '是', '奖品类型：实物奖品/虚拟奖品-积分/虚拟奖品-优惠券/虚拟奖品-门票/安慰奖'],
                  ['prize_quantity', 'number', '是', '奖品数量，不限量填-1'],
                  ['win_probability', 'number', '是', '中奖概率（%）'],
                  ['prize_image', 'string', '否', '奖品图片URL']
                ]
              },
              {
                title: '获奖记录字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['user_name', 'string', '是', '用户姓名'],
                  ['user_phone', 'string', '是', '手机号（脱敏）'],
                  ['activity_name', 'string', '是', '活动名称'],
                  ['prize_name', 'string', '是', '奖品名称'],
                  ['prize_type', 'enum', '是', '奖品类型：积分/实物/优惠券/门票'],
                  ['draw_time', 'string', '是', '抽奖时间'],
                  ['claim_status', 'enum', '是', '领取状态：已领取/未领取']
                ]
              }
            ]
          }
        ]
      },
      {
        title: '演出券包',
        sections: [
          {
            title: '功能描述',
            content: `<p><strong>核心功能：</strong>管理演出券包的创建、编辑、下架、补货和数据查看。页面展示3张统计卡片（在售券包/累计售出/券包收入），支持按状态筛选，表格展示券包列表（券包名称/包含演出/票档/原价券包价/已售数量/库存/状态/操作），支持新建券包（选择多场演出和票档组合，设置券包售价和库存）。</p>
            <p><strong>业务说明：</strong></p>
            <ul>
              <li><strong>前置条件：</strong>操作人需具有"券包管理"权限；关联演出需已创建且有余票</li>
              <li><strong>功能实现逻辑：</strong>
                <ul>
                  <li>券包组成：选择1个或多个演出，每个演出选择票档和票数，系统自动计算原价合计</li>
                  <li>价格设置：设置券包售价（低于原价合计），形成优惠吸引力</li>
                  <li>库存管理：设置库存数量，售出后自动扣减，库存为0时状态自动变为"已售罄"</li>
                  <li>状态流转：在售→已下架（手动）/已售罄（自动）</li>
                  <li>库存预警：库存紧张时进度条显示为橙色，售罄显示为红色</li>
                </ul>
              </li>
              <li><strong>权限控制：</strong>查看需"券包查看"权限；新增/编辑需"券包编辑"权限；下架/补货需"券包管理"权限</li>
              <li><strong>数据约束：</strong>券包名称不可重复；券包售价需低于原价合计；库存需大于0；已售罄券包可补货</li>
              <li><strong>能力边界：</strong>不支持部分演出场次变更（需重新创建券包）；不支持与优惠券叠加使用</li>
            </ul>`
          },
          {
            title: '交互说明',
            content: `<p><strong>新建券包</strong></p>
            <ul>
              <li><strong>触发：</strong>点击"新建券包"按钮</li>
              <li><strong>执行中：</strong>弹出新建弹窗，填写券包名称、券包描述，选择演出和票档（可添加多个演出，每个演出选择票档和票数），系统自动计算原价合计，设置券包售价和库存数量</li>
              <li><strong>成功：</strong>弹窗关闭，列表新增记录，状态为"在售"，Toast提示"券包创建成功"</li>
              <li><strong>失败：</strong>名称重复提示"该券包名称已存在"；售价高于原价提示"券包售价需低于原价合计"</li>
              <li><strong>边界条件：</strong>至少选择1个演出；库存需大于0；券包售价需大于0</li>
            </ul>
            <p><strong>编辑券包</strong></p>
            <ul>
              <li><strong>触发：</strong>点击在售券包操作列"编辑"按钮</li>
              <li><strong>执行中：</strong>弹出编辑弹窗，回填数据，演出和票档组合只读</li>
              <li><strong>成功：</strong>列表数据更新</li>
              <li><strong>失败：</strong>Toast提示"保存失败"</li>
              <li><strong>边界条件：</strong>已售罄/已下架券包部分字段可编辑</li>
            </ul>
            <p><strong>下架券包</strong></p>
            <ul>
              <li><strong>触发：</strong>点击操作列"下架"按钮</li>
              <li><strong>执行中：</strong>状态直接切换为"已下架"</li>
              <li><strong>成功：</strong>状态变更，操作按钮变为"查看/补货"</li>
              <li><strong>失败：</strong>Toast提示"操作失败"</li>
              <li><strong>边界条件：</strong>已售罄券包不可下架</li>
            </ul>
            <p><strong>补货</strong></p>
            <ul>
              <li><strong>触发：</strong>点击已售罄券包操作列"补货"按钮</li>
              <li><strong>执行中：</strong>弹出补货弹窗，输入新增库存数量</li>
              <li><strong>成功：</strong>库存增加，状态恢复为"在售"</li>
              <li><strong>失败：</strong>Toast提示"补货失败"</li>
              <li><strong>边界条件：</strong>仅已售罄券包可补货</li>
            </ul>
            <p><strong>查看券包数据</strong></p>
            <ul>
              <li><strong>触发：</strong>点击操作列"数据"按钮</li>
              <li><strong>执行中：</strong>展示券包销售统计数据</li>
              <li><strong>成功：</strong>展示完整数据</li>
              <li><strong>失败：</strong>Toast提示"加载失败"</li>
              <li><strong>边界条件：</strong>无</li>
            </ul>`
          },
          {
            title: '核心字段',
            noTableWrap: true,
            tables: [
              {
                title: '统计卡片字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['on_sale_count', 'number', '是', '在售券包数量（个）'],
                  ['total_sold_count', 'number', '是', '累计售出数量（份）'],
                  ['total_revenue', 'number', '是', '券包收入（元）']
                ]
              },
              {
                title: '筛选条件字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['filter_status', 'enum', '否', '状态筛选：全部状态/在售/已下架/已售罄']
                ]
              },
              {
                title: '券包列表字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['package_name', 'string', '是', '券包名称'],
                  ['package_icon', 'string', '否', '券包图标（渐变色+图标）'],
                  ['package_desc', 'string', '否', '券包描述，如"含3场演出"'],
                  ['included_shows', 'array', '是', '包含演出列表，每项含演出名称/场次/场馆'],
                  ['ticket_grade', 'enum', '是', '票档：A档/B档/VIP档'],
                  ['original_price', 'number', '是', '原价合计（元）'],
                  ['package_price', 'number', '是', '券包售价（元）'],
                  ['sold_count', 'number', '是', '已售数量（份）'],
                  ['stock_count', 'number', '是', '库存数量（份）'],
                  ['stock_status', 'enum', '是', '库存状态：充足/紧张/售罄'],
                  ['status', 'enum', '是', '状态：在售/已下架/已售罄']
                ]
              },
              {
                title: '新建券包弹窗字段',
                headers: ['字段名', '类型', '必填', '说明'],
                rows: [
                  ['package_name', 'string', '是', '券包名称'],
                  ['package_desc', 'string', '否', '券包描述'],
                  ['show_items', 'array', '是', '演出项目列表，每项含show_id/ticket_grade/quantity'],
                  ['original_price', 'number', '是', '原价合计（元），系统自动计算'],
                  ['package_price', 'number', '是', '券包售价（元）'],
                  ['stock_quantity', 'number', '是', '库存数量']
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  'pc-admin/ai-marketing.html': {
    title: 'AI智能营销',
    subtitle: '用户画像 + 精准推送 + 自动化营销 + 效果追踪',
    sections: [
        {
            title: '功能说明',
            content: `<p><strong>核心功能：</strong>AI驱动的智能营销平台，整合用户画像分析、精准推送、自动化营销方案生成和效果追踪四大模块。系统通过分析用户行为数据和演出历史数据，自动生成个性化营销方案并评估预期效果，帮助运营人员实现精准营销。</p>`
        },
        {
            title: '核心字段',
            tables: [
                {
                    title: '用户画像字段',
                    headers: ['字段名', '中文名', '类型', '必填', '说明'],
                    rows: [
                        ['user_id', 'number', '是', '用户唯一标识'],
                        ['age_group', 'string', '是', '年龄段（如18-24/25-34/35-44等）'],
                        ['gender', 'enum', '是', '性别：男/女/未知'],
                        ['city', 'string', '是', '所在城市'],
                        ['interest_tags', 'array', '是', '兴趣偏好标签（演出类型偏好）'],
                        ['consume_level', 'enum', '是', '消费能力等级：低/中/高/极高'],
                        ['user_group', 'string', '否', '用户群体标签（如音乐发烧友/话剧爱好者等）'],
                        ['last_active_time', 'string', '是', '最近活跃时间'],
                        ['total_consume', 'number', '是', '累计消费金额'],
                        ['order_count', 'number', '是', '累计订单数']
                    ]
                },
                {
                    title: '推送字段',
                    headers: ['字段名', '中文名', '类型', '必填', '说明'],
                    rows: [
                        ['push_id', 'number', '是', '推送任务唯一标识'],
                        ['target_group', 'enum', '是', '目标群体：全部用户/新用户/VIP会员/沉睡用户/音乐爱好者/优惠券敏感用户'],
                        ['channel', 'enum', '是', '推送渠道：微信推送/短信推送'],
                        ['title', 'string', '是', '推送标题，最多30字'],
                        ['content', 'string', '是', '推送内容，最多200字，支持变量插入'],
                        ['push_time', 'string', '是', '推送时间：立即发送/定时发送'],
                        ['jump_page', 'enum', '是', '跳转页面：演出详情/优惠券/首页/自定义链接'],
                        ['related_show_id', 'number', '否', '关联演出ID'],
                        ['push_count', 'number', '是', '推送触达人数'],
                        ['open_rate', 'number', '否', '打开率（百分比）'],
                        ['conversion_rate', 'number', '否', '转化率（百分比）']
                    ]
                },
                {
                    title: '效果追踪字段',
                    headers: ['字段名', '中文名', '类型', '必填', '说明'],
                    rows: [
                        ['campaign_name', 'string', '是', '营销活动名称'],
                        ['push_time', 'string', '是', '推送时间'],
                        ['push_count', 'number', '是', '推送人数'],
                        ['open_count', 'number', '是', '打开人数'],
                        ['open_rate', 'number', '是', '打开率（百分比）'],
                        ['order_count', 'number', '是', '转化订单数'],
                        ['conversion_rate', 'number', '是', '转化率（百分比）'],
                        ['revenue', 'number', '是', '活动营收金额'],
                        ['channel', 'enum', '是', '渠道来源：微信推送/短信推送']
                    ]
                }
            ]
        },
        {
            title: '数据指标说明',
            content: `<b>AI营销核心指标（4项）</b>：

- <b>用户画像覆盖数</b>：统计系统中已完善画像标签的用户总数<br>业务含义：反映用户标签化程度，为精准营销提供数据基础<br>数据来源：具有完整画像标签（年龄、性别、地域、兴趣等维度）的用户统计

- <b>精准推送次数</b>：近30天精准推送总次数<br>业务含义：反映精准营销触达频次<br>数据来源：推送记录统计

- <b>平均转化率</b>：计算推送转化效果<br>业务含义：反映精准推送的转化效率<br>计算逻辑：推送后24小时内产生的订单数 ÷ 推送触达的用户数 × 100%

- <b>AI生成方案数</b>：近30天AI自动生成的营销方案数量<br>业务含义：反映AI营销辅助能力的使用情况`
        },
        {
            title: 'Tab功能说明',
            content: `<b>AI智能营销Tab切换 - 4个Tab页签</b>：

- <b>用户画像Tab</b>：展示用户群体特征分析<br>业务场景：了解用户构成、管理用户标签、筛选目标人群<br>数据来源：用户行为数据、注册信息、消费记录

- <b>精准推送Tab</b>：向指定用户群体发送营销推送<br>业务场景：定向营销触达、活动推广、演出推荐<br>支持渠道：微信推送、短信推送

- <b>自动化营销Tab</b>：AI自动分析演出销售数据并生成营销方案<br>业务场景：为新演出/在售演出自动生成营销策略<br>核心能力：AI分析售票进度、预测上座率、推荐营销方案

- <b>效果追踪Tab</b>：追踪营销活动效果<br>业务场景：评估营销ROI、分析转化数据、优化营销策略<br>数据来源：推送数据、订单数据`
        },
        {
            title: '数据指标说明 - 用户画像',
            content: `<b>用户群体分析维度（5项）</b>：

- <b>年龄分布</b>：各年龄段用户占比<br>业务含义：了解用户年龄结构，指导演出类型选择<br>数据来源：用户注册信息中的生日数据计算

- <b>性别比例</b>：男女用户占比<br>业务含义：了解用户性别构成<br>数据来源：用户注册信息

- <b>地域分布</b>：各城市用户占比<br>业务含义：了解用户地理分布，指导区域营销<br>数据来源：用户注册信息或IP定位

- <b>兴趣偏好</b>：各演出类型偏好占比<br>业务含义：了解用户观演偏好，指导精准推荐<br>数据来源：用户浏览记录和购票历史分析

- <b>消费能力</b>：用户客单价分布<br>业务含义：了解用户消费水平，指导票价策略<br>数据来源：用户历史订单金额统计

<b>用户群体划分</b>：
- 音乐发烧友：近6个月购买音乐会类演出≥3场
- 话剧爱好者：近6个月购买话剧类演出≥2场
- 家庭用户：购票时选择家庭套票或单次购票≥4张
- VIP会员：会员等级达到指定级别`
        },
        {
            title: '功能流程 - 精准推送',
            content: `<b>推送目标群体（6个预设）</b>：

- <b>全部用户</b>：系统中所有注册用户
- <b>新用户</b>：注册时间≤7天且未购票的用户
- <b>VIP会员</b>：会员等级≥指定级别的用户
- <b>沉睡用户</b>：近30天未登录且历史有购票记录的用户
- <b>音乐爱好者</b>：近6个月浏览/购买音乐会类演出≥2次的用户
- <b>优惠券敏感用户</b>：历史优惠券使用率≥60%的用户

<b>推送配置</b>：
- 推送渠道：微信推送/短信推送（可多选）
- 推送标题：最多30字
- 推送内容：最多200字，支持变量插入（如用户名、演出名）
- 推送时间：立即发送/定时发送
- 跳转页面：演出详情/优惠券/首页/自定义链接
- 关联演出：选择推送关联的演出项目

<b>推送流程</b>：
1. 选择目标群体
2. 配置推送内容和渠道
3. 预览推送效果
4. 确认发送并查看发送统计`
        },
        {
            title: '功能流程 - 自动化营销',
            content: `<b>场景分类</b>：

- <b>新演出场景</b>：针对即将开售的演出进行预热推广
- <b>已开始场景</b>：针对正在售票的演出进行销售加速

<b>演出状态标签</b>：
- 需紧急启动：售票进度<10%且距开演≤14天
- 待启动营销：售票进度<10%且距开演>14天
- 初步推广中：10%≤售票进度<30%
- 推广进行中：售票进度≥30%
- 需加速：售票进度<30%
- 增速放缓：30%≤售票进度<60%且销售趋势下降
- 进展良好：60%≤售票进度<90%
- 即将售罄：售票进度≥90%

<b>AI营销方案生成逻辑</b>：
根据售票进度和距离开演时间，AI自动生成1-3个营销方案：
- 低进度+时间充裕：3个方案（预热推广/会员优先/抽奖引流）
- 低进度+时间紧迫：1个方案（紧急启动）
- 中等进度：2个方案（预热推广/会员优先）
- 高进度：冲刺/稀缺营销方案

<b>方案内容</b>：
- 方案名称：如"预热推广 + 早鸟票 + 社交裂变"
- 分阶段执行计划：时间节点+营销动作+预期效果
- 预期指标：预计新增售票/预计新增营收/营销预算/预期ROI/预计上座率/覆盖人群
- 使用工具：精准推送/票品折扣/优惠券等

<b>执行流程</b>：
1. 选择演出项目
2. 查看AI分析的销售数据和诊断建议
3. 选择要执行的营销方案（可多选）
4. 预览方案详情
5. 一键执行创建对应营销活动`
        },
        {
            title: '数据指标说明 - 效果追踪',
            content: `<b>效果分析维度</b>：

- <b>活动效果趋势</b>：展示推送量和转化量的时间趋势<br>业务含义：了解营销效果的时间分布

- <b>渠道转化分布</b>：各推送渠道的转化占比<br>业务含义：评估不同渠道的效果差异<br>计算逻辑：各渠道转化订单数 ÷ 总转化订单数

<b>效果明细指标</b>：
- 活动名称：营销活动名称
- 推送时间：活动推送时间
- 推送人数：触达的用户数量
- 打开率：打开推送的用户占比<br>计算逻辑：打开人数 ÷ 推送人数 × 100%
- 转化率：产生订单的用户占比<br>计算逻辑：推送后24小时内产生的订单数 ÷ 推送人数 × 100%
- 营收：活动带来的成交金额

<b>时间筛选</b>：
- 今日/本周/本月/本年
- 支持导出Excel报告`
        }
    ]
  },

  'pc-admin/banner-management.html': {
    title: '轮播图管理',
    subtitle: '首页轮播内容配置 - 小程序/PC多端管理',
    sections: [
        {
            title: '功能说明',
            content: `<p><strong>核心功能：</strong>轮播图管理页面，用于管理小程序端和PC端首页轮播内容。支持轮播图的上传、排序、状态控制和展示策略配置，可按终端类型、页面位置、时间段等多维度管理轮播内容。</p>`
        },
        {
            title: '核心字段',
            tables: [
                {
                    title: '轮播图字段',
                    headers: ['字段名', '中文名', '类型', '必填', '说明'],
                    rows: [
                        ['banner_id', 'number', '是', '轮播图唯一标识'],
                        ['image_url', 'string', '是', '轮播图片URL'],
                        ['title', 'string', '是', '轮播图标题，最多20字'],
                        ['description', 'string', '否', '轮播图描述，最多50字'],
                        ['jump_type', 'enum', '是', '跳转类型：演出详情/商品详情/外部链接/无跳转'],
                        ['jump_target', 'string', '否', '跳转目标（演出ID/商品ID/链接URL）'],
                        ['terminal', 'enum', '是', '展示终端：小程序/PC端/全部'],
                        ['page_position', 'enum', '是', '页面位置：首页顶部/首页中部/演出列表/个人中心/其他'],
                        ['sort_order', 'number', '是', '排序权重，越小越靠前'],
                        ['start_time', 'string', '是', '展示开始时间'],
                        ['end_time', 'string', '是', '展示结束时间'],
                        ['status', 'enum', '是', '状态：待生效/启用/停用/已过期']
                    ]
                }
            ]
        },
        {
            title: '数据指标说明',
            content: `<b>统计卡片（4项指标）</b>：

- <b>轮播图总数</b>：创建的轮播图总数量<br>业务含义：反映轮播内容规模

- <b>启用中</b>：当前状态为启用的数量<br>业务含义：反映当前有效轮播数量

- <b>小程序端</b>：小程序端展示数量<br>业务含义：反映小程序端轮播配置

- <b>PC端</b>：PC端展示数量<br>业务含义：反映PC端轮播配置`
        },
        {
            title: '状态定义',
            content: `<b>轮播图状态及流转</b>：

- <b>待生效</b>：当前时间早于开始时间<br>流转条件：到达开始时间→启用

- <b>启用</b>：在有效期内且状态启用<br>流转条件：手动停用→停用；到达结束时间→已过期

- <b>停用</b>：手动停用<br>流转条件：重新启用→启用/待生效（根据当前时间）

- <b>已过期</b>：当前时间晚于结束时间<br>流转条件：终态，不可变更`
        },
        {
            title: '功能流程 - 轮播图配置',
            content: `<b>基础信息配置</b>：
- 轮播图片（必填）：上传轮播图
  - 小程序端规格：750×400px，JPG/PNG，<500KB
  - PC端规格：1920×600px，JPG/PNG，<2MB
- 标题：轮播图标题，最多20字
- 描述：轮播图描述，最多50字

<b>跳转配置</b>：
- 跳转类型：演出详情/商品详情/外部链接/无跳转
- 跳转目标：根据类型选择关联演出、商品或输入链接

<b>展示配置</b>：
- 展示终端：小程序/PC端/全部
- 页面位置：首页顶部/首页中部/演出列表/个人中心/其他
- 排序权重：数值越小排序越靠前，默认0
- 有效期：轮播图展示时间范围
- 状态：启用/停用

<b>排序管理</b>：
- 拖拽排序：列表页直接拖拽调整顺序
- 权重调整：编辑时修改排序权重数值
- 快捷操作：置顶/上移/下移/置底`
        }
    ]
  },

  'pc-admin/product-service.html': {
    title: '商品管理',
    subtitle: '周边商城商品管理 - 商品/分类/库存/客服',
    sections: [
        {
            title: '功能说明',
            content: `<p><strong>核心功能：</strong>周边商城商品管理平台，为周边商品运营提供完整的管理能力。包含商品管理和客服管理两个模块，支持商品创建与维护、分类管理、库存预警，以及在线客服配置。</p>`
        },
        {
            title: '核心字段',
            tables: [
                {
                    title: '商品字段',
                    headers: ['字段名', '中文名', '类型', '必填', '说明'],
                    rows: [
                        ['product_id', 'number', '是', '商品唯一标识'],
                        ['name', 'string', '是', '商品名称，最多50字'],
                        ['code', 'string', '否', '商品编码'],
                        ['category', 'string', '是', '商品分类（支持3级分类）'],
                        ['cover_image', 'string', '是', '商品主图URL'],
                        ['images', 'array', '否', '轮播图列表，最多5张'],
                        ['description', 'string', '否', '商品简介，最多200字'],
                        ['detail', 'string', '否', '商品详情（富文本）'],
                        ['original_price', 'number', '否', '原价/划线价'],
                        ['sale_price', 'number', '是', '销售价格'],
                        ['cost_price', 'number', '否', '成本价'],
                        ['stock', 'number', '是', '库存数量'],
                        ['stock_warning', 'number', '是', '库存预警值，默认10'],
                        ['status', 'enum', '是', '商品状态：草稿/上架中/已下架/售罄'],
                        ['sort_order', 'number', '否', '排序权重'],
                        ['skus', 'array', '否', 'SKU规格列表（规格名/规格值/价格/库存）']
                    ]
                },
                {
                    title: '客服会话字段',
                    headers: ['字段名', '中文名', '类型', '必填', '说明'],
                    rows: [
                        ['session_id', 'number', '是', '会话唯一标识'],
                        ['user_id', 'number', '是', '用户ID'],
                        ['user_nickname', 'string', '是', '用户昵称'],
                        ['status', 'enum', '是', '会话状态：等待中/处理中/已关闭'],
                        ['last_message', 'string', '否', '最近一条消息内容'],
                        ['last_time', 'string', '是', '最近消息时间'],
                        ['agent_id', 'number', '否', '接入客服ID'],
                        ['is_ai', 'boolean', '否', '是否AI客服处理'],
                        ['create_time', 'string', '是', '会话创建时间']
                    ]
                }
            ]
        },
        {
            title: 'Tab功能说明',
            content: `<b>商品管理Tab切换 - 2个Tab页签</b>：

- <b>商品管理Tab</b>：管理商城商品信息、分类、库存<br>业务场景：商品上下架、价格调整、库存管理<br>数据来源：商品基础数据

- <b>客服管理Tab</b>：管理在线客服配置和会话记录<br>业务场景：客服配置、会话管理、AI客服训练<br>数据来源：客服系统数据

Tab切换交互：
- 点击Tab切换管理维度
- 当前选中Tab高亮显示
- 各Tab独立维护筛选和分页状态`
        },
        {
            title: '数据指标说明 - 商品管理',
            content: `<b>统计卡片（4项指标）</b>：

- <b>商品总数</b>：创建的商品总数量<br>业务含义：反映商品SKU规模

- <b>上架中</b>：状态为上架的商品数<br>业务含义：反映当前可售商品数量

- <b>库存预警</b>：库存低于预警值的商品数<br>业务含义：反映需要补货的商品数量，需及时关注

- <b>今日销量</b>：今日商品销售数量<br>业务含义：反映当日商品销售表现<br>数据来源：今日已完成的商品订单数量合计

<b>筛选能力</b>：
- 商品分类筛选：支持多级分类筛选
- 商品状态筛选：上架中/已下架/售罄/草稿
- 库存状态筛选：库存充足/库存紧张/已售罄
- 价格区间筛选：按销售价格范围筛选
- 关键词搜索：支持商品名称/编码/简介搜索`
        },
        {
            title: '状态定义 - 商品',
            content: `<b>商品状态及流转</b>：

- <b>草稿</b>：商品信息已创建但未发布<br>流转条件：点击上架→上架中

- <b>上架中</b>：商品正常销售中<br>流转条件：手动下架→已下架；库存为0→售罄

- <b>已下架</b>：商品被手动下架<br>流转条件：重新上架→上架中（需库存>0）

- <b>售罄</b>：商品库存为0<br>流转条件：补货后库存>0→上架中

<b>商品分类层级</b>：
- 最多支持3级分类
- 一级分类：如周边商品/文创产品
- 二级分类：如T恤/帽子/海报
- 三级分类：如男款T恤/女款T恤`
        },
        {
            title: '功能流程 - 商品配置',
            content: `<b>基础信息配置</b>：
- 商品名称（必填）：最多50字
- 商品编码：商品唯一标识
- 商品分类（必填）：选择所属分类
- 商品简介：最多200字
- 商品详情：富文本编辑器，支持图片上传

<b>商品图片</b>：
- 主图（必填）：商品主展示图
- 轮播图：最多5张展示图
- 图片规格：800×800px，JPG/PNG，<2MB

<b>价格库存配置</b>：
- 原价：商品原价/划线价
- 销售价（必填）：实际销售价
- 成本价：用于利润统计
- 库存数量（必填）：当前可售库存
- 库存预警值：库存低于此值时预警，默认10

<b>规格SKU配置（可选）</b>：
- 规格名称：如颜色/尺寸
- 规格值：如红色/XL
- 各规格组合可独立设置价格和库存

<b>其他配置</b>：
- 物流配置：商品重量、运费模板
- 积分兑换：是否支持积分兑换及所需积分
- 上架状态：上架/下架
- 排序权重：数值越小排序越靠前`
        },
        {
            title: '状态定义 - 客服会话',
            content: `<b>会话状态</b>：
- <b>等待中</b>：用户发起会话，等待客服接入
- <b>处理中</b>：客服已接入，正在处理
- <b>已关闭</b>：会话已结束

<b>客服配置</b>：
- 在线客服开关：启用/停用在线客服
- 客服工作时间：工作日/周末/节假日设置
- 自动回复规则：欢迎语/离线回复/超时提醒
- 客服分配策略：轮流分配/负载均衡/技能分组
- 快捷回复：预设常见问题的快捷回复

<b>AI客服配置</b>：
- AI客服开关：启用/停用AI自动回复
- 知识库管理：添加问答对、批量导入导出
- 转人工规则：AI无法回答/用户主动要求/关键词触发
- AI训练优化：查看回答记录、标记正误、优化知识库`
        }
    ]
  },

  'pc-admin/activity-decoration.html': {
    title: '运营活动',
    subtitle: '活动管理与页面装修 - 活动/专题/首页配置',
    sections: [
        {
            title: '活动管理',
            sections: [
                {
                    title: '功能描述',
                    content: `<p><strong>核心功能：</strong>运营活动管理模块，支持创建、编辑、发布和追踪营销活动。运营人员可配置活动基础信息、时间规则、关联内容（演出/商品/优惠券）和活动页面，并实时追踪活动效果数据（浏览量、分享数、转化数、成交金额、ROI）。</p>
<p><strong>业务说明：</strong></p>
<ul>
  <li><strong>前置条件：</strong>运营人员角色权限；关联的演出、商品、优惠券需已创建</li>
  <li><strong>功能实现逻辑：</strong>
    <ul>
      <li>活动列表展示所有活动，支持按状态（全部/进行中/待开始/已结束/已停用）和关键词搜索筛选</li>
      <li>统计卡片（4项）：活动总数（所有状态活动数量）、进行中（当前时间在活动时间范围内）、待开始（当前时间早于开始时间）、已结束（当前时间晚于结束时间）</li>
      <li>活动类型：专题活动/节日活动/品牌合作/会员专享/限时特惠</li>
      <li>活动效果指标：页面浏览量、访客数、分享次数、点击转化数、下单转化数、成交金额、ROI（活动收益÷活动成本）</li>
    </ul>
  </li>
  <li><strong>权限控制：</strong>创建/编辑活动需运营权限；停用/删除需主管权限</li>
  <li><strong>数据约束：</strong>活动名称不可重复；结束时间必须晚于开始时间；已结束活动不可编辑</li>
  <li><strong>能力边界：</strong>不支持活动A/B测试；不支持定时自动发布</li>
</ul>`
                },
                {
                    title: '交互说明',
                    content: `<p><strong>创建活动</strong></p>
<ul>
  <li><strong>触发：</strong>点击列表页右上角「+ 创建活动」按钮</li>
  <li><strong>执行中：</strong>打开活动编辑弹窗，包含基础信息、活动时间、关联内容、页面配置、活动规则等配置区域</li>
  <li><strong>成功：</strong>保存后活动列表新增一条记录，Toast提示"活动创建成功"</li>
  <li><strong>失败：</strong>必填字段未填写时，对应字段标红提示</li>
  <li><strong>边界条件：</strong>关联演出/商品/优惠券为空时允许保存</li>
</ul>

<p><strong>编辑活动</strong></p>
<ul>
  <li><strong>触发：</strong>点击活动列表操作列「编辑」按钮</li>
  <li><strong>执行中：</strong>打开活动编辑弹窗，回填已有配置数据</li>
  <li><strong>成功：</strong>更新活动信息，Toast提示"活动更新成功"</li>
  <li><strong>失败：</strong>已结束状态的活动不允许编辑，Toast提示"已结束活动不可编辑"</li>
</ul>

<p><strong>停用/启用活动</strong></p>
<ul>
  <li><strong>触发：</strong>点击操作列「停用」或「启用」按钮</li>
  <li><strong>执行中：</strong>确认弹窗二次确认</li>
  <li><strong>成功：</strong>活动状态变更，列表实时刷新</li>
</ul>

<p><strong>查看活动效果</strong></p>
<ul>
  <li><strong>触发：</strong>点击操作列「效果」按钮</li>
  <li><strong>执行中：</strong>打开效果数据弹窗，展示浏览量、分享数、转化漏斗、成交金额、ROI图表</li>
</ul>`
                },
                {
                    title: '核心字段',
                    noTableWrap: true,
                    tables: [
                        {
                            title: '活动基础字段',
                            headers: ['字段名', '类型', '必填', '说明'],
                            rows: [
                                ['activity_id', 'number', '是', '活动唯一标识'],
                                ['name', 'string', '是', '活动名称，不可重复'],
                                ['type', 'enum', '是', '活动类型：专题活动/节日活动/品牌合作/会员专享/限时特惠'],
                                ['cover_image', 'string', '否', '活动封面图URL（建议750×400）'],
                                ['description', 'string', '否', '活动简介'],
                                ['share_title', 'string', '否', '分享标题'],
                                ['share_image', 'string', '否', '分享图片URL'],
                                ['start_time', 'string', '是', '活动开始时间，格式 YYYY-MM-DD HH:mm'],
                                ['end_time', 'string', '是', '活动结束时间，必须晚于开始时间'],
                                ['status', 'enum', '是', '状态：待开始/进行中/已结束/已停用'],
                                ['participant_condition', 'enum', '是', '参与条件：全部用户/会员专享/新用户专享'],
                                ['max_participate', 'number', '否', '每人参与次数限制'],
                                ['related_shows', 'array', '否', '关联演出ID列表'],
                                ['related_products', 'array', '否', '关联商品ID列表'],
                                ['related_coupons', 'array', '否', '关联优惠券ID列表']
                            ]
                        },
                        {
                            title: '活动效果字段',
                            headers: ['字段名', '类型', '必填', '说明'],
                            rows: [
                                ['page_views', 'number', '否', '页面浏览量'],
                                ['visitors', 'number', '否', '访客数'],
                                ['share_count', 'number', '否', '分享次数'],
                                ['click_conversions', 'number', '否', '点击转化数'],
                                ['order_count', 'number', '否', '下单转化数'],
                                ['total_amount', 'number', '否', '成交金额（元）'],
                                ['roi', 'number', '否', 'ROI，只读，由 total_amount ÷ cost 自动计算']
                            ]
                        }
                    ]
                }
            ]
        },
        {
            title: '首页装修',
            sections: [
                {
                    title: '功能描述',
                    content: `<p><strong>核心功能：</strong>小程序首页模块化装修配置工具。运营人员通过拖拽方式管理首页组件（轮播图、热门推荐、剧院导航、商品推荐、运营活动），实时预览装修效果，支持保存草稿和发布上线。搜索栏固定在轮播图上方，不可删除和移动，不显示上下移动和删除按钮。</p>
<p><strong>业务说明：</strong></p>
<ul>
  <li><strong>前置条件：</strong>运营人员角色权限；关联的演出、商品需已创建</li>
  <li><strong>功能实现逻辑：</strong>
    <ul>
      <li>页面分为左侧组件库+手机预览区+右侧属性配置面板三栏布局</li>
      <li>搜索栏固定在预览区顶部，不可删除、不可移动、不可拖拽排序；热门搜索词支持自定义添加（输入+添加按钮），每个词可单独删除；搜索框样式固定，不可配置</li>
      <li>预览区展示当前装修效果的实时手机端预览</li>
      <li>每个组件属性面板顶部均有「隐藏组件」开关，可控制组件在用户端的显示/隐藏</li>
      <li>组件支持拖拽排序（搜索栏除外），点击组件在右侧显示属性配置</li>
      <li>热门推荐支持两种推荐方式：智能推荐（自动推荐当前正在演出、票房最热的演出）和自定义推荐（手动搜索添加，最多6条，每条可配置标签文字和标签颜色；已选推荐列表直接展示标签颜色）</li>
      <li>轮播图配置支持关联类型选择后联动下拉（演出/商品/活动/券包），下拉选项支持关键词搜索过滤</li>
      <li>剧院导航支持设置最多展示的剧院数量（1-6个），自动按系统剧院数据展示</li>
      <li>工具栏提供撤销、重做、保存、发布操作</li>
    </ul>
  </li>
  <li><strong>权限控制：</strong>装修配置需运营权限；发布上线需主管审核权限</li>
  <li><strong>数据约束：</strong>自定义推荐演出最多6条；轮播图建议3-5张；发布后生成新版本号</li>
  <li><strong>能力边界：</strong>不支持多端独立配置（当前仅小程序端）；不支持组件复制</li>
</ul>`
                },
                {
                    title: '交互说明',
                    content: `<p><strong>添加组件</strong></p>
<ul>
  <li><strong>触发：</strong>点击左侧组件库中的组件卡片（轮播图/热门推荐/剧院导航/商品推荐/运营活动）</li>
  <li><strong>执行中：</strong>组件添加到预览区对应位置，右侧自动切换到该组件的属性面板</li>
  <li><strong>成功：</strong>预览区实时渲染新组件</li>
  <li><strong>边界条件：</strong>搜索栏不可通过组件库添加（固定存在）</li>
</ul>

<p><strong>删除组件</strong></p>
<ul>
  <li><strong>触发：</strong>点击预览区组件右上角删除图标</li>
  <li><strong>执行中：</strong>组件从预览区移除</li>
  <li><strong>边界条件：</strong>搜索栏不显示删除按钮，不可删除</li>
</ul>

<p><strong>拖拽排序</strong></p>
<ul>
  <li><strong>触发：</strong>长按预览区组件拖拽手柄上下移动</li>
  <li><strong>执行中：</strong>拖拽过程中显示插入位置指示线</li>
  <li><strong>成功：</strong>释放后组件按新顺序排列，预览实时更新</li>
  <li><strong>边界条件：</strong>搜索栏固定在轮播图上方，不显示排序/删除按钮，不参与拖拽排序</li>
</ul>

<p><strong>配置热门推荐 - 切换推荐方式</strong></p>
<ul>
  <li><strong>触发：</strong>在热门推荐属性面板中切换「推荐方式」下拉框（智能推荐/自定义推荐）</li>
  <li><strong>执行中：</strong>选择「智能推荐」时显示提示文字；选择「自定义推荐」时展开搜索添加面板和已选列表</li>
</ul>

<p><strong>配置搜索栏 - 添加热门搜索词</strong></p>
<ul>
  <li><strong>触发：</strong>在搜索词输入框输入关键词，点击「添加」按钮</li>
  <li><strong>执行中：</strong>搜索词以蓝色胶囊标签形式添加到列表，每个标签带×删除按钮</li>
  <li><strong>成功：</strong>Toast提示"已添加搜索词：xxx"</li>
  <li><strong>边界条件：</strong>搜索词不可为空；重复添加时Toast提示"该搜索词已存在"</li>
</ul>

<p><strong>配置搜索栏 - 删除热门搜索词</strong></p>
<ul>
  <li><strong>触发：</strong>点击搜索词标签右侧×按钮</li>
  <li><strong>执行中：</strong>标签从列表移除</li>
  <li><strong>成功：</strong>列表实时更新</li>
</ul>

<p><strong>配置轮播图 - 设置关联类型</strong></p>
<ul>
  <li><strong>触发：</strong>在轮播图配置面板中选择「关联类型」下拉框（演出/商品/活动/券包）</li>
  <li><strong>执行中：</strong>类型选择后自动展开「选择关联项」搜索下拉面板，下拉选项根据类型动态加载（演出：天涯故事/海南印象等；商品：演出纪念T恤/节目单等）</li>
  <li><strong>成功：</strong>选中关联项后搜索框填入名称，Toast提示"已关联：xxx"</li>
  <li><strong>边界条件：</strong>未选择关联类型时，关联项面板隐藏</li>
</ul>

<p><strong>配置轮播图 - 搜索关联项</strong></p>
<ul>
  <li><strong>触发：</strong>在关联项搜索框输入关键词</li>
  <li><strong>执行中：</strong>实时过滤下拉选项，仅显示匹配项</li>
  <li><strong>成功：</strong>下拉列表实时更新</li>
  <li><strong>边界条件：</strong>无匹配项时显示空状态</li>
</ul>

<p><strong>配置热门推荐 - 添加自定义演出</strong></p>
<ul>
  <li><strong>触发：</strong>在搜索框输入演出名称，点击「添加」按钮</li>
  <li><strong>执行中：</strong>演出添加到已选列表，默认展开配置表单，已选列表直接展示标签颜色胶囊</li>
  <li><strong>成功：</strong>Toast提示"已添加：xxx"</li>
  <li><strong>边界条件：</strong>最多6条，超出时Toast提示"最多添加6条推荐演出"</li>
</ul>

<p><strong>配置热门推荐 - 展开演出标签设置</strong></p>
<ul>
  <li><strong>触发：</strong>点击已选演出项的标题行</li>
  <li><strong>执行中：</strong>展开配置表单，包含标签文字输入框和6种标签颜色选择器；已选列表中标签颜色以彩色胶囊形式直接展示在演出名称旁</li>
  <li><strong>成功：</strong>配置实时保存，列表标签颜色同步更新</li>
</ul>

<p><strong>配置热门推荐 - 删除/更换演出</strong></p>
<ul>
  <li><strong>触发：</strong>点击已选演出项右侧删除图标或编辑图标</li>
  <li><strong>执行中：</strong>删除直接移除；编辑打开演出搜索选择</li>
  <li><strong>成功：</strong>Toast提示对应操作结果</li>
</ul>

<p><strong>隐藏/显示组件</strong></p>
<ul>
  <li><strong>触发：</strong>在任意组件属性面板底部切换「隐藏组件」开关</li>
  <li><strong>执行中：</strong>开关状态切换，预览区对应组件添加/移除隐藏遮罩</li>
  <li><strong>成功：</strong>隐藏的组件在用户端不显示，但在装修编辑器中仍可见（带遮罩标识）</li>
</ul>

<p><strong>保存装修方案</strong></p>
<ul>
  <li><strong>触发：</strong>点击工具栏「保存」按钮</li>
  <li><strong>执行中：</strong>保存当前装修配置为草稿</li>
  <li><strong>成功：</strong>Toast提示"装修方案已保存"</li>
  <li><strong>失败：</strong>未添加任何组件时Toast提示"请先添加组件再保存"</li>
</ul>

<p><strong>发布装修方案</strong></p>
<ul>
  <li><strong>触发：</strong>点击工具栏「发布」按钮</li>
  <li><strong>执行中：</strong>确认弹窗二次确认，发布后生成新版本号</li>
  <li><strong>成功：</strong>Toast提示"装修方案已发布"，版本号+1</li>
</ul>`
                },
                {
                    title: '核心字段',
                    noTableWrap: true,
                    tables: [
                        {
                            title: '装修配置字段',
                            headers: ['字段名', '类型', '必填', '说明'],
                            rows: [
                                ['config_id', 'number', '是', '装修配置唯一标识'],
                                ['modules', 'array', '是', '页面模块列表（类型/排序/内容配置）'],
                                ['module_type', 'enum', '是', '模块类型：search(固定)/carousel/hot/theater/shop/activity'],
                                ['hot_search_words', 'array', '否', '热门搜索词列表，自定义添加，每个词可删除'],
                                ['sort_order', 'number', '是', '模块排序权重'],
                                ['is_hidden', 'boolean', '是', '是否隐藏，false=显示，true=隐藏'],
                                ['content', 'object', '是', '模块内容配置（根据模块类型不同而不同）'],
                                ['status', 'enum', '是', '发布状态：草稿/已发布'],
                                ['publish_time', 'string', '否', '发布时间，格式 YYYY-MM-DD HH:mm'],
                                ['version', 'number', '是', '版本号，发布时自动+1']
                            ]
                        },
                        {
                            title: '轮播图模块字段（carousel.content）',
                            headers: ['字段名', '类型', '必填', '说明'],
                            rows: [
                                ['image', 'string', '是', '轮播图片URL'],
                                ['link_type', 'enum', '是', '跳转类型：show(演出)/product(商品)/activity(活动)/package(券包)'],
                                ['link_id', 'number', '否', '关联项ID，选择关联类型后必填'],
                                ['link_name', 'string', '否', '关联项名称（展示用）'],
                                ['title', 'string', '否', '展示标题'],
                                ['subtitle', 'string', '否', '展示副标题'],
                                ['tag', 'string', '否', '展示标签，如：限时特惠']
                            ]
                        },
                        {
                            title: '热门推荐模块字段（hot.content）',
                            headers: ['字段名', '类型', '必填', '说明'],
                            rows: [
                                ['recommend_mode', 'enum', '是', '推荐方式：auto(智能推荐)/custom(自定义)'],
                                ['display_count', 'number', '是', '展示数量，范围1-6'],
                                ['show_price', 'boolean', '是', '是否显示价格'],
                                ['custom_shows', 'array', '否', '自定义推荐演出列表（recommend_mode=custom时必填）'],
                                ['show_id', 'number', '是', '推荐演出ID'],
                                ['tag_text', 'string', '否', '标签文字，如：热卖/爆款/新品'],
                                ['tag_color', 'string', '否', '标签颜色，6种预设色值']
                            ]
                        },
                        {
                            title: '剧院导航模块字段（theater.content）',
                            headers: ['字段名', '类型', '必填', '说明'],
                            rows: [
                                ['max_display', 'number', '是', '最多展示数量，范围1-6，默认6']
                            ]
                        }
                    ]
                }
            ]
        }
    ]
  },

  'pc-admin/agent-management.html': {
    title: '代理管理',
    subtitle: '渠道代理管理 - 代理/分润/结算',
    sections: [
        {
            title: '功能说明',
            content: `<p><strong>核心功能：</strong>渠道代理管理平台，为渠道合作提供完整的管理能力。支持代理信息管理、佣金比例配置、等级管理、结算规则配置和代理业绩追踪，帮助管理渠道合作伙伴。</p>`
        },
        {
            title: '核心字段',
            tables: [
                {
                    title: '代理字段',
                    headers: ['字段名', '中文名', '类型', '必填', '说明'],
                    rows: [
                        ['agent_id', 'number', '是', '代理唯一标识'],
                        ['avatar', 'string', '否', '代理头像URL'],
                        ['nickname', 'string', '是', '代理昵称'],
                        ['phone', 'string', '是', '手机号'],
                        ['wechat', 'string', '否', '微信号'],
                        ['level', 'enum', '是', '代理等级：普通代理/铜牌/银牌/金牌/钻石'],
                        ['status', 'enum', '是', '代理状态：待审核/正常/冻结/已拒绝/已注销'],
                        ['register_time', 'string', '是', '注册时间'],
                        ['promo_code', 'string', '是', '推广码'],
                        ['promo_link', 'string', '是', '推广链接'],
                        ['total_orders', 'number', '是', '累计推广订单数'],
                        ['total_amount', 'number', '是', '累计推广金额'],
                        ['total_commission', 'number', '是', '累计佣金收入'],
                        ['settled_commission', 'number', '是', '已结算佣金'],
                        ['pending_commission', 'number', '是', '待结算佣金']
                    ]
                },
                {
                    title: '佣金配置字段',
                    headers: ['字段名', '中文名', '类型', '必填', '说明'],
                    rows: [
                        ['config_id', 'number', '是', '佣金配置唯一标识'],
                        ['default_rate', 'number', '是', '默认佣金比例（百分比），默认5%'],
                        ['type_rates', 'object', '否', '按演出类型佣金比例（如{音乐会:8, 话剧:6}）'],
                        ['show_rates', 'object', '否', '按单个演出佣金比例（show_id: rate）'],
                        ['settlement_cycle', 'enum', '是', '结算周期：日结/周结/月结'],
                        ['min_settle_amount', 'number', '是', '最低结算金额，默认100元'],
                        ['confirm_days', 'number', '是', '订单确认天数，默认7天'],
                        ['settle_mode', 'enum', '是', '结算方式：自动结算/手动结算']
                    ]
                },
                {
                    title: '代理等级字段',
                    headers: ['字段名', '中文名', '类型', '必填', '说明'],
                    rows: [
                        ['level_id', 'number', '是', '等级唯一标识'],
                        ['level_name', 'string', '是', '等级名称（如普通代理/铜牌/银牌/金牌/钻石）'],
                        ['icon', 'string', '否', '等级图标URL'],
                        ['color', 'string', '否', '等级颜色标识'],
                        ['upgrade_condition', 'object', '是', '升级条件（累计推广额/订单数/佣金/月活跃等）'],
                        ['commission_bonus', 'number', '是', '等级佣金加成比例（百分比）'],
                        ['exclusive_activity', 'boolean', '否', '是否享有专属活动'],
                        ['priority_settle', 'boolean', '否', '是否优先结算'],
                        ['exclusive_service', 'boolean', '否', '是否享有专属客服']
                    ]
                }
            ]
        },
        {
            title: '数据指标说明',
            content: `<b>统计卡片（4项指标）</b>：

- <b>代理总数</b>：注册代理总数<br>业务含义：反映渠道代理规模

- <b>活跃代理</b>：本月有推广业绩的代理数<br>业务含义：反映代理活跃程度<br>计算逻辑：本月有产生佣金的代理数量

- <b>本月佣金</b>：本月产生佣金总额<br>业务含义：反映本月渠道推广成本<br>数据来源：本月产生的佣金记录金额合计

- <b>待结算</b>：待结算佣金总额<br>业务含义：反映待支付渠道成本`
        },
        {
            title: '功能流程 - 佣金配置',
            content: `<b>全局佣金比例配置</b>：
- 默认佣金比例：所有演出的基础佣金比例，默认5%
- 按演出类型配置：可为音乐会/话剧/舞蹈/戏曲/儿童剧/音乐剧分别设置佣金比例
- 按演出单独配置：针对单个演出设置特殊佣金比例
- 优先级：演出单独配置 > 类型配置 > 默认配置

<b>佣金计算逻辑</b>：
- 基础佣金 = 订单实付金额 × 佣金比例
- 等级加成 = 基础佣金 × 等级加成比例
- 最终佣金 = 基础佣金 + 等级加成

<b>佣金生效规则</b>：
- 订单完成且过退款期后计入佣金
- 发生退款的订单扣除对应佣金
- 佣金状态流转：待结算→可结算→已结算`
        },
        {
            title: '功能流程 - 代理等级管理',
            content: `<b>等级体系配置</b>：
- 等级名称：如普通代理/铜牌/银牌/金牌/钻石
- 等级图标：各等级对应的图标
- 等级颜色：视觉区分标识
- 升级门槛：达到该等级所需条件
- 等级加成：该等级额外佣金加成比例

<b>升级条件类型</b>：
- 累计推广额：累计推广订单金额满指定金额<br>示例：银牌需累计推广满1万元
- 累计订单数：累计推广订单数满指定单数<br>示例：金牌需累计推广满50单
- 累计佣金：累计获得佣金满指定金额<br>示例：钻石需累计佣金满5000元
- 月活跃：连续多个月有推广业绩<br>示例：需连续3个月有业绩
- 组合条件：多条件同时满足

<b>等级权益</b>：
- 佣金加成：该等级额外佣金加成比例
- 专属活动：该等级专属推广活动
- 优先结算：高等级代理优先结算
- 专属客服：高等级代理专属客服支持

<b>等级变更记录</b>：
- 记录代理等级升降级历史
- 包含：变更前等级/变更后等级/变更原因/变更时间`
        },
        {
            title: '状态定义',
            content: `<b>代理状态</b>：
- <b>待审核</b>：代理申请待审核<br>流转条件：审核通过→正常；审核拒绝→已拒绝
- <b>正常</b>：代理正常推广中<br>流转条件：违规冻结→冻结；业绩不达标→等级变更
- <b>冻结</b>：代理被冻结<br>流转条件：解冻→正常；永久封禁→已注销
- <b>已拒绝</b>：代理申请被拒绝<br>流转条件：终态，不可变更
- <b>已注销</b>：代理账号已注销<br>流转条件：终态，不可变更

<b>佣金状态</b>：
- <b>待结算</b>：佣金已产生，未到结算条件
- <b>可结算</b>：满足结算条件，等待结算
- <b>结算中</b>：结算申请处理中
- <b>已结算</b>：佣金已打款
- <b>结算失败</b>：打款失败，需重新处理

<b>结算周期配置</b>：
- 结算周期：日结/周结/月结
- 最低结算金额：佣金满指定金额才可结算，默认100元
- 订单确认天数：订单完成后指定天数可结算（防止退款），默认7天
- 结算方式：自动结算/手动结算`
        },
        {
            title: '功能流程 - 代理管理',
            content: `<b>代理信息管理</b>：
- 基础信息：头像/昵称/手机号/微信号/注册时间
- 代理等级：当前等级/升级进度
- 推广信息：推广码/推广链接/推广海报

<b>业绩统计</b>：
- 推广数据：累计推广订单数/累计推广金额/本月推广数据
- 佣金数据：累计佣金收入/已结算佣金/待结算佣金/本月佣金收入
- 推广趋势：近30天推广数据趋势

<b>佣金明细</b>：
- 订单号：产生佣金的订单
- 演出名称：关联的演出项目
- 订单金额：订单实付金额
- 佣金比例：应用的佣金比例
- 佣金金额：实际佣金金额
- 状态：待结算/可结算/已结算

<b>结算记录</b>：
- 历史结算记录列表
- 结算金额/结算方式/结算时间/结算状态

<b>代理操作</b>：
- 调整等级：手动调整代理等级
- 冻结/解冻：冻结或恢复代理账号
- 重置密码：重置代理登录密码
- 发送通知：发送系统通知`
        }
    ]
  },

  'pc-admin/statistics.html': {
    title: "报表中心",
    subtitle: "多维度数据报表分析 - 16个业务维度",
    sections: [
        {
            title: '功能说明',
            content: `<p><strong>核心功能：</strong>报表中心提供多维度数据报表分析功能，涵盖演出票房、销售渠道、会员消费、商品销售、场馆运营、财务收支、充值卡、券包、优惠券、营销效果、用户行为、代理业务等维度。支持多维度筛选、数据导出、图表可视化和定时报表推送，为运营决策提供数据支持。</p>`
        },
        {
            title: '核心字段',
            tables: [
                {
                    title: '票房统计字段',
                    headers: ['字段名', '中文名', '类型', '必填', '说明'],
                    rows: [
                        ['show_id', 'number', '是', '演出ID'],
                        ['show_name', 'string', '是', '演出名称'],
                        ['show_type', 'string', '是', '演出类型'],
                        ['total_box', 'number', '是', '总票房收入'],
                        ['total_tickets', 'number', '是', '总出票数量'],
                        ['avg_occupancy', 'number', '是', '平均上座率（百分比）'],
                        ['avg_price', 'number', '是', '平均客单价'],
                        ['refund_count', 'number', '是', '退票数量'],
                        ['refund_rate', 'number', '是', '退票率（百分比）'],
                        ['date', 'string', '是', '统计日期']
                    ]
                },
                {
                    title: '渠道统计字段',
                    headers: ['字段名', '中文名', '类型', '必填', '说明'],
                    rows: [
                        ['channel', 'enum', '是', '销售渠道：小程序/PC/窗口售票/代理'],
                        ['total_orders', 'number', '是', '该渠道订单数量'],
                        ['total_sales', 'number', '是', '该渠道销售额'],
                        ['channel_ratio', 'number', '是', '渠道占比（百分比）'],
                        ['avg_price', 'number', '是', '该渠道平均客单价'],
                        ['date', 'string', '是', '统计日期']
                    ]
                }
            ]
        },
        {
            title: 'Tab功能说明',
            content: `<b>报表中心Tab导航 - 16个报表维度</b>：

<b>票务报表组</b>：
- 演出票房：各演出票房数据统计
- 销售渠道：各销售渠道数据对比
- 票品折扣：票品折扣活动效果统计
- 票务深度：票务数据深度分析

<b>用户报表组</b>：
- 会员消费：会员消费行为分析
- 用户行为：用户行为路径分析

<b>商品报表组</b>：
- 商品销售：商城商品销售统计

<b>场馆报表组</b>：
- 场馆运营：场馆使用率和运营数据

<b>财务报表组</b>：
- 财务收支：收入支出财务报表
- 充值卡：充值卡销售和使用统计
- 券包：券包销售和核销统计
- 优惠券：优惠券发放和使用统计

<b>营销报表组</b>：
- 营销效果：营销活动效果统计

<b>代理报表组</b>：
- 代理概览：代理整体数据统计
- 代理排行：代理业绩排行
- 佣金报表：佣金产生和结算统计`
        },
        {
            title: '数据指标说明 - 演出票房',
            content: `<b>核心指标</b>：
- 总票房：累计票房收入金额<br>业务含义：反映演出整体营收规模<br>数据来源：已完成订单的实付金额合计

- 总出票：累计出票数量<br>业务含义：反映演出实际销售数量

- 平均上座率：平均座位销售比例<br>业务含义：反映演出座位销售饱和度<br>计算逻辑：出票数量 ÷ 总座位数 × 100%

- 平均客单价：平均订单金额<br>业务含义：反映用户消费力度<br>计算逻辑：总票房 ÷ 订单数

<b>分析维度</b>：
- 票房趋势：按日/周/月展示票房走势
- 类型占比：各演出类型票房占比
- 剧院对比：各剧院票房对比
- 退票分析：退票数量和退票率`
        },
        {
            title: '数据指标说明 - 销售渠道',
            content: `<b>核心指标</b>：
- 总订单数：累计订单数量<br>业务含义：反映整体订单规模

- 总销售额：累计销售金额<br>业务含义：反映整体营收规模

- 渠道占比：各渠道销售额占比<br>业务含义：反映各渠道贡献度<br>计算逻辑：该渠道销售额 ÷ 总销售额 × 100%

- 客单价对比：各渠道平均客单价<br>业务含义：对比各渠道用户消费水平

<b>分析维度</b>：
- 渠道占比饼图：各渠道销售占比可视化
- 渠道趋势对比：各渠道销售趋势对比
- 渠道客单价对比：各渠道客单价对比`
        },
        {
            title: '数据指标说明 - 其他报表',
            content: `<b>会员消费报表</b>：
- 会员消费金额分布：不同消费金额区间的会员数量
- 会员等级消费对比：各等级会员消费金额对比
- 新老客消费占比：新客与老客消费金额占比
- 会员消费频次分析：会员平均消费次数
- 会员RFM分析：按最近消费/消费频次/消费金额分层

<b>商品销售报表</b>：
- 商品销售排行：按销售额/销量排序
- 分类销售占比：各分类销售占比
- 商品退货分析：退货数量和退货率
- 库存周转分析：库存周转效率

<b>场馆运营报表</b>：
- 场馆使用率：场馆实际使用比例
- 场馆票房排行：各场馆票房对比
- 场馆场次统计：各场馆场次数量
- 场馆上座率对比：各场馆上座率对比

<b>财务收支报表</b>：
- 收入明细：票房/商品/充值/其他收入
- 支出明细：退款/佣金/营销/其他支出
- 收支汇总：日/月/年收支汇总
- 利润分析：收入-支出=利润

<b>充值卡报表</b>：
- 发卡量统计：累计发卡数量
- 激活率分析：已激活卡片占比
- 核销金额统计：累计核销金额

<b>券包/优惠券报表</b>：
- 销售/发放统计：销售/发放数量
- 使用率分析：已使用占比
- ROI分析：投入产出比

<b>代理报表</b>：
- 代理增长趋势：代理数量变化趋势
- 代理等级分布：各等级代理占比
- 推广业绩排行：按推广金额/订单排行
- 佣金统计：佣金产生/结算/待结算金额`
        }
    ]
  }
};
// ===== 更新日志数据 =====
// 每次更新原型时，在此数组前面插入新记录
// entries.page 对应 devDocs 中的页面URL键名
const changelogData = [
    {
        date: '2026-06-22',
        entries: [
            {
                page: 'user-miniapp/coupon-receive.html',
                pageName: '领取优惠券',
                module: '优惠券',
                time: '17:00',
                content: `新增领取优惠券页面：用户扫描后台生成的优惠券二维码后，可查看优惠券详细信息（金额、使用门槛、有效期、适用范围、叠加规则），点击立即领取按钮完成领取，领取后按钮变为已领取状态`
            },
            {
                page: 'user-miniapp/order-confirm.html',
                pageName: '确认订单',
                module: '确认订单',
                time: '16:00',
                content: `积分抵扣UI重新设计：改为entry-row样式与套票/优惠券保持一致，显示可用积分和抵扣金额，用户只可选择用或不用（开关切换），可用积分基于订单原价计算不受观演券/优惠券变化影响`
            },
            {
                page: 'pc-admin/marketing-center.html',
                pageName: '营销中心',
                module: '优惠券',
                time: '16:00',
                content: `列表表头"已发放/已使用"改为"总发放/已领取"；数据弹窗卡片标签改为"已领取量"和"已使用"，使用率为领取数量和使用数量的比例`
            },
            {
                page: 'pc-admin/member-management.html',
                pageName: '会员管理',
                module: '积分管理',
                time: '15:30',
                content: `积分抵扣比例简化为只填写积分数（设置多少积分抵扣1元），去掉最低使用积分设置项`
            },
            {
                page: 'pc-admin/show-management.html',
                pageName: '演出管理',
                module: '演出项目',
                time: '15:30',
                content: `列表状态列移除"已下架"状态参数值；上架操作改为与下架一致的弹窗确认样式（绿色提示框含取消/确认按钮）`
            },
            {
                page: 'user-miniapp/coupons.html',
                pageName: '我的优惠券',
                module: '优惠券',
                time: '15:00',
                content: `按第一个优惠券字段模板统一所有优惠券结构；去掉领取后N天有效类型全部改为固定日期；去掉新人专享类型改为现金券+指定演出；指定演出标签可点击查看演出名称和场次详情弹窗`
            },
            {
                page: 'pc-admin/show-management.html',
                pageName: '演出管理',
                module: '场次管理',
                time: '14:30',
                content: `去掉场次管理tab的"搜索场次"搜索框`
            }
        ]
    },
    {
        date: '2026-06-13',
        entries: [
            {
                page: 'user-miniapp/seat-selection.html',
                pageName: '选座购票',
                module: '选座购票',
                time: '02:30',
                content: `优化早鸟票展示逻辑：早鸟票仅做展示不影响真实价格计算，价格明细中始终显示"票品折扣（早鸟票9.5折）"行及具体优惠金额，横幅显示"早鸟特惠 9.5折"及"-5%"徽章，标签栏和座位价格保持原价不变；会员折扣行改为"黄金会员9折"，始终显示具体优惠金额且不受套票影响`
            },
            {
                page: 'user-miniapp/seat-selection.html',
                pageName: '选座购票',
                module: '选座购票',
                time: '02:00',
                content: `修复首次选座bug：updatePackageEntry()添加null检查，防止DOM元素不存在时抛异常；修复getDiscountedPrice函数恢复为正确实现`
            },
            {
                page: 'user-miniapp/seat-selection.html',
                pageName: '选座购票',
                module: '选座购票',
                time: '01:30',
                content: `取消选座数量上限限制：getPurchaseLimit()返回999，不再限制最多选择4个座位`
            },
            {
                page: 'user-miniapp/order-confirm.html',
                pageName: '确认订单',
                module: '确认订单',
                time: '01:00',
                content: `新增早鸟票折扣行：费用明细中在会员折扣行上方增加"票品折扣（早鸟票9.5折）"，显示具体优惠金额；会员折扣行改为"黄金会员9折"`
            }
        ]
    },
    {
        date: '2026-06-14',
        entries: [
            {
                page: 'user-miniapp/member-center.html',
                pageName: '会员中心',
                module: '会员中心',
                time: '09:19',
                content: `会员权益改为横向滚动卡片展示（含已解锁/未解锁状态和可点击实体卡申请入口）；新增充值升级按钮跳转充值页；会员专属购票区重新设计：展示演出时间/地点/标签/价格，显示距公开售票倒计时和优先选座按钮；推荐有礼Banner移至第一屏，弹窗文案优化为800元原价1000元立省200元；生成海报改为打开海报预览弹窗（含AI背景图、新用户视角营销文案、价格对比、权益预览、二维码）；移除会员卡号显示/隐藏区域`
            },
            {
                page: 'user-miniapp/wallet.html',
                pageName: '钱包',
                module: '钱包',
                time: '09:19',
                content: `移除提现功能和累计充值/消费数据展示；新增成长值显示和升级提示（再充值¥1800升级钻石会员）；充值弹窗新增成长值比例说明（充1元得1成长值）和限时加倍活动信息（2026.06.01-06.30翻倍）；充值金额选项移除赠送金额只保留成长值说明；Quick Actions移除充值入口只保留交易记录`
            },
            {
                page: 'user-miniapp/transaction-record.html',
                pageName: '交易记录',
                module: '交易记录',
                time: '09:19',
                content: `页面标题改为"钱包交易记录"；移除所有提现记录；新增充值卡充值和充值卡消费两种交易类型；精简为每种交易类型一个示例（账户充值/购买演出票/充值卡充值/充值卡消费/订单退款/活动奖励）`
            },
            {
                page: 'user-miniapp/recharge-card-bind.html',
                pageName: '充值卡绑定',
                module: '充值卡绑定',
                time: '09:19',
                content: `新增"转入钱包"按钮与"绑定充值卡"并排显示；绑定和转入操作需验证充值卡密码（6位数字密码弹窗）；已绑定充值卡的转入操作改为确认弹窗无需密码；已激活有余额的卡片右侧新增转入小按钮`
            },
            {
                page: 'user-miniapp/coupons.html',
                pageName: '优惠券',
                module: '优惠券',
                time: '09:19',
                content: `根据后台优惠券配置字段重新设计数据展示：券类型改为现金券/折扣券/新人券；新增消费门槛、有效期模式（固定日期/领取后N天）、适用范围标签（全场通用/自营演出/指定演出）、叠加会员折扣标签、使用说明；去使用按钮添加光泽扫过动画`
            },
            {
                page: 'user-miniapp/order-ticket.html',
                pageName: '票务订单',
                module: '我的订单',
                time: '15:30',
                content: `重构我的订单页面为浅色主题；新增订单详情页入口（每个订单卡片可点击跳转，按钮stopPropagation阻止冒泡）；订单卡片根据状态传递不同参数（pending-pay/pending-verify/completed/refunded）`
            },
            {
                page: 'user-miniapp/order-ticket.html',
                pageName: '票务订单',
                module: '电子票夹',
                time: '15:30',
                content: `重构电子票夹为海报式封面设计（AI生成演出海报，3:2比例全宽展示）；统一深蓝渐变配色（#0A1628→#1a2d50）+金色强调色；单票展示同一订单所有座位；新增待核销/已使用二级tab；已使用票支持写评论（评论弹窗含文字+图片上传，发送后跳转演出详情页评论tab）`
            },
            {
                page: 'user-miniapp/order-detail.html',
                pageName: '订单详情',
                module: '订单详情',
                time: '15:30',
                content: `新增订单详情页面，根据URL参数status动态展示不同状态（待支付含倒计时、待核销、已完成、已退款含退款信息）；包含演出信息、座位信息、费用明细、订单信息卡片和底部操作栏`
            },
            {
                page: 'user-miniapp/profile.html',
                pageName: '个人中心',
                module: '个人中心',
                time: '15:30',
                content: `演出券入口名称改为"套票"；我的订单卡片移除"已退款"选项，按钮改为4列均匀分布；电子票夹按钮链接增加view=ticket参数自动切换到电子票夹tab`
            },
            {
                page: 'user-miniapp/address-manage.html',
                pageName: '地址管理',
                module: '地址管理',
                time: '15:30',
                content: `新增地址管理页面：3个示例地址卡片（含默认标签）、底部固定新增按钮、新增/编辑地址弹窗（收货人/手机号/地区选择/详细地址/默认开关）、删除确认弹窗、空状态展示`
            },
            {
                page: 'user-miniapp/points.html',
                pageName: '积分体系',
                module: '积分体系',
                time: '15:30',
                content: `重构积分页面：移除会员等级进度条（积分不用于等级提升）和积分兑换入口（无兑换功能）；新增累计获得/累计消耗统计、积分使用入口（抽奖+订单抵扣说明）、积分规则折叠面板、最近积分变动记录`
            },
            {
                page: 'user-miniapp/show-detail.html',
                pageName: '演出详情',
                module: '演出详情',
                time: '16:00',
                content: `评论列表第一条新增待审核评论数据（含"待审核"角标和淡橙金背景高亮）；新增URL参数tab=review自动切换到评论tab功能`
            }
        ]
    },
    {
        date: '2026-06-15',
        entries: [
            {
                page: 'user-miniapp/coupons.html',
                pageName: '优惠券',
                module: '优惠券',
                time: '01:00',
                content: `顶栏改为浅色配色方案（白色背景+深色文字+底部分割线）；修复标题无效字符`
            },
            {
                page: 'user-miniapp/points-flow.html',
                pageName: '积分明细',
                module: '积分明细',
                time: '01:00',
                content: `顶栏改为浅色配色方案（白色背景+深色文字+底部分割线）；修复标题无效字符`
            },
            {
                page: 'user-miniapp/wallet.html',
                pageName: '钱包',
                module: '钱包',
                time: '01:10',
                content: `重构钱包页面：去掉冻结金额和限时活动Banner；充值区域直接展示在页面中（不做弹窗），含金额网格和确认充值按钮（带光泽扫过动画）；新增夏日充值季活动横幅（橙红到金色渐变背景，全部x2倍成长值标签白底橙字18px超粗字体突出）；充值升级按钮链接改为钱包页面`
            },
            {
                page: 'user-miniapp/password-settings.html',
                pageName: '支付安全',
                module: '支付安全',
                time: '01:10',
                content: `新增支付安全页面：浅色主题；支付密码状态卡片（已设置/未设置两种状态）；6位数字密码设置/修改弹窗（底部滑入，两行输入新密码+确认密码）；实体卡管理开关（开启/关闭实体会员卡）；安全提示区域`
            },
            {
                page: 'user-miniapp/recharge-card-bind.html',
                pageName: '充值卡绑定',
                module: '充值卡绑定',
                time: '01:10',
                content: `顶栏改为浅色配色方案（白色背景+深色文字+底部分割线）；转入确认弹窗重设计为自定义弹窗（居中显示卡片信息和确认/取消按钮，替代系统confirm）`
            },
            {
                page: 'user-miniapp/transaction-record.html',
                pageName: '交易记录',
                module: '交易记录',
                time: '01:10',
                content: `顶栏改为浅色配色方案；交易记录按类型分为"账户记录"和"充值卡记录"两个tab；切换到充值卡记录时隐藏累计统计`
            },
            {
                page: 'user-miniapp/show-detail.html',
                pageName: '演出详情',
                module: '演出详情',
                time: '01:20',
                content: `移除hero区域右上角分享和更多按钮；立即购票按钮添加循环光泽扫过动画（shine keyframes）；新增底部分享弹窗（微信好友/朋友圈/复制链接/生成海报，底部滑入）`
            },
            {
                page: 'user-miniapp/message-service.html',
                pageName: '消息中心',
                module: '消息通知',
                time: '01:20',
                content: `完全重构消息通知页面：浅色主题；3个分类tab（全部/系统/活动）带滑动指示条；消息列表含未读红点脉冲动画；点击消息标记已读；AI客服悬浮按钮和聊天弹窗（底部滑入，含示例对话）`
            },
            {
                page: 'user-miniapp/order-ticket.html',
                pageName: '电子票夹',
                module: '电子票夹',
                time: '01:20',
                content: `每张票新增下载电子门票按钮`
            },
            {
                page: 'user-miniapp/show-list-detail.html',
                pageName: '演出列表',
                module: '演出列表',
                time: '01:20',
                content: `顶栏移除返回按钮，标题左对齐`
            },
            {
                page: 'user-miniapp/points.html',
                pageName: '积分中心',
                module: '积分体系',
                time: '01:20',
                content: `发布评论任务描述改为"每月限5次，本月已完成 2/5"；分享演出任务描述改为"每日限3次，今日已完成 3/3"`
            },
            {
                page: 'admin-miniapp/admin-home-verify.html',
                pageName: '管理员首页',
                module: '管理员首页',
                time: '01:30',
                content: `移除"今日场次"旁"查看全部"链接和整个快捷操作区域；验票弹窗改为满屏宽度底部滑入式（max-height 85vh）；新增多座位核销弹窗（演出信息+订单信息+5个座位列表+全选+确认核销按钮）；自定义勾选框设计（22px圆角方形，选中橙红背景+白色对勾）；核销成功后显示结果弹窗并重置状态`
            },
            {
                page: 'admin-miniapp/scan-verify.html',
                pageName: '扫码验票',
                module: '扫码验票',
                time: '01:25',
                content: `新增独立扫码验票页面：深色扫码界面（扫码框+四角呼吸动画+扫描线动画+模拟扫码按钮）；验票详情页（深蓝渐变演出信息卡片+5个座位核销列表+全选+确认核销按钮）；核销成功弹窗（绿色勾+缩放弹入动画）`
            }
        ]
    },
    {
        date: '2026-06-12',
        entries: [
            {
                page: 'admin-miniapp/login.html',
                pageName: '管理员登录',
                module: '登录',
                time: '23:45',
                content: `新增管理员端登录页面，仅支持账号密码登录，Canvas图形验证码（4位字母数字，排除易混淆字符），点击验证码可刷新，密码可见切换，登录后跳转管理员首页`
            },
            {
                page: 'user-miniapp/login.html',
                pageName: '登录',
                module: '登录',
                time: '23:30',
                content: `新增登录页面，支持微信一键登录，点击后弹出微信手机号授权弹窗（底部滑出式，显示应用名称和脱敏手机号），确认授权后显示加载状态并跳转首页`
            },
            {
                page: 'pc-admin/ticket-sales.html',
                pageName: '售票管理',
                module: '窗口售票',
                time: '22:50',
                content: `现金支付弹窗实收金额输入框旁新增"全额支付"按钮，点击后自动填入应付金额并计算找零`
            },
            {
                page: 'pc-admin/ticket-sales.html',
                pageName: '售票管理',
                module: '窗口售票',
                time: '22:30',
                content: `确认售票流程新增订单生成确认弹窗（显示订单摘要，确认后生成待支付订单并自动分配订单号）；任何环节关闭/取消弹窗均进入待支付订单页面（显示订单编号/演出信息/座位列表/15分钟倒计时，header和footer固定不滚动），支持取消订单或继续支付`
            },
            {
                page: 'pc-admin/show-management.html',
                pageName: '演出管理',
                module: '演出项目',
                time: '22:10',
                content: `列表操作栏新增标签管理按钮，支持设置/编辑/清除演出在小程序端的展示标签（标签名称+颜色），用于小程序演出列表和详情页的推荐标识展示`
            },
            {
                page: 'pc-admin/member-management.html',
                pageName: '会员管理',
                module: '积分管理',
                time: '21:30',
                content: `使用规则-积分抵扣比例固定为1积分=0.01元，输入框设为只读不可编辑`
            },
            {
                page: 'user-miniapp/show-detail.html',
                pageName: '演出详情',
                module: '演出详情',
                time: '21:00',
                content: `早鸟票横幅文案改为"前7天购票享8.5折优惠，每人限购5张"；评论Tab移除所有星级元素，增加官方回复内容`
            },
            {
                page: 'user-miniapp/order-confirm.html',
                pageName: '确认订单',
                module: '确认订单',
                time: '20:30',
                content: `座位标签显示票档名称（tier字段）；取票人信息增加身份证号输入框`
            },
            {
                page: 'user-miniapp/theater-detail.html',
                pageName: '剧院详情',
                module: '剧院详情',
                time: '20:00',
                content: `移除演出厅栏目`
            },
            {
                page: 'user-miniapp/theater-list.html',
                pageName: '剧院列表',
                module: '剧院列表',
                time: '19:30',
                content: `页面标题改为演出剧院；移除城市筛选栏；剧院卡片点击跳转剧院详情`
            },
            {
                page: 'user-miniapp/home.html',
                pageName: '首页',
                module: '首页',
                time: '19:00',
                content: `header-area::after移除background渐变；超值券包/热门推荐/演出剧院卡片阴影修复（增加scroll padding）；合作剧院栏目名称改为演出剧院`
            },
            {
                page: 'pc-admin/member-management.html',
                pageName: '会员管理',
                module: '积分管理',
                time: '18:00',
                content: `任务配置：发表评论/分享演出增加每日次数上限设置，移除邀请好友任务；过期规则：过期结算方式仅保留"按获取月份逐月过期"并禁用下拉框；任务配置/使用规则/过期规则均增加配置保存时间展示`
            },
            {
                page: 'pc-admin/member-management.html',
                pageName: '会员管理',
                module: '会员政策',
                time: '17:30',
                content: `等级配置卡片删除/编辑按钮改为右上角圆形半透明图标按钮；成长值配置顺序调整（推荐会员移到最后）；新增等级按钮改为白底虚线框卡片样式；成长值配置增加配置保存时间展示`
            },
            {
                page: 'user-miniapp/home.html',
                pageName: '首页',
                module: '首页',
                time: '17:00',
                content: `超值券包卡片阴影修复（增加padding），点击卡片跳转券包详情；合作剧院卡片点击跳转剧院详情；热门推荐演出卡片点击直达演出详情`
            },
            {
                page: 'user-miniapp/theater-detail.html',
                pageName: '剧院详情',
                module: '剧院详情',
                time: '16:30',
                content: `新增剧院详情页面，包含剧院大图、信息统计、演出厅列表、当前演出列表，支持URL参数切换不同剧院`
            },
            {
                page: 'user-miniapp/order-confirm.html',
                pageName: '确认订单',
                module: '确认订单',
                time: '16:00',
                content: `新增确认订单页面，包含演出信息、已选座位、费用明细、取票人信息、支付方式，底部固定确认支付栏`
            },
            {
                page: 'user-miniapp/seat-selection.html',
                pageName: '选座购票',
                module: '选座购票',
                time: '15:30',
                content: `确认选座按钮点击后跳转确认订单页面，携带演出名称/时间/场馆/座位数据`
            },
            {
                page: 'pc-admin/marketing-center.html',
                pageName: '营销中心',
                module: '优惠券',
                time: '15:00',
                content: `优惠券列表有效期列增加"领取后N天"显示格式（绿色标签），区分固定日期范围和动态天数两种有效期类型`
            }
        ]
    },
    {
        date: '2026-06-16',
        entries: [
            {
                page: 'pc-admin/marketing-center.html',
                pageName: '营销中心',
                module: '优惠券',
                time: '01:00',
                content: `新增发券渠道选项（扫码领取/会员权益），选择会员权益时发放数量禁用并显示"不限"，适用范围强制锁定"全部演出可用"，有效期强制锁定"领取后N天"；列表表头新增"发券渠道"列，5条示例数据区分扫码领取（蓝色）和会员权益（绿色）；筛选栏新增"全部渠道"下拉框`
            },
            {
                page: 'pc-admin/member-management.html',
                pageName: '会员管理',
                module: '会员政策',
                time: '01:00',
                content: `等级配置编辑弹窗增加"选择会员等级"下拉框（L1-L10），选择后自动填充名称/成长值范围/折扣/颜色；新增等级弹窗权益项与编辑弹窗完全同步（基础权益：积分加成倍数/每月优惠券/生日福利；购票权益：优先购票；服务权益：专属客服/VIP入场通道/会员卡寄送；专属特权：后台参观/年度答谢活动，共9项）；充值年卡卡片改为"尊享会员"，年费改为"成长值 50,000+"；所有卡片等级名称后增加L参数徽章（L1-L5）；卡片权益严格对应弹窗可设置项，普通会员仅显示折扣和1.0倍积分加成`
            }
        ]
    },
    {
        date: '2026-06-17',
        entries: [
            {
                page: 'pc-admin/show-management.html',
                pageName: '演出管理',
                module: '演出项目',
                time: '01:00',
                content: `新建/编辑步骤2移除可用库存列，提示票价不可修改，限购数量编辑可修改；新建/编辑步骤3开票时间卡片改为上架与开票，合并上下架开关；列表状态更新为未开票/售票/已下架/已结束四种，7行数据覆盖全部状态；上下架按钮每次操作弹确认提示，图标统一为toggle-on/toggle-off`
            },
            {
                page: 'user-miniapp/show-detail.html',
                pageName: '演出详情',
                module: '场次选择',
                time: '01:00',
                content: `场次状态按库存比例定义（>80%充足/>50%热卖中/>20%余票紧张/<=19%即将售罄/0已售罄），卡片未选中灰色背景，已售罄场次不可选`
            }
        ]
    },
    {
        date: '2026-06-18',
        entries: [
            {
                page: 'index.html',
                pageName: '设计总览',
                module: '设计总览',
                time: '01:00',
                content: `流程图弹窗新增"成长值与积分获取及退款扣除流程"导航项，图片使用原图不压缩渲染`
            }
        ]
    },
    {
        date: '2026-06-17',
        entries: [
            {
                page: 'pc-admin/show-management.html',
                pageName: '演出管理',
                module: '演出项目',
                time: '01:00',
                content: `新建/编辑步骤2移除可用库存列，提示票价不可修改，限购数量编辑可修改；新建/编辑步骤3开票时间卡片改为上架与开票，合并上下架开关；列表状态更新为未开票/售票/已下架/已结束四种，7行数据覆盖全部状态；上下架按钮每次操作弹确认提示，图标统一为toggle-on/toggle-off`
            },
            {
                page: 'user-miniapp/show-detail.html',
                pageName: '演出详情',
                module: '场次选择',
                time: '01:00',
                content: `场次状态按库存比例定义（>80%充足/>50%热卖中/>20%余票紧张/<=19%即将售罄/0已售罄），卡片未选中灰色背景，已售罄场次不可选`
            },
            {
                page: 'pc-admin/marketing-center.html',
                pageName: '营销中心',
                module: '票品折扣',
                time: '01:00',
                content: `数据弹窗转化率改为受益用户，使用记录增加用户昵称和手机号（不脱敏），移除用户和实付字段，增加翻页；数据卡片增加带动订单金额展示`
            }
        ]
    },
    {
        date: '2026-06-11',
        entries: [
            {
                page: 'pc-admin/ticket-sales.html',
                pageName: '售票管理',
                module: '窗口售票',
                time: '23:00',
                content: `新增会员卡信息模块（默认显示，支持弹窗读取会员卡）；订单摘要增加票品折扣/早鸟票/会员卡折扣减免金额展示；左侧场次列表增加折扣类型标签（满减/折扣/早鸟）；底部图例栏增加当前场次优惠信息提示；移除底部员工信息状态栏；页面布局改为内容撑高滚动；已选座位移除按钮简化为图标`
            },
            {
                page: 'index.html',
                pageName: '设计总览',
                module: '设计总览',
                time: '22:00',
                content: `导航栏新增流程图按钮，支持左侧导航列表和右侧图片展示区，图片支持放大缩小和拖动`
            },
            {
                page: 'pc-admin/marketing-center.html',
                pageName: '营销中心',
                module: '优惠券',
                time: '21:00',
                content: `新建/编辑/查看弹窗叠加设置移除早鸟票叠加选项`
            },
            {
                page: 'pc-admin/order-management.html',
                pageName: '订单管理',
                module: '票务订单',
                time: '20:00',
                content: `批量导入按钮改为珊瑚红色；订单详情演出信息移除票档字段，新增演出厅字段；支付减免tab统一表格样式，表头"优惠类型"改为"减免类型"，始终显示5种减免类型行（票品折扣/优惠券/券包/会员折扣/积分抵扣）；移除订单详情打印订单按钮；出票日志增加取票码模拟数据；付款弹窗电子票手机号输入框增加图标和提示文案；申请退款弹窗新增手续费比例选择（0%/5%/10%），提示文案改为仅返还实付/钱包/充值卡金额`
            },
            {
                page: 'pc-admin/marketing-center.html',
                pageName: '营销中心',
                module: '优惠券',
                time: '19:00',
                content: `新建/编辑/查看弹窗的有效期设置，选择"领取后N天"模式时，时间范围改为"有效天数"输入框（单位：天），固定日期模式保持生效/失效时间输入框`
            },
            {
                page: 'pc-admin/marketing-center.html',
                pageName: '营销中心',
                module: '票品折扣',
                time: '18:00',
                content: `折扣类型新增早鸟票（折扣比例/最大优惠金额/持续天数，不设活动时间）；关联演出移除全部演出选项；列表新增关联演出筛选；列表新增一条早鸟票数据`
            },
            {
                page: 'pc-admin/show-management.html',
                pageName: '演出管理',
                module: '演出项目',
                time: '17:00',
                content: `新建/编辑步骤3移除早鸟票设置；列表操作栏新增票品折扣按钮，点击跳转营销中心票品折扣Tab`
            }
        ]
    },
    {
        date: '2026-06-10',
        entries: [
            {
                page: 'user-miniapp/home.html',
                pageName: '首页',
                module: '首页',
                time: '20:00',
                content: `重构侧边栏为二级标签结构`
            },
            {
                page: 'pc-admin/order-management.html',
                pageName: '订单管理',
                module: '订单管理',
                time: '19:00',
                content: `重构侧边栏为二级标签结构`
            },
            {
                page: 'pc-admin/show-management.html',
                pageName: '演出管理',
                module: '演出管理',
                time: '18:00',
                content: `重构侧边栏为二级标签结构（功能描述/交互说明/核心字段）`
            },
            {
                page: 'index.html',
                pageName: '设计总览',
                module: '设计总览',
                time: '17:00',
                content: `新增更新日志弹窗和侧边栏更新日志Tab；新增售票管理与订单管理完整流程图`
            },
            {
                page: 'pc-admin/marketing-center.html',
                pageName: '营销中心',
                module: '优惠券',
                time: '16:00',
                content: `券类型改为现金券/折扣券；新增消费门槛、适用范围（演出-场次层级多选）、叠加设置（早鸟票/会员折扣/票品折扣）；编辑弹窗按状态控制可编辑内容；列表操作栏新增数据/二维码按钮；移除底部二维码区域和领券二维码按钮；数据弹窗增加领取使用明细（含领取时间/订单号）、搜索筛选和分页；已过期状态仅可查看不可编辑不可复制`
            },
            {
                page: 'pc-admin/member-management.html',
                pageName: '会员管理',
                module: '会员管理',
                time: '15:00',
                content: `会员编辑移除会员等级和会员卡状态；详情移除会员卡状态；会员卡管理取消审核/拒绝功能，状态筛选改为待发货/已发货/已锁定/已注销`
            }
        ]
    }
];

const defaultDevDoc = {
    title: '页面开发说明',
    subtitle: '该页面文档待完善',
    sections: [
        {
            title: '📝 待完善',
            content: `<p>该页面的详细开发说明尚未配置。</p>
            <p>请补充以下信息：</p>
            <ul>
                <li>功能说明</li>
                <li>API接口定义</li>
                <li>数据模型</li>
                <li>交互说明</li>
            </ul>`
        }
    ]
};
