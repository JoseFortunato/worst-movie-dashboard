<template>
  <div>
    <h2>Top 3 studios with winners</h2>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Name
            </th>
            <th class="text-left">
              Win count
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
          v-for="item in studios"
          :key="item.name"
          >
          <td>{{ item.name }}</td>
          <td>{{ item.winCount }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</div>
</template>


<script>
export default {
  data() {
    return {
      studios: []
    }
  },
  methods: {
    async getStudios() {
      await this.$axios.get(`?projection=studios-with-win-count`)
      .then((result) => {
        this.studios = result.data.studios.slice(0, 3);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },
  mounted() {
    this.getStudios();
  }

}
</script>
