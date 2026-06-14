# 侧边栏与更新日志 Skill

> 本规范定义了右侧栏文档的标准结构、排版格式和内容要求，以及每次更新HTML原型后同步更新日志和侧边栏的执行流程。
> 每次更新页面原型或侧边栏时，必须严格遵循本规范。

---

# 第一部分：侧边栏规范

## 一、整体结构

### 1.1 二级标签架构

每个页面的侧边栏采用 **一级标签 + 二级标签** 结构：

- **一级标签**：按功能模块划分（如"演出项目"、"场次管理"、"订单列表"等）
- **二级标签**：每个一级标签下固定3个：
  1. **功能描述**
  2. **交互说明**
  3. **核心字段**

### 1.2 数据结构格式

```javascript
'页面URL': {
    title: '页面标题',
    subtitle: '页面副标题 - 简要说明',
    sections: [
        {
            title: '一级标签名称',
            sections: [
                {
                    title: '功能描述',
                    content: `<p>...</p><ul>...</ul>`
                },
                {
                    title: '交互说明',
                    content: `<p>...</p><ul>...</ul>`
                },
                {
                    title: '核心字段',
                    noTableWrap: true,
                    tables: [
                        {
                            title: '表格标题',
                            headers: ['字段名', '类型', '必填', '说明'],
                            rows: [
                                ['field_name', 'string', '是', '字段说明'],
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
```

### 1.3 关键规则

- **核心字段**：4列格式（字段名/类型/必填/说明），**不要中文名列**
- **核心字段**：设置 `noTableWrap: true`，表格不包裹 `.prd-section` div，但每组表格有 `.table-title` 标题
- **类型**使用：`string` / `number` / `boolean` / `enum` / `array` / `object`
- **必填**使用：`是` / `否`

---

## 二、功能描述格式

### 2.1 结构

```
<p><strong>核心功能：</strong>[一段话说清核心逻辑，不涉及UI细节]</p>
<p><strong>业务说明：</strong></p>
<ul>
  <li><strong>前置条件：</strong>[使用前需满足的条件：权限要求、依赖模块等]</li>
  <li><strong>功能实现逻辑：</strong>
    <ul>
      <li>[逻辑点1：数据来源、处理流程]</li>
      <li>[逻辑点2：能力边界、特殊规则]</li>
      <li>[逻辑点3：状态流转、计算规则]</li>
    </ul>
  </li>
  <li><strong>权限控制：</strong>[各操作的权限要求]</li>
  <li><strong>数据约束：</strong>[数据规则、校验规则、不可操作条件]</li>
  <li><strong>能力边界：</strong>[不支持的功能、限制说明]</li>
</ul>
```

### 2.2 写作要求

- **核心功能**：1-2段话，说清楚"做什么"和"怎么做"，不描述UI细节
- **前置条件**：必须明确权限和依赖模块
- **功能实现逻辑**：用嵌套列表，每项一个逻辑点，简洁明了
  - ⚠️ **数据说明要求**：涉及统计卡片、图表、汇总数据时，必须说明：
    1. **数据来源**：数据从哪里来（如"统计时间范围内所有已支付订单"）
    2. **计算方式**：如何计算得出（如"占比 = 该渠道销售额 ÷ 总销售额 × 100%"）
    3. **汇总逻辑**：多维度数据如何汇总（如"本周票房总额 = 线上自助票房 + 线下窗口票房 + 钱包支付票房"）
  - 示例：`票房分析：百分比堆积柱状图展示线上自助/线下窗口/钱包支付占比（占比 = 该渠道票房 ÷ 总票房 × 100%），顶部3张汇总卡片分别为：线上自助票房金额（统计时间范围内所有线上自助渠道已支付订单的实付金额之和）、线下窗口票房金额（统计时间范围内所有线下窗口渠道已支付订单的实付金额之和）、钱包支付票房金额（统计时间范围内所有钱包支付渠道已支付订单的实付金额之和），本周票房总额 = 三者之和`
- **权限控制**：列出各操作对应的权限名称
- **数据约束**：列出校验规则和不可操作条件
- **能力边界**：明确说明"不支持xxx"

