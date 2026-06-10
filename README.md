# 手作教程与材料商城 API

```bash
cp .env.example .env
docker compose up -d --build
```

手作教程与材料商城 API 为手工爱好者平台提供教程、材料商品、购物车订单、评价收藏和运营统计接口。

## 项目主要功能

- 教程创建、审核状态流转、分类难度检索和热度推荐。
- 材料商品与多 SKU 管理，支持库存、规格、图片字段。
- 购物车、下单和订单状态流转。
- 教程评分评论、材料晒单评价、关注作者与收藏。
- 教程浏览排行、商品销量排行、用户活跃度统计。

## 本地开发

```bash
cd backend
npm install
npm run start:dev
```

API 文档地址：http://localhost:19411/api/docs

## 技术栈

| 类型 | 技术 |
| --- | --- |
| 后端 | NestJS + TypeScript |
| ORM | TypeORM |
| 数据库 | MySQL 8.0 |
| 认证 | JWT |
| 文档 | Swagger |

## 目录结构

```text
.
├── backend
│   ├── src
│   │   ├── common
│   │   ├── constants
│   │   ├── config
│   │   └── modules
│   └── Dockerfile
├── database
│   └── init.sql
└── docker-compose.yml
```

## 主要 API

- `POST /api/tutorials` 创建教程
- `GET /api/tutorials` 搜索教程
- `GET /api/tutorials/hot` 热门教程推荐
- `POST /api/products` 创建材料商品
- `GET /api/products` 商品列表
- `POST /api/orders/cart/items` 加入购物车
- `POST /api/orders` 创建订单
- `PATCH /api/orders/:id/status` 更新订单状态
- `POST /api/reviews/tutorials/:id` 评价教程
- `GET /api/stats/tutorial-views` 教程浏览排行

## 环境变量

| 变量 | 说明 |
| --- | --- |
| `COMPOSE_PROJECT_NAME` | Compose 项目名，默认 `craftapi` |
| `MYSQL_*` | MySQL 连接配置 |
| `JWT_SECRET` | JWT 签名密钥 |
| `UPLOAD_DIR` | 本地图片目录 |

## License

MIT
