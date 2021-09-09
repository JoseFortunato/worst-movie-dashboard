<template>
  <div>
    <h2>Producers with longest and shortest interval between wins</h2>
    <p>Maximum</p>
    <v-divider></v-divider>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Producer
            </th>
            <th class="text-left">
              Interval
            </th>
            <th class="text-left">
              Previous Year
            </th>
            <th class="text-left">
              Following Year
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
          v-for="item in producersMax"
          :key="item.name"
          >
          <td>{{ item.producer }}</td>
          <td>{{ item.interval }}</td>
          <td>{{ item.previousWin }}</td>
          <td>{{ item.followingWin }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

  <p>Minimum</p>
  <v-divider></v-divider>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Producer
          </th>
          <th class="text-left">
            Interval
          </th>
          <th class="text-left">
            Previous Year
          </th>
          <th class="text-left">
            Following Year
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
        v-for="item in producersMin"
        :key="item.name"
        >
        <td>{{ item.producer }}</td>
        <td>{{ item.interval }}</td>
        <td>{{ item.previousWin }}</td>
        <td>{{ item.followingWin }}</td>
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
      producersMax: [],
      producersMin: [],
    }
  },
  methods: {
    async getStudios() {
      await this.$axios.get(`?projection=max-min-win-interval-for-producers`)
      .then((result) => {
        console.log(result);
        this.producersMax = result.data.max;
        this.producersMin = result.data.min;
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
