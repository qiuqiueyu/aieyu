module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.moonshot.cn',
        changeOrigin: true,
        secure: true, // 启用HTTPS验证
        pathRewrite: { '^/api': '' },
        onProxyReq: (proxyReq) => {
          // 强制设置正确的Content-Type，避免Kimi拒绝请求
          proxyReq.setHeader('Content-Type', 'application/json');
        },
        onError: (err, req, res) => {
          // 代理错误时返回标准JSON，避免HTML报错
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: { message: '代理连接失败，请检查网络' } }));
        }
      }
    }
  }
}
