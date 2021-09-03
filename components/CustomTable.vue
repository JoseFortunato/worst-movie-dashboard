<template>
  <div>
  <v-data-table
    :headers="headers"
    :items="movies"
    :page.sync="page"
    class="elevation-1"
    hide-default-footer
  >
    <template v-slot:top>
      <v-container fluid>
        <v-row>

          <v-col cols="6">
            <v-row class="pa-6">
              <v-text-field v-model="yearFilterValue" type="text" label="Filter by Year"></v-text-field>
            </v-row>
          </v-col>

          <v-col cols="6">
            <v-row class="pa-6">
              <v-select
              :items="winner"
              v-model="winnerFilterValue"
              label="WInner Yes/No"
              ></v-select>
            </v-row>
          </v-col>

        </v-row>
      </v-container>

    </template>
  </v-data-table>
  <v-pagination
    v-model="page"
    :length="pageCount"
    total-visible="9"
  ></v-pagination>
</div>
</template>

<script>

export default {
  data() {
    return {
      winner: [
        {text: "All", value: null},
        {text: "Yes", value: 2},
        {text: "No", value: 3},
      ],
      yearFilterValue: null,
      winnerFilterValue: null,
      movies: [],
      page: 1,
      pageCount: 0,
    }
  },
  computed: {
    headers() {
      return [
        {text: 'ID', value: 'id', align: 'center', sortable: false},
        {text: 'Year', value: 'year', align: 'center', sortable: false},
        {text: 'Title', value: 'title', align: 'center', sortable: false},
        {text: 'Winner', value: 'winner', align: 'center', sortable: false}
      ]
    },
  },
  watch: {
    winnerFilterValue() {
      this.getMovies();
    },
    yearFilterValue() {
      if(this.yearFilterValue.length === 4 || !this.yearFilterValue.length) {
        this.getMovies();
      }
    },
    page() {
      this.getMovies();
    }
  },
  methods: {
    async getMovies() {
      let options = {
        params: {
          size: 10,
          page: (this.page -1),
        }
      }

      if(this.yearFilterValue) options.params.year = this.yearFilterValue
      if(this.winnerFilterValue) options.params.winner = (this.winnerFilterValue === 2) ? true : false

      await this.$axios.get(``, options)
      .then((result) => {
        console.log(result);
        this.pageCount = result.data.totalPages;

        this.movies = result.data.content;
        console.log(this.movies)
        console.log(this.pageCount)
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
