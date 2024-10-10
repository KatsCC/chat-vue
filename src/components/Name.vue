<template>
  <div class="wrapper">
    <h1>모두의 채팅</h1>
    <input v-model="username" placeholder="사용자 이름을 입력하세요" />
    <button @click="submit">입력</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
    };
  },
  methods: {
    submit() {
      if (this.username) {
        this.$router.push({
          name: "Chat",
          query: { username: this.username },
        });
      }
    },
  },
};
</script>

<style>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

input {
  max-width: 420px;
  border-radius: 12px;
  background-color: white;
  border-color: rgb(33, 255, 181);
  outline: none;
}

button {
  width: 80px;
  height: 40px;
  margin-top: 10px;
  font-size: 18px;
  border-radius: 12px;
  background-color: white;
  border-color: rgb(33, 255, 181);
}
</style>
