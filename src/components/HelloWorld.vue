<template>
  <div class="hello">
    <h2>Essential Links</h2>
    <div class="row" id="pdfDom" style="padding-top: 55px; color: #000; font-size: 20px;background-color:#fff;">
      给自己需要导出的ui部分.定义id为"pdfDom".此部分将就是pdf显示的部分
      <div style="border: 2px solid #000;font-size: 30px;line-height: 50px;" v-for="item in data" :key="item.id">
          {{item.name}}
      </div>
    </div>
    <button type="button" class="btn btn-primary" v-on:click="getPdf()">导出PDF</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      htmlTitle: '页面导出PDF文件名',
      data: [
        {
          name: "1"
        },
        {
          name: "2"
        }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
