<template>
  <div>
    <h2>List movie winners by year</h2>
     <v-data-table
       :headers="headers"
       :items="movies"
       item-key="name"
       class="elevation-1"
       :custom-filter="filterByYear"
       :loading="loading"
       hide-default-footer
     >
       <template v-slot:top>
         <v-text-field
           v-model="search"
           label="Search by year"
           class="mx-4"
         ></v-text-field>
       </template>
     </v-data-table>
   </div>
</template>


<script>
export default {
  data() {
    return {
      search: '',
      loading: false,
      alert: false,
      movies: [],
      headers: [
        { text: 'Id', value: 'id'},
        { text: 'Year', value: 'year'},
        { text: 'Title', value: 'title'},
      ],
    }
  },
  watch: {
    search() {
      this.movies = [];
      if(this.search.length === 4) {
        this.filterByYear()
      }
    }
  },
  methods: {
    async filterByYear() {
      this.loading = true;
      await this.$axios.get(`?winner=true&year=${this.search}`)
      .then((result) => {
        this.movies = result.data;
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
      });
    }
  }
}
</script>
