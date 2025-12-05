import { McpServer, McpCategory, Review } from '../types';

export const mockCategories: McpCategory[] = [
  { id: 'development', name: '开发工具', description: '代码生成、调试、测试工具', icon: 'code' },
  { id: 'productivity', name: '生产力', description: '提高工作效率的工具', icon: 'work' },
  { id: 'communication', name: '通讯协作', description: '团队协作和通讯工具', icon: 'chat' },
  { id: 'data', name: '数据处理', description: '数据分析、转换、可视化', icon: 'analytics' },
  { id: 'ai', name: 'AI助手', description: '人工智能和机器学习工具', icon: 'psychology' },
  { id: 'system', name: '系统管理', description: '系统监控和管理工具', icon: 'settings' },
];

export const mockServers: McpServer[] = [
  {
    id: '1',
    name: 'GitHub Assistant',
    description: '强大的GitHub代码仓库管理助手，支持代码审查、问题跟踪和项目管理',
    author: 'DevTools Team',
    version: '2.1.0',
    category: 'development',
    tags: ['github', 'git', 'code-review', 'project-management'],
    downloads: 15234,
    rating: 4.7,
    reviews: 128,
    repository: 'https://github.com/devtools/github-assistant',
    documentation: 'https://docs.github-assistant.com',
    license: 'MIT',
    lastUpdated: '2024-01-15',
    dependencies: ['@octokit/rest', 'axios'],
    features: [
      '自动代码审查',
      '智能问题分类',
      'PR模板生成',
      '项目进度跟踪',
      '团队协作报告'
    ],
    readme: `# GitHub Assistant

一个功能强大的GitHub仓库管理助手，帮助开发者更高效地管理代码仓库。

## 主要功能

- 🤖 智能代码审查
- 📊 项目进度跟踪
- 🏷️ 自动标签管理
- 📝 PR模板生成
- 👥 团队协作工具

## 安装

\`\`\`bash
npm install github-assistant
\`\`\`

## 使用

详见[官方文档](https://docs.github-assistant.com)`
  },
  {
    id: '2',
    name: 'Data Analyzer Pro',
    description: '专业的数据分析工具，支持多种数据格式的导入、清洗和可视化',
    author: 'DataSoft Inc.',
    version: '3.5.2',
    category: 'data',
    tags: ['analytics', 'data-visualization', 'reporting', 'dashboard'],
    downloads: 28456,
    rating: 4.9,
    reviews: 245,
    repository: 'https://github.com/datasoft/analyzer-pro',
    documentation: 'https://analyzer.datsoft.com/docs',
    license: 'Commercial',
    lastUpdated: '2024-01-20',
    dependencies: ['d3.js', 'chart.js', 'papaparse'],
    features: [
      '多格式数据导入',
      '实时数据清洗',
      '交互式可视化',
      '自定义仪表板',
      '数据导出报告'
    ]
  },
  {
    id: '3',
    name: 'AI Code Companion',
    description: '智能代码助手，提供代码补全、重构建议和最佳实践指导',
    author: 'AI Labs',
    version: '1.8.0',
    category: 'ai',
    tags: ['ai', 'code-completion', 'refactoring', 'best-practices'],
    downloads: 45234,
    rating: 4.8,
    reviews: 512,
    repository: 'https://github.com/ailabs/code-companion',
    documentation: 'https://docs.ailabs.com/companion',
    license: 'Apache-2.0',
    lastUpdated: '2024-01-22',
    dependencies: ['@tensorflow/tfjs', 'codemirror'],
    features: [
      '智能代码补全',
      '自动重构建议',
      '代码质量分析',
      '最佳实践推荐',
      '多语言支持'
    ]
  },
  {
    id: '4',
    name: 'Team Chat Hub',
    description: '集成多个通讯平台的统一聊天工具，支持Slack、Discord、Teams等',
    author: 'ConnectCorp',
    version: '4.0.1',
    category: 'communication',
    tags: ['chat', 'messaging', 'team-collaboration', 'notifications'],
    downloads: 18923,
    rating: 4.5,
    reviews: 156,
    repository: 'https://github.com/connectcorp/chat-hub',
    documentation: 'https://docs.connectcorp.com/chat-hub',
    license: 'MIT',
    lastUpdated: '2024-01-18',
    dependencies: ['socket.io', 'slack-sdk', 'discord.js'],
    features: [
      '多平台集成',
      '消息同步',
      '智能通知',
      '消息搜索',
      '团队管理'
    ]
  },
  {
    id: '5',
    name: 'Task Master Pro',
    description: '专业的任务管理工具，支持敏捷开发、看板管理和甘特图',
    author: 'Productivity Plus',
    version: '2.3.4',
    category: 'productivity',
    tags: ['task-management', 'agile', 'kanban', 'gantt'],
    downloads: 22145,
    rating: 4.6,
    reviews: 198,
    repository: 'https://github.com/productivity-plus/task-master',
    documentation: 'https://docs.productivity-plus.com/task-master',
    license: 'GPL-3.0',
    lastUpdated: '2024-01-19',
    dependencies: ['react-beautiful-dnd', 'fullcalendar', 'moment'],
    features: [
      '敏捷任务管理',
      '可视化看板',
      '甘特图视图',
      '时间跟踪',
      '团队协作'
    ]
  },
  {
    id: '6',
    name: 'System Monitor Elite',
    description: '全面的系统监控解决方案，实时跟踪服务器性能和应用健康状态',
    author: 'SysWatch Technologies',
    version: '5.1.0',
    category: 'system',
    tags: ['monitoring', 'performance', 'alerting', 'metrics'],
    downloads: 31278,
    rating: 4.7,
    reviews: 234,
    repository: 'https://github.com/syswatch/monitor-elite',
    documentation: 'https://docs.syswatch.com/elite',
    license: 'MIT',
    lastUpdated: '2024-01-21',
    dependencies: ['prometheus-client', 'grafana-api', 'node-cron'],
    features: [
      '实时性能监控',
      '自动告警系统',
      '历史数据分析',
      '自定义仪表板',
      '健康检查'
    ]
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    userId: 'user1',
    userName: '张三',
    rating: 5,
    comment: '非常好用的工具，大大提高了我的工作效率！代码审查功能特别智能。',
    date: '2024-01-10',
    helpful: 23
  },
  {
    id: '2',
    userId: 'user2',
    userName: '李四',
    rating: 4,
    comment: '功能强大，但学习曲线有点陡峭。文档需要更详细一些。',
    date: '2024-01-08',
    helpful: 15
  },
  {
    id: '3',
    userId: 'user3',
    userName: '王五',
    rating: 5,
    comment: '完美的数据分析工具！可视化功能非常出色。',
    date: '2024-01-05',
    helpful: 18
  }
];