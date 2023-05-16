<template>
  <div>
    <h1>{{ task.title }}</h1>
    <table>
      <tbody>
        <tr>
          <td>ID:</td>
          <td>{{ task.id }}</td>
        </tr>
        <tr>
          <td>Title:</td>
          <td>{{ task.title }}</td>
        </tr>
        <tr>
          <td>Details:</td>
          <td>{{ task.details }}</td>
        </tr>
        <tr>
          <td>Creator:</td>
          <td>{{ task.creator }}</td>
        </tr>
        <tr>
          <td>Assignee:</td>
          <td>{{ task.assignee }}</td>
        </tr>
        <tr>
          <td>Due Date:</td>
          <td>{{ task.dueDate }}</td>
        </tr>
        <tr>
          <td>State:</td>
          <td>{{ task.state }}</td>
        </tr>
        <tr>
          <td>Comments:</td>
          <td>{{ task.comments }}</td>
        </tr>
      </tbody>
    </table>
    <button @click="goBack">Go Back</button>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      task: {
        comments: []
      },
      errorMessage: ''
    }
  },
  mounted() {
    const id = this.$route.params.id;
    if (id) {
      this.fetchTask(id);
    }
  },
  methods: {
    fetchTask(id) {
      axios.get(`http://localhost:18080/tasks/${id}`).then(response => {
        this.task = response.data
        this.task.state = response.data.state
      })
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
<style>
h1 {
  text-align: center;
  margin-top: 50px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

td {
  padding: 10px;
}

button.go-back-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}

button.go-back-button:hover {
  background-color: #45a049;
}

.task-details {
  max-width: 600px;
  margin: 0 auto;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 4px;
}
</style>
