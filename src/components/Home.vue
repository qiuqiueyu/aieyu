<template>
  <div class="home-container">
    <div class="chat-box">
      <div class="message-list" ref="messageList">
        <div v-for="msg in messages" :key="msg.id" class="message" :class="msg.role">
          <div class="message-content">
            {{ msg.displayContent || msg.content }}
            <div v-if="msg.id === 1 && msg.role === 'system'" class="tip">
              示例（Kimi）：https://api.moonshot.cn/v1/chat/completions
            </div>
          </div>
        </div>
        <div v-if="loading" class="message system">
          <div class="message-content">好的，正在生成中...</div>
        </div>
      </div>

      <div class="input-bar">
        <input
          v-model="inputText"
          :type="currentInputType"
          :placeholder="currentPlaceholder"
          :disabled="!canInput"
          class="input-field"
          @keyup.enter="confirmInput"
        />
        <button @click="confirmInput" :disabled="!canInput" class="confirm-btn">
          确定
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      step: 1,
      messages: [
        { id: 1, role: 'system', content: '请说出你的AI API链接' }
      ],
      inputText: '',
      loading: false,
      apiUrl: '',
      apiKey: '',
      userDemand: ''
    }
  },
  computed: {
    currentInputType() {
      return this.step === 2 ? 'password' : 'text'
    },
    currentPlaceholder() {
      switch (this.step) {
        case 1: return '请输入AI API链接...'
        case 2: return '请输入API Key...'
        case 3: return '请输入你的学习需求...'
        default: return ''
      }
    },
    canInput() {
      return !this.loading && this.step <= 3
    }
  },
  mounted() {
    this.scrollToBottom()
  },
  methods: {
    async confirmInput() {
      if (!this.inputText.trim()) return

      let displayContent = this.inputText
      if (this.step === 2) {
        displayContent = '********************'
      }

      this.messages.push({
        id: Date.now(),
        role: 'user',
        content: this.inputText,
        displayContent: displayContent
      })
      this.scrollToBottom()

      switch (this.step) {
        case 1:
          this.apiUrl = this.inputText
          this.step = 2
          this.inputText = ''
          await this.sleep(500)
          this.messages.push({
            id: Date.now(),
            role: 'system',
            content: '请输入你的API Key'
          })
          this.scrollToBottom()
          break

        case 2:
          this.apiKey = this.inputText
          this.step = 3
          this.inputText = ''
          await this.sleep(500)
          this.messages.push({
            id: Date.now(),
            role: 'system',
            content: '请说出你的需求'
          })
          this.scrollToBottom()
          break

        case 3:
          this.userDemand = this.inputText
          this.inputText = ''
          this.step = 4
          this.loading = true
          this.scrollToBottom()
          await this.callAIAPI()
          break
      }
    },

    // ==============================================
    // 🔥 本地假数据，不连网、不跨域、直接跑通
    // ==============================================
    async callAIAPI() {
      try {
        // 模拟加载 2 秒
        await this.sleep(2000)

        // 本地生成单词数据
        const fakeData = {
          words: [
            { russian: "Привет", chinese: "你好", type: "感叹词", example: "Привет!" },
            { russian: "Спасибо", chinese: "谢谢", type: "感叹词", example: "Спасибо!" },
            { russian: "Пока", chinese: "再见", type: "感叹词", example: "Пока!" },
            { russian: "Да", chinese: "是", type: "副词", example: "Да, я знаю." },
            { russian: "Нет", chinese: "不", type: "副词", example: "Нет, спасибо." }
          ]
        }

        this.loading = false
        // 存入本地并跳转到编辑页
        localStorage.setItem('temp_word_data', JSON.stringify(fakeData.words))
        this.$router.push('/word')

      } catch (err) {
        this.loading = false
        this.messages.push({
          id: Date.now(),
          role: 'system',
          content: `❌ 生成失败：${err.message}`
        })
        this.scrollToBottom()
        this.step = 3
      }
    },

    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs.messageList.scrollTop = this.$refs.messageList.scrollHeight
      })
    },

    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  }
}
</script>

<style scoped>
.home-container {
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-box {
  width: 90%;
  max-width: 800px;
  height: 90vh;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.message-list {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.message {
  max-width: 70%;
  display: flex;
}

.message.system {
  align-self: flex-start;
}

.message.user {
  align-self: flex-end;
}

.message-content {
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 16px;
  background: #f0f0f0;
  color: #333;
}

.message.user .message-content {
  background: #409eff;
  color: white;
}

.tip {
  font-size: 12px;
  color: #999;
  margin-top: 6px;
}

.input-bar {
  padding: 15px 20px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 10px;
  align-items: center;
}

.input-field {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 15px;
  outline: none;
}

.confirm-btn {
  padding: 12px 24px;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}
</style>