---

## 三、交互说明格式

### 3.1 结构

每个操作按以下结构描述：

```
<p><strong>[操作名称]</strong></p>
<ul>
  <li><strong>触发：</strong>[用户做什么触发这个操作，包含按钮样式/位置/图标]</li>
  <li><strong>执行中：</strong>[进行中的UI状态：弹窗名称、loading、字段回填等]</li>
  <li><strong>成功：</strong>[成功后的结果和页面变化，Toast提示内容]</li>
  <li><strong>失败：</strong>[失败后的提示方式和可恢复操作]</li>
  <li><strong>边界条件：</strong>[特殊输入或状态下的处理：空值、超长、无权限、状态限制等]</li>
</ul>
```

### 3.2 写作要求

- **触发**：描述具体的UI元素（按钮文字、图标class、弹窗ID、位置）
- **执行中**：描述弹窗/表单的名称和状态
- **成功**：描述页面变化和提示信息
- **失败**：描述错误提示方式
- **边界条件**：列出所有特殊情况的处理方式
- 操作之间用空行分隔

---

## 四、核心字段格式

### 4.1 表格规则

- 4列：字段名 / 类型 / 必填 / 说明
- **不要中文名列**
- 每组字段有标题（通过 `table.title` 设置）
- `noTableWrap: true` 去掉外层div包裹

### 4.2 字段命名规范

- 使用 snake_case：`show_id`、`order_no`、`create_time`
- ID字段：`xxx_id`
- 名称字段：`name`、`title`
- 状态字段：`status`（enum类型）
- 时间字段：`xxx_time` 或 `xxx_at`
- 金额字段：`xxx_amount`、`xxx_price`、`xxx_revenue`
- 数量字段：`xxx_count`、`xxx_num`、`total_xxx`
- 布尔字段：`is_xxx`、`has_xxx`
- 图片字段：`xxx_image`、`xxx_url`、`xxx_icon`

### 4.3 类型使用规范

| 类型 | 使用场景 | 示例 |
|------|----------|------|
| `string` | 文本、URL、时间字符串 | title, cover_url, create_time |
| `number` | 数值、ID | show_id, price, count |
| `boolean` | 是/否开关 | is_enabled, has_layout |
| `enum` | 固定选项 | status, type, pay_method |
| `array` | 列表、数组 | images, tags, member_levels |
| `object` | 嵌套对象 | buyer_info, address |

### 4.4 说明列写作规范

- 简洁明了，说明字段含义和用途
- enum类型需列出所有选项值：`状态：草稿/售票中/已结束`
- 金额字段标注单位：`票价（元）`
- 时间字段标注格式：`格式 YYYY-MM-DD HH:mm`
- 只读字段标注：`只读，由xxx自动计算`

---

## 五、一级标签划分规则

### 5.1 划分原则

- **PC管理后台**：一级标签 = **页面内的主要一级Tab**（如订单管理中的"票务订单"、"充值订单"、"券包订单"），严格与页面内主Tab一一对应
  - ⚠️ **注意**：不是页面导航标签，而是页面内容区顶部的主Tab切换按钮
  - 例如：订单管理页面有4个主Tab（票务订单/充值订单/券包订单/商城订单），侧边栏就对应4个一级标签
- **用户小程序 / 代理小程序 / 管理员小程序**：一级标签固定为 **功能描述 / 交互说明 / 核心字段**，相当于PC端的二级标签直接提升为一级标签
  - 整个页面作为一个功能单元，不再按页面内的子模块拆分一级标签
- 如果页面没有主Tab也没有明显模块划分，则整个页面作为一个一级标签

### 5.2 常见一级标签

| 平台 | 页面类型 | 一级标签来源 |
|------|----------|-------------|
| PC管理后台 | Tab多面板页 | **直接使用原型中的主Tab名称** |
| PC管理后台 | 单功能页 | 直接用页面标题 |
| 用户小程序 | 所有页面 | **固定为：功能描述 / 交互说明 / 核心字段** |
| 代理/管理员小程序 | 所有页面 | **固定为：功能描述 / 交互说明 / 核心字段** |

