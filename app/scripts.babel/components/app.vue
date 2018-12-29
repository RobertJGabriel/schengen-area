<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary md-dense md-accent" md-elevation="1">
        <div class="md-toolbar-row">
          <span class="md-title">Schengen Area</span>
          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button" title='Help' target="blank" v-on:click="goTo('https://github.com/RobertJGabriel/schengen-area')">
              <md-icon>code</md-icon>
            </md-button>
            <md-button class="md-icon-button" title='Help' target="blank" v-on:click="goTo('https://www.robertgabriel.ninja')">
              <md-icon>help</md-icon>
            </md-button>
          </div>
        </div>
      </md-app-toolbar>

      <md-app-content>
        <div class="md-layout">
          <div class="md-layout-item">

          </div>
          <div class="md-layout-item">

            <form novalidate class="md-layout">
              <md-card class="md-layout-item  md-small-size-100">
                <md-card-header>
                  <div class="md-title">Schengen Area day checker</div>
                </md-card-header>
                <md-card-content>
                  <div class="md-layout md-gutter">
                    <md-list>

                      <md-list-item>
                        <md-datepicker v-model="date">
                          <label>When did you fly to europe?</label>
                        </md-datepicker>
                      </md-list-item>

                      <md-list-item>
                        <md-icon>flight_takeoff</md-icon>
                        <label>You must leave Europe on </label>
                        <span class="md-list-item-text"> <b>{{ mustLeave }}</b></span>
                      </md-list-item>

                      <md-list-item>
                        <md-icon>flight_land</md-icon>
                        <label>You can fly back on </label>
                        <span class="md-list-item-text"> <b>{{ returnDate }}</b></span>
                      </md-list-item>

                    </md-list>
                  </div>
                </md-card-content>
              </md-card>
            </form>

          </div>
          <div class="md-layout-item">

          </div>
        </div>

      </md-app-content>
    </md-app>

  </div>
</template>


<script>
  import Vue from 'vue';
  import Strings from '../strings.js';
  import marked from 'marked';

  module.exports = {
    data: function () {
      return {
        date: new Date(2018, 9, 16),
        search: null,
        searched: []
      }
    },

    mounted: function () {

    },
    computed: {
      // a computed getter
      returnDate: function () {
        // `this` points to the vm instance
        return this.addDays(this.date, 180);
      },
      mustLeave: function () {
        // `this` points to the vm instance
        return this.addDays(this.date, 90);
      }
    },
    methods: {
      addDays: function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result.toDateString();
      },
      goTo: function goTo(url) {
        if (url === undefined || url.trim() === '') return false;
        window.location.href = url;
      }
    }
  }
</script>



<style scoped>
  label {
    padding-right: 0.5rem;
  }
</style>