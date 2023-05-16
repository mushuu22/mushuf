<template>
  <div>
    <h1>New Task</h1>
    <form @submit.prevent="createTask">
      <div>
        <label>Title:</label>
        <input type="text" v-model="title" maxlength="50" required />
      </div>
      <div>
        <label>Details:</label>
        <textarea v-model="details" maxlength="512"></textarea>
      </div>
      <div>
        <label>Creator:</label>
        <input type="text" v-model="creator" maxlength="50" required />
      </div>
      <div>
        <label>Assignee:</label>
        <input type="text" v-model="assignee" maxlength="50" />
      </div>
      <div>
        <label>Due Date:</label>
        <input type="datetime-local" v-model="dueDate" required />
      </div>
      <div>
        <label>Comment:</label>
        <textarea v-model="comments" maxlength="50"></textarea>
      </div>
      <button type="submit">Create Task</button>
      <button @click.prevent="goBack">Go Back</button>
      <div v-if="errorMessage">{{ errorMessage }}</div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      title: "",
      details: "",
      creator: "",
      assignee: "",
      dueDate: "",
      comments: "",
      state: "todo",
      errorMessage: "",
    };
  },
  methods: {
    createTask() {
      const task = {
        title: this.title,
        details: this.details,
        creator: this.creator,
        assignee: this.assignee,
        dueDate: this.dueDate,
        state: this.state,
        comments: this.comments,
      };

      axios
        .post("http://localhost:18080/tasks", task)
        .then(() => {
          console.log("Task created successfully!");
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
          this.errorMessage = error.response.data.message;
        });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
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


h1 {
  text-align: center;
  margin-top: 50px;
}

button[type="button"] {
  margin-bottom: 10px;
}
</style>