---

## 六、参考示例

以 `pc-admin/show-management.html` 为标准参考：

- 一级标签：演出项目 / 场次管理 / 场馆管理 / 场馆座位配置 / 评论管理
- 每个一级标签下：功能描述 + 交互说明 + 核心字段
- 功能描述包含：核心功能段落 + 前置条件 + 功能实现逻辑（嵌套列表）+ 权限控制 + 数据约束 + 能力边界
- 交互说明：每个操作按 触发/执行中/成功/失败/边界条件 描述
- 核心字段：4列表格，noTableWrap模式，每组有标题

---

# 第二部分：更新日志与侧边栏同步流程

> 每次更新HTML原型时，在完成HTML文件修改后，**必须**执行以下流程同步更新日志和侧边栏说明。

---

## 步骤1：确定变更信息

从本次任务中提取：
- **变更的页面列表**：哪些HTML文件被修改了
- **每个页面的变更描述**：简洁说明改了什么（一句话）

---

## 步骤2：更新 changelogData

打开 `data.js`，找到 `const changelogData = [` 数据数组。

**插入规则：**
1. 获取今天的日期（格式 `YYYY-MM-DD`），**使用北京时间（Asia/Shanghai）**，注意 sandbox 环境系统时区为 UTC，需手动换算或使用 `new Date().toLocaleString('zh-CN', {timeZone: 'Asia/Shanghai'})` 获取正确日期
2. 检查数组中是否已有今天的日期条目
3. 如果已有今天的条目，在其中追加 entries
4. 如果没有，在数组最前面创建新条目

**拆分规则（重要）：**
- 同一页面同一日期内，如果涉及多个功能模块（一级标签），必须**每个模块单独一条 entry**，不可合并为一条
- `module` 字段填写该页面内的一级标签名称（即功能模块名），与 devDocs 中的 `sections[].title` 一致
- 单功能页面（无一级标签划分）的 `module` 填写页面标题即可

**覆盖规则：**
- 如果新变更与已有条目的同一 `page` + 同一 `module` 相关，则**更新**该条目的 `content`（替换旧的描述）
- 如果是同一页面但不同模块的变更，则**追加**新 entry
- 如果是新的页面变更，则**追加**新 entry

**数据格式：**
```javascript
{
    date: '2026-06-10',  // 今天日期
    entries: [
        {
            page: 'pc-admin/show-management.html',  // 文件路径（与devDocs键名一致）
            pageName: '演出管理',                     // 页面中文名
            module: '场次管理',                       // 功能模块名（一级标签），单功能页填页面标题
            time: '14:30',                            // 更新时间（HH:mm格式），可选
            content: '新增批量删除功能，支持勾选多个场次一键删除'  // 该模块的变更描述
        },
        {
            page: 'pc-admin/show-management.html',
            pageName: '演出管理',
            module: '演出项目',
            content: '新增演出状态筛选，支持按草稿/售票中/已结束筛选'
        },
        {
            page: 'pc-admin/marketing-center.html',
            pageName: '营销中心',
            module: '优惠券',
            content: '券类型改为现金券/折扣券；新增叠加设置和演出场次多选'
        },
        {
            page: 'user-miniapp/home.html',           // 单功能页示例
            pageName: '首页',
            module: '首页',                            // 单功能页 module 填页面标题
            content: '修改轮播图自动播放间隔从4秒改为5秒'
        }
    ]
}
```

**变更描述写作规范：**
- **简洁**：一句话说清楚改了什么
- **具体**：说明具体的模块/功能/组件名称
- **动作开头**：使用"新增/修改/优化/修复/重构/删除"等动词
- **模块粒度**：每个 entry 只描述一个功能模块的变更，不同模块分开写

好的示例：
- `新增场次管理Tab的批量删除功能`（模块：场次管理）
- `修改轮播图自动播放间隔从4秒改为5秒`（模块：首页）
- `优惠券券类型改为现金券和折扣券，新增叠加设置`（模块：优惠券）
- `修复选座页面座位状态显示错误`（模块：选座购票）

