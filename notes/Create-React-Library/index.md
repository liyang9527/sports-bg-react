使用 **Create React Library** 搭建、开发和发布 React 组件包的步骤如下：

### 1. 安装 Create React Library
在命令行中运行以下命令来创建一个新的组件库项目：

```bash
npx create-react-library my-component 或者 yarn create react-library my-component
cd my-component
```

### 2. 项目结构
创建完成后，项目结构大致如下：
```
my-component/
├── src/
│   ├── index.ts
│   └── MyComponent.tsx
├── example/
├── tests/
├── package.json
└── README.md
```

### 3. 开发组件
在 `src/MyComponent.tsx` 中开发你的组件。例如：

```tsx
import React from 'react';

interface MyComponentProps {
  message: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ message }) => {
  return <div>{message}</div>;
};

export default MyComponent;
```

### 4. 更新入口文件
确保在 `src/index.ts` 中导出你的组件：

```ts
export { default as MyComponent } from './MyComponent';
```

### 5. 本地测试
你可以在 `example` 文件夹中创建一个示例应用，测试你的组件。可以使用 Create React App 初始化示例应用：

```bash
npx create-react-app example --template typescript
```

在示例应用中引入你的组件：

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { MyComponent } from '../src';

ReactDOM.render(<MyComponent message="Hello World!" />, document.getElementById('root'));
```

### 6. 打包组件
使用以下命令打包你的组件库：

```bash
npm run build
```

### 7. 上传到 GitHub
- 初始化 Git 仓库并推送到 GitHub：

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <你的 GitHub 仓库链接>
git push -u origin main
```

### 8. 发布到 npm
确保你已经在 [npm](https://www.npmjs.com/) 上注册了账号，并在终端中登录：

```bash
npm login
```

然后使用以下命令发布你的组件包：

```bash
npm publish --access public
```

### 9. 更新和维护
- 定期更新组件，进行版本控制，并在发布新版本时使用：

```bash
npm version patch   # 或者使用 minor、major
npm publish
```

以上步骤可以帮助你搭建、开发和发布一个开源的 React 组件包。如果你有其他问题或需要更详细的指导，随时问我！