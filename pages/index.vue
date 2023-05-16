<template>
   <div>
     <h1>Task List</h1>
     <router-link to="/tasks/new">Create New Task</router-link>
     <table>
       <thead>
         <tr>
           <th>ID</th>
           <th>Title</th>
           <th>Assignee</th>
           <th>
             <div class="dropdown-checkboxes">
               <div class="dropdown">
                 <button class="dropbtn" @click="toggleDropdown">State ▼</button>
                 <div class="dropdown-content" :class="{ show: dropdownOpen }">
                   <label v-for="state in stateOptions" :key="state">
                     <input type="checkbox" :value="state" v-model="selectedStates" @change="filterTasks" />
                     {{ state }}
                   </label>
                 </div>
               </div>
             </div>
           </th>
           <th>Due Date</th>
           <th>Actions</th>
         </tr>
       </thead>
       <tbody>
         <tr v-for="task in filteredTasks" :key="task.id">
           <td>{{ task.id }}</td>
           <td>
             <router-link :to="{ name: 'tasksDetails', params: { id: task.id } }">{{ task.title }}</router-link>
           </td>
           <td>{{ task.assignee }}</td>
           <td>{{ task.state }}</td>
           <td>{{ task.dueDate }}</td>
           <td><button @click="editTask(task)">Edit</button></td>
           <td><button @click="deleteTask(task)">Delete</button></td>
         </tr>
       </tbody>
     </table>
     <router-view></router-view>
   </div>
 </template>

 <script>
 import axios from 'axios';

 export default {
   data() {
     return {
       tasks: [],
       stateOptions: ['todo', 'doing', 'done'],
       selectedStates: [],
       dropdownOpen: false,
     };
   },
   mounted() {
     this.fetchTasks();
   },
   computed: {
     filteredTasks() {
       if (this.selectedStates.length === 0) {
         return this.tasks;
       } else {
         return this.tasks.filter(task => this.selectedStates.includes(task.state));
       }
     },
   },
   methods: {
     fetchTasks() {
       axios.get('http://localhost:18080/tasks').then(response => {
         this.tasks = response.data;
       });
     },
     editTask(task) {
       this.$router.push(`/tasks/${task.id}/edit`);
     },
     deleteTask(task) {
       axios.delete(`http://localhost:18080/tasks/${task.id}`).then(() => {
         this.fetchTasks();
       });
     },
     filterTasks() {
       // Perform filtering based on selectedStates
     },
     toggleDropdown() {
       this.dropdownOpen = !this.dropdownOpen;
     },
   },
 };
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

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    z-index: 1;
    padding: 8px;
    border-radius: 4px;
  }


  .show {
    display: block;
  }

  .dropdown-content label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }

  .dropdown-checkboxes input[type="checkbox"] {
    margin-right: 6px;
  }

  .dropbtn {
    background-color: #2196f3;
    color: white;
    padding: 8px 16px;
    font-size: 14px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

  /* Additional Styles */
  button {
    background-color: #4caf50;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  a {
    color: #2196f3;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
</style>