不好的示例：
- `更新了页面`（太笼统）
- `修改了一些bug`（不具体）
- `按照PRD修改了演出管理的所有内容`（太宽泛，应拆分为场次管理、演出项目等模块分别描述）

---

## 步骤3：检查并同步侧边栏说明（关键步骤）

每次页面更新后，**必须**检查并同步侧边栏说明。

### 3.1 分析当前页面的 devDocs

在 `data.js` 中找到对应页面的 `devDocs` 数据，检查：
1. **一级标签**是否符合规范（PC管理后台按页面主Tab划分，小程序按功能模块划分，见第一部分第五章）
2. **二级标签**是否为：功能描述、交互说明、核心字段（以及保留的"更新日志"）

### 3.2 更新策略

**情况A：一二级标签符合规范**
- 按本次页面更新的内容，**局部调整**对应的 sections
- 只修改变更涉及的功能描述、交互说明或核心字段
- **保留**"更新日志"子Tab（由 updateSidebar 函数动态生成，不需要在数据中硬编码）

**情况B：一二级标签不符合规范**
- 按第一部分的规范重新设计一级标签结构
- 全量替换该页面的 `devDocs.sections`
- 确保每个一级标签下包含：功能描述、交互说明、核心字段

### 3.3 重要原则：区分 UI 变更与数据逻辑变更

更新侧边栏时，必须明确区分 **UI 界面变更** 和 **数据流转逻辑变更**：

| 变更类型 | 影响范围 | 更新方式 |
|----------|----------|----------|
| **UI 界面变更** | 按钮显示/隐藏、筛选选项、交互流程 | 仅更新对应的交互说明段落 |
| **数据逻辑变更** | 状态流转、字段定义、业务规则 | 同步更新功能描述 + 核心字段表格 |

**示例场景：**
- UI 上移除"审核"按钮 → 仅交互说明移除"审核"段落
- 但数据流转仍是"待审核→已审核→已发货" → 功能描述和核心字段**保留完整状态流转**
- 筛选选项去掉某些状态 → 仅筛选条件字段的说明变更，列表字段的状态枚举**保持不变**

**检查清单：**
- [ ] 如果只改 UI，确认没有误删数据逻辑相关的描述
- [ ] 如果改数据逻辑，确认功能描述、交互说明、核心字段三者一致
- [ ] 检查状态流转描述是否与数据库逻辑一致

### 3.4 侧边栏更新日志子Tab

每个一级标签下除了固定的3个二级标签（功能描述/交互说明/核心字段）外，还会动态生成第4个二级标签 **"更新日志"**。

**生成规则：**
- "更新日志"子Tab由 `updateSidebar` 函数自动生成，不需要在 devDocs 数据中硬编码
- 函数从 `changelogData` 中筛选当前页面 + 当前模块（一级标签）的记录，按日期倒序展示
- 如果某一级标签下没有对应的更新日志记录，则不显示该子Tab

**数据来源：**
- 从 `changelogData` 数组中匹配 `page`（当前页面URL）和 `module`（当前一级标签名称）
- 匹配到的记录按 `date` 倒序排列，展示日期和变更描述

**渲染格式：**
```
更新日志
├── 2026-06-10 14:30  优惠券Tab重构：券类型改为现金券/折扣券...
├── 2026-06-10 11:20  新增叠加设置开关
├── 2026-06-08 16:00  初始版本创建
└── ...
```

> 每条记录显示"日期 时间"（如 `2026-06-10 14:30`），按日期+时间倒序排列，最新的在最上面。
> 如果没有 `time` 字段，则只显示日期。

**与 changelogData 的对应关系：**

| changelogData 字段 | 侧边栏更新日志用途 |
|---|---|
| `date` | 显示为日志条目的日期 |
| `time` | 显示为日志条目的时间（HH:mm格式），与date拼接显示 |
| `page` | 用于匹配当前页面（精确匹配 devDocs 键名） |
| `module` | 用于匹配当前一级标签（精确匹配 `sections[].title`） |
| `content` | 显示为变更描述文本 |

---

## 步骤4：验证

