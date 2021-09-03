<template>
  <div>
    <h2>List years with multiple winners</h2>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Year
            </th>
            <th class="text-left">
              Win count
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
          v-for="item in movies"
          :key="item.year"
          >
          <td>{{ item.year }}</td>
          <td>{{ item.winnerCount }}</td>
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
      movies: []
    }
  },
  methods: {
    async getMovies() {
      await this.$axios.get(`?projection=years-with-multiple-winners`)
      .then((result) => {
        this.movies = result.data.years;
        console.log(this.movies)
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },
  mounted() {
    this.getMovies();
  }

  }
</script>
