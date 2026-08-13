# MCP 市场

基于 React 19 + TypeScript + Vite 的 MCP 服务器市场前端应用，使用 MUI 7 构建界面，React Router 7 管理路由。

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
