<script>
  import axios from 'axios'
	export default {
		async asyncData() {
			const response = await axios.get('http://localhost:18080/members')
			return {
				data: [...response.data, {}]
			}
		},
    methods: {
      patchData: (id, name) => {
        axios.patch(`http://localhost:18080/members/${id}`, {name}).then(() => window.location.reload())
      },
      postData: (name) => {
        axios.post(`http://localhost:18080/members`, {name}).then(() => window.location.reload())
      },
      deleteData: (id) => {
        axios.delete(`http://localhost:18080/members/${id}`).then(() => window.location.reload())
      }
    },
	}
</script>

<template>
    <table>
      <thead>
        <tr>
          <th width="120px">名前</th>
          <th width="60px"> </th>
          <th width="60px"> </th>
        </tr>
      </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <td width="120px"><input type="text" v-model="item.name"/></td>
        <td width="60px">
          <button v-if="item.id" v-on:click="patchData(item.id, item.name)">更新</button>
          <button v-if="!item.id" v-on:click="postData(item.name)">追加</button>
        </td>
        <td width="60px"><button v-on:click="deleteData(item.id)">削除</button></td>
      </tr>
    </tbody>
  </table>
</template>

<style>
table, td, th {
  border: 0.5px #777 ;
}
</style>
