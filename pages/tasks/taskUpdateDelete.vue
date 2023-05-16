<template>
  <div>
    <h2>Task Update Screen</h2>
    <form v-if="task" @submit.prevent="updateTask">
      <div>
        <label>Title:</label>
        <input type="text" v-model="task.title" required maxlength="50" />
      </div>
      <div>
        <label>Details:</label>
        <textarea v-model="task.details" maxlength="512"></textarea>
      </div>
      <div>
        <label>Creator:</label>
        <input type="text" v-model="task.creator" required maxlength="50" />
      </div>
      <div>
        <label>Assignee:</label>
        <input type="text" v-model="task.assignee" maxlength="50" />
      </div>
      <div>
        <label>Due Date:</label>
        <input type="datetime-local" v-model="task.dueDate" required />
      </div>
      <div>
        <label>State:</label>
        <select v-model="task.state">
        <option value="todo">todo</option>
        <option value="doing">doing</option>
        <option value="done">done</option>
        </select>
      </div>
      <div>
        <label>Comment:</label>
        <textarea v-model="task.comments" maxlength="50"></textarea>
      </div>
      <div>
        <button type="submit">Update Task</button>
        <button @click.prevent="goBack">Go Back</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['task.id'],
  data() {
    return {
      task: null,
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
      })
    },
    updateTask() {
      console.log(this.task); // Add this line
      axios.put(`http://localhost:18080/tasks/${this.task.id}`, this.task)
      .then(() => {
        console.log("Task created successfully!");
        this.$router.push("/");
      }).catch((error) => {
        console.log(error)
        this.errorMessage = error.response.data.message
      })
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
label {
  font-weight: bold;
}

input[type="text"],
input[type="datetime-local"],
textarea {
  padding: 8px;
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button[type="submit"],
button[type="button"] {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}


h2 {
  text-align: center;
  margin-top: 50px;
}

button[type="button"] {
  margin-bottom: 10px;
}
</style>

