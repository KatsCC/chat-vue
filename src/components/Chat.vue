<template>
  <div id="app">
    <h1>모두의 채팅</h1>
    <div class="chat-box" ref="chatBox">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="{
          'my-message-wrapper': msg.username === username,
          'other-message-wrapper': msg.username !== username,
        }"
      >
        <div
          v-if="
            (index === 0 || messages[index - 1].username !== msg.username) &&
            msg.username !== username
          "
          class="user-name"
        >
          {{ msg.username }}
        </div>
        <div
          :class="{
            'my-message message': msg.username === username,
            'other-message message': msg.username !== username,
          }"
          :style="{
            backgroundColor: generateColor(msg.username),
            filter: 'brightness(1.2)',
          }"
        >
          <div>{{ msg.message }}</div>
        </div>
      </div>
    </div>
    <input
      v-model="newMessage"
      @keyup.enter="sendMessage"
      placeholder="메세지를 입력해 주세요"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      ws: null,
      username: this.$route.query.username || "",
      messages: [],
      newMessage: "",
    };
  },
  created() {
    this.ws = new WebSocket(`wss://${import.meta.env.VITE_SERVER_URL}`);
    if (!this.username) {
      this.$router.push({
        name: "Name",
      });
    }
    this.ws.onmessage = (event) => {
      if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          this.handleMessage(reader.result);
        };
        reader.readAsText(event.data);
      } else {
        this.handleMessage(event.data);
      }
    };
  },
  methods: {
    handleMessage(data) {
      const msgData = JSON.parse(data);

      if (msgData.type === "history") {
        this.messages.push(...msgData.messages);
      } else {
        this.messages.push(msgData);
      }
      this.scrollToBottom();
    },
    generateColor(username) {
      let hash = 0;
      for (let i = 0; i < username.length; i++) {
        hash += username.charCodeAt(i);
      }

      const r = hash % 256;
      const g = (hash >> 8) % 256;
      const b = (hash >> 16) % 256;

      return `rgba(${r}, ${g}, ${b}, 0.5)`;
    },
    sendMessage() {
      if (this.newMessage !== "") {
        const msg = { username: this.username, message: this.newMessage };
        this.ws.send(JSON.stringify(msg));
        this.newMessage = "";
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const chatBox = this.$refs.chatBox;
        chatBox.scrollTop = chatBox.scrollHeight;
      });
    },
  },
};
</script>

<style>
body {
  margin: 0;
  background-color: #cfffe9;
}
#app {
  text-align: center;
  height: 95vh;
  margin: 0;
}
.user-name {
  margin-top: 1.7vw;

  font-weight: bold;
  transform: translateX(10px);
}

.chat-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 3px solid rgb(33, 255, 181);
  height: calc(100% - 200px);
  font-size: 18px;
  overflow-y: scroll;
  background-color: rgb(255, 255, 255);
  position: relative;
  width: 80%;
  margin: 5px auto 20px auto;

  padding: 10px 0 10px 0;
  border-radius: 12px;
}
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #b8b8b8;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #808080;
}

input {
  width: 80%;
  padding: 10px;
  font-size: 16px;
}

.my-message-wrapper {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.other-message-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}

.my-message {
  background-color: #c0ffe3;
  text-align: left;
  transform: translateX(-10px);
}

.other-message {
  background-color: #f4d4d4;
  text-align: left;
  transform: translateX(10px);
}

.message {
  display: flex;
  flex-direction: column;
  width: auto;
  max-width: 70%;
  filter: "brightness(2.5)";
  margin: 3px 0;
  padding: 8px;
  border-radius: 10px;
}

@media (min-width: 768px) {
  .chat-box {
    font-size: 20px;
  }
}
@media (min-width: 1024px) {
  .chat-box {
    font-size: 22px;
  }
}

@media (min-width: 1280px) {
  .chat-box {
    font-size: 24px;
  }
}
@media (min-width: 1440px) {
  .chat-box {
    font-size: 26px;
  }
}
</style>
