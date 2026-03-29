<template>
  <div class="word-container">
    <h1 class="title">单词库编辑</h1>

    <!-- JSON编辑区 -->
    <div class="editor-box">
      <textarea
        v-model="jsonContent"
        class="json-editor"
        placeholder="AI生成的单词JSON将显示在这里..."
      ></textarea>
    </div>

    <!-- 操作按钮区 -->
    <div class="btn-group">
      <button @click="goBack" class="btn cancel-btn">取消</button>
      <button @click="checkJson" class="btn check-btn">校验</button>
      <button @click="submitJson" class="btn submit-btn">提交</button>
    </div>

    <!-- 校验/提交提示 -->
    <div v-if="tipMsg" class="tip-box" :class="{ success: tipSuccess, error: !tipSuccess }">
      {{ tipMsg }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'WordPage',
  data() {
    return {
      jsonContent: '',
      tipMsg: '',
      tipSuccess: false
    }
  },
  mounted() {
    // 从localStorage读取AI生成的单词数据
    const tempData = localStorage.getItem('temp_word_data')
    if (tempData) {
      // 格式化JSON，方便编辑
      this.jsonContent = JSON.stringify(JSON.parse(tempData), null, 2)
    } else {
      this.jsonContent = '{\n  "words": []\n}'
    }
  },
  methods: {
    // 取消：返回Home页
    goBack() {
      this.$router.push('/home')
    },

    // 校验JSON格式
    checkJson() {
      this.tipMsg = ''
      try {
        const data = JSON.parse(this.jsonContent)
        // 额外校验：必须包含words数组
        if (!data.words || !Array.isArray(data.words)) {
          throw new Error('JSON必须包含words数组')
        }
        this.tipMsg = '✅ JSON格式校验通过！'
        this.tipSuccess = true
      } catch (err) {
        this.tipMsg = `❌ 校验失败：${err.message}`
        this.tipSuccess = false
      }
    },

    // 提交：命名+保存JSON文件
    async submitJson() {
      // 先校验
      try {
        const data = JSON.parse(this.jsonContent)
        if (!data.words || !Array.isArray(data.words)) {
          throw new Error('JSON必须包含words数组')
        }

        // 弹出命名输入框
        const name = prompt('请为此单词库命名（例如：物流展会单词）：')
        if (!name) return

        // 生成文件名（替换空格为下划线）
        const fileName = `${name.replace(/\s+/g, '_')}.json`

        // 【注意】：浏览器环境无法直接写入src文件夹，这里提供两种方案
        // 方案1：下载JSON文件到本地，手动放入src/word_library文件夹
        const blob = new Blob([this.jsonContent], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = fileName
        a.click()
        URL.revokeObjectURL(url)

        this.tipMsg = `✅ 已生成${fileName}，请手动放入项目src/word_library文件夹`
        this.tipSuccess = true

        // 方案2：如果需要后端接口写入，可替换为fetch请求（这里留空）
        // await fetch('/api/save-word', { method: 'POST', body: JSON.stringify({ name, data }) })

      } catch (err) {
        this.tipMsg = `❌ 提交失败：${err.message}`
        this.tipSuccess = false
      }
    }
  }
}
</script>

<style scoped>
.word-container {
  width: 90%;
  max-width: 1000px;
  margin: 30px auto;
  padding: 20px;
}

.title {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.editor-box {
  width: 100%;
  height: 60vh;
  margin-bottom: 20px;
}

.json-editor {
  width: 100%;
  height: 100%;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  font-family: 'Courier New', monospace;
  resize: none;
  outline: none;
}

.btn-group {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.btn {
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.cancel-btn {
  background: #f5f5f5;
  color: #666;
}

.check-btn {
  background: #409eff;
  color: white;
}

.submit-btn {
  background: #67c23a;
  color: white;
}

.tip-box {
  text-align: center;
  padding: 10px;
  border-radius: 8px;
  font-size: 15px;
}

.tip-box.success {
  background: #f0f9eb;
  color: #67c23a;
}

.tip-box.error {
  background: #fef0f0;
  color: #f56c6c;
}
</style>