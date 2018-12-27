<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
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

            <form novalidate class="md-layout" @submit.prevent="validateUser">
              <md-card class="md-layout-item  md-small-size-100">
                <md-card-header>
                  <div class="md-title">When did you fly to europe?</div>
                </md-card-header>
                <md-card-content>
                  <div class="md-layout md-gutter">
                    <md-field>
                      <md-icon>event</md-icon>
                      <label>Date</label>
                      <md-input v-model="date"></md-input>
                    </md-field>


                    <md-field>
                      <md-icon>flight_takeoff</md-icon>
                      <label>You must leave Europe by.</label>

                    </md-field>


                    <md-field>
                      <md-icon>flight_land</md-icon>
                      <label>You can fly back on.</label>

                    </md-field>
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
        title: '',
        editor: Strings.markdownString()
      }
    },
    watch: {},
    mounted: function () {
      this.loadData();
    },
    computed: {

    },
    methods: {
      validateUser: function validateUser() {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          alert('vald');
        }
      },
      goTo: function goTo(url) {
        if (url === undefined || url.trim() === '') return false;
        window.location.href = url;
      },
      loadData: function loadData() {
        // Check if local storage is enabled
      }
    }
  }
</script>



<style scoped>

</style>