在浏览器中打开 `index.html`，确认：
1. 导航栏"更新日志"按钮可点击
2. 弹窗表格显示最新记录
3. 打开任意已更新的页面，侧边栏各Tab下有"更新日志"子Tab
4. 点击"更新日志"子Tab能看到该页面的变更记录
5. 侧边栏一级标签和二级标签符合规范
6. **数据逻辑一致性**：功能描述中的状态流转、核心字段中的枚举值与实际业务逻辑一致（不因UI变更而误改）

---

## 页面名称对照表

| page (URL键名) | pageName |
|----------------|----------|
| user-miniapp/home.html | 首页 |
| user-miniapp/show-list-detail.html | 演出列表 |
| user-miniapp/show-detail.html | 演出详情 |
| user-miniapp/seat-selection.html | 选座购票 |
| user-miniapp/search.html | 搜索 |
| user-miniapp/member-center.html | 会员中心 |
| user-miniapp/coupons.html | 优惠券 |
| user-miniapp/coupon-package.html | 券包详情 |
| user-miniapp/points.html | 积分体系 |
| user-miniapp/points-flow.html | 积分明细 |
| user-miniapp/wallet.html | 钱包 |
| user-miniapp/lottery.html | 积分抽奖 |
| user-miniapp/profile.html | 个人中心 |
| user-miniapp/profile-edit.html | 个人信息编辑 |
| user-miniapp/privacy-settings.html | 隐私设置 |
| user-miniapp/preference-settings.html | 偏好设置 |
| user-miniapp/real-name-auth.html | 实名认证 |
| user-miniapp/message-service.html | 消息服务 |
| user-miniapp/order-ticket.html | 票务订单 |
| user-miniapp/product-order.html | 商品订单 |
| user-miniapp/shop.html | 商城 |
| user-miniapp/theater-list.html | 剧院列表 |
| user-miniapp/theater-detail.html | 剧院详情 |
| user-miniapp/order-confirm.html | 确认订单 |
| user-miniapp/my-packages.html | 我的券包 |
| user-miniapp/physical-card-apply.html | 实体卡申请 |
| user-miniapp/recharge-topup.html | 充值 |
| user-miniapp/recharge-card-bind.html | 充值卡绑定 |
| user-miniapp/transaction-record.html | 交易记录 |
| user-miniapp/agent-miniapp.html | 代理中心 |
| user-miniapp/agent-miniapp-commission.html | 佣金管理 |
| user-miniapp/agent-miniapp-poster.html | 海报生成 |
| user-miniapp/agent-miniapp-qrcode.html | 推广二维码 |
| user-miniapp/agent-miniapp-rules.html | 代理规则 |
| user-miniapp/agent-miniapp-stats.html | 代理统计 |
| user-miniapp/agent-miniapp-withdraw.html | 提现 |
| pc-admin/dashboard.html | 数据看板 |
| pc-admin/login.html | 登录 |
| pc-admin/login-v2.html | 登录V2 |
| pc-admin/show-management.html | 演出管理 |
| pc-admin/ticket-sales.html | 售票管理 |
| pc-admin/order-management.html | 订单管理 |
| pc-admin/member-management.html | 会员管理 |
| pc-admin/marketing-center.html | 营销中心 |
| pc-admin/ai-marketing.html | AI智能营销 |
| pc-admin/banner-management.html | 轮播图管理 |
| pc-admin/product-service.html | 商品管理 |
| pc-admin/activity-decoration.html | 运营活动 |
| pc-admin/statistics.html | 数据统计 |
| pc-admin/agent-management.html | 代理管理 |
| pc-admin/agent-miniapp.html | 代理小程序 |
| pc-admin/agent-miniapp-commission.html | 代理佣金 |
| pc-admin/agent-miniapp-poster.html | 代理海报 |
| pc-admin/agent-miniapp-qrcode.html | 代理二维码 |
| pc-admin/agent-miniapp-rules.html | 代理规则 |
| pc-admin/agent-miniapp-stats.html | 代理统计 |
| pc-admin/agent-miniapp-withdraw.html | 代理提现 |
| admin-miniapp/admin-home-verify.html | 核验首页 |
| index.html | 设计总览 |
