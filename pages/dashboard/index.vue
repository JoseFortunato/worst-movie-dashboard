<template>
  <div>
    <v-container v-if="boards.length">
      <v-row>
        <v-col v-for="(item, index) in boards" :key="index" md="6" xs="12" sm="12">
          <component v-bind:is="item.component" />
        </v-col>
      </v-row>
    </v-container>
   </div>
</template>


<script>
export default {
  data() {
    return {
      boards: []
    }
  },
  methods: {
    getBoards() {
      //Simulate a custom dashboard
      const boards = ['studios', 'winners', 'producers', 'winnersyear'];
      const componentes = [];

      for (const board of boards) {
        let componente = {};
        componentes.push({component: () => import(`./${board}.vue`)});
      }

      this.boards = componentes;
    }
  },
  mounted() {
    this.getBoards();
  }
}
</script>

<style media="screen">
  thead {
    background-color: rgba(0, 0, 0, .05);
  }
</style>
