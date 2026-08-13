# MCP Market

基于 React 19 + TypeScript + Vite 的 MCP Market 前端应用，汇集 MCP 服务器与 AI 技能，使用 MUI 7 构建界面，React Router 7 管理路由。

## MySkills 技能

本市场收录 [MySkills](https://github.com/pengcunfu/MySkills) 仓库中的技能，以下描述与链接均指向该仓库。

| 技能 | 描述 | 仓库地址 |
|------|------|----------|
| [drawio](https://github.com/pengcunfu/MySkills/tree/main/drawio) | 生成 draw.io 图表，可导出 PNG/SVG/PDF（内嵌 XML，导出后仍可编辑） | [pengcunfu/MySkills](https://github.com/pengcunfu/MySkills) |
| [git-commit](https://github.com/pengcunfu/MySkills/tree/main/git-commit) | 自动用中文提交 git 变更，遵循仓库约定，绝不附加 AI 署名/版权信息 | [pengcunfu/MySkills](https://github.com/pengcunfu/MySkills) |
| [init-mysql-mcp](https://github.com/pengcunfu/MySkills/tree/main/init-mysql-mcp) | 初始化 MySQL MCP Server，配置连接参数并提供数据库查询、表结构查看等工具 | [pengcunfu/MySkills](https://github.com/pengcunfu/MySkills) |
| [init-sqlite-mcp](https://github.com/pengcunfu/MySkills/tree/main/init-sqlite-mcp) | 初始化 SQLite MCP Server，配置连接参数并提供数据库查询、表结构查看等工具 | [pengcunfu/MySkills](https://github.com/pengcunfu/MySkills) |
| [install-skills](https://github.com/pengcunfu/MySkills/tree/main/install-skills) | 安装技能包到 Claude Code / Cursor，支持 MySkills（可选技能）与 gstack（整包官方 setup） | [pengcunfu/MySkills](https://github.com/pengcunfu/MySkills) |

## 技术栈

- Vite 8：开发服务器与生产构建
- React 19 + TypeScript 5
- MUI 7（Material UI）
- React Router 7
- Vitest + Testing Library：单元测试

## 可用脚本

### npm run dev

启动开发服务器（默认 http://localhost:3000），支持热更新。

### npm run build

先执行 TypeScript 类型检查，再构建生产版本到 dist/ 目录。

### npm run preview

本地预览生产构建产物。

### npm test

以监听模式运行 Vitest 测试。

### npm run test:run

单次运行全部测试后退出。

## 部署

项目通过 Cloudflare Pages 部署，运行 `deploy.ps1` 即可完成构建与发布，构建产物位于 dist/。
