<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodoItem="addOneItem"></TodoInput>
    <TodoList v-bind:propsData="todoItems" v-on:removeTodoItem="removeOneItem"
              v-on:toggleTodoItem="toggleOneItem"></TodoList>
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
    methods: {
      addOneItem: function (todoItem) {
        var obj = {completed: false, item: todoItem};
        sessionStorage.setItem(todoItem, JSON.stringify(obj));
        this.todoItems.push(obj);
      },
      removeOneItem: function (todoItem, index) {
        sessionStorage.removeItem(todoItem.item);
        this.todoItems.splice(index, 1);
      },
      toggleOneItem: function (todoItem, index) {
        this.todoItems[index].completed = !this.todoItems[index].completed;
        sessionStorage.removeItem(todoItem.item);
        sessionStorage.setItem(todoItem.item, JSON.stringify(todoItem));
      }
    },
    created: function () {
      if (sessionStorage.length > 0) {
        for (var i = 0; i < sessionStorage.length; i++) {
          if (sessionStorage.key(i) !== 'loglevel:webpack-dev-server') {
            console.log(JSON.parse(sessionStorage.getItem(sessionStorage.key(i))));
            this.todoItems.push(JSON.parse(sessionStorage.getItem(sessionStorage.key(i))));
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
