<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput></TodoInput>
    <TodoList v-bind:propsData="todoItems"></TodoList>
    <TodoFooter></TodoFooter>
  </div>
</template>

<script>
  import TodoHeader from './components/TodoHeader'
  import TodoInput from './components/TodoInput'
  import TodoList from './components/TodoList'
  import TodoFooter from './components/TodoFooter'

  export default {
    data: function () {
      return {
        todoItems: []
      }
    },
    created: function () {
      if (localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++) {
          if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
            console.log(JSON.parse(localStorage.getItem(localStorage.key(i))));
            this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
          }
        }
      }
    },
    components: {
      'TodoHeader': TodoHeader,
      'TodoInput': TodoInput,
      'TodoList': TodoList,
      'TodoFooter': TodoFooter
    }
  }
</script>

<style>
  body {
    text-align: center;
    background-color: #F6F6F6;
  }

  input {
    border-style: groove;
    width: 200px;
  }

  button {
    border-style: groove;
  }

  .shadow {
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
  }
</style>
