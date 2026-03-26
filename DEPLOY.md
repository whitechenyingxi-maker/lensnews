# 🚀 网站更新部署流程

## 本地开发 → 服务器部署 完整流程

### 第一步：本地修改代码
在本地项目目录 `/Users/bytedance/Documents/trae_projects/News` 中修改代码

### 第二步：提交并推送代码到 Git
```bash
cd /Users/bytedance/Documents/trae_projects/News

# 查看修改状态
git status

# 添加所有修改
git add .

# 提交修改（替换引号中的内容为你的修改描述）
git commit -m "描述你做了什么修改"

# 推送到远程仓库
git push
```

### 第三步：SSH 连接到服务器
```bash
ssh root@47.96.131.118
```
输入服务器密码

### 第四步：服务器上更新代码
```bash
# 进入项目目录
cd /var/www/news

# 拉取最新代码
git pull

# 安装新依赖（如果 package.json 有变化）
npm install

# 重新构建项目
npm run build

# 重启应用
pm2 restart lens-news
```

### 第五步：验证更新
访问 https://www.chmilyx.top 查看更新效果

---

## 📊 常用 PM2 命令

```bash
# 查看应用状态
pm2 status

# 查看实时日志
pm2 logs lens-news

# 重启应用
pm2 restart lens-news

# 停止应用
pm2 stop lens-news

# 启动应用
pm2 start lens-news

# 删除应用
pm2 delete lens-news
```

---

## 🔍 排查问题

### 如果网站无法访问：
1. 检查应用状态：`pm2 status`
2. 查看错误日志：`pm2 logs lens-news`
3. 检查 Nginx：`systemctl status nginx`
4. 重启应用：`pm2 restart lens-news`

### 如果构建失败：
1. 查看构建错误信息
2. 确保所有依赖已安装：`npm install`
3. 清理缓存重新构建：`rm -rf .next && npm run build`

---

## ⚠️ 注意事项

1. **每次更新前先拉取最新代码**：避免冲突
2. **重要修改先在本地测试**：确认没问题再部署
3. **构建失败不要重启**：先解决构建问题
4. **定期备份**：重要更新前可以备份当前版本

---

## 💡 快速命令备忘

### 本地一键推送（如果没有新文件）：
```bash
git add . && git commit -m "update" && git push
```

### 服务器一键更新：
```bash
cd /var/www/news && git pull && npm run build && pm2 restart lens-news
```
