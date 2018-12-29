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


            <md-card class="md-card-example">
              <md-card-area md-inset>
                <md-card-header>
                  <h2 class="md-title"> What is it?</h2>
                  <div class="md-subhead">
                    The Schengen area is a made up of 26 European countries that agreed to create common entry and exit
                    requirements in order to remove the need for internal borders. As long as Schengen area entry
                    requirements are met, the agreement allows foreigners to travel freely between participating
                    countries without having to go through border controls (some exceptions apply, see below).
                  </div>
                </md-card-header>

                <md-card-header>
                  <h2 class="md-title"> Schengen area countries</h2>
                  <div class="md-subhead">
                    Austria, Belgium, the Czech Republic, Denmark, Estonia, Finland, France, Germany, Greece, Hungary,
                    Iceland, Italy, Latvia, Liechtenstein, Lithuania, Luxembourg, Malta, the Netherlands, Norway,
                    Poland, Portugal, Slovakia, Slovenia, Spain, Sweden and Switzerland.
                  </div>
                </md-card-header>

                <md-card-header>
                  <h2 class="md-title"> EU member states with opt-outs</h2>
                  <div class="md-subhead">
                    Upon the creation of the Schengen Area, most of the countries that were members of the European
                    Union block, signed the agreement. However, two of the following opted out:
                    the Republic of Ireland
                    the United Kingdom
                    Both of them maintain a Common Travel Area with passport-free travel for their citizens between
                    them and the three British Crown Dependencies of Jersey, Guernsey and the Isle of Man, which are
                    outside the European Union. As per Gibraltar, which is a British Overseas Territory, it is neither
                    part of the Schengen Area nor the Common Travel Area.
                  </div>
                </md-card-header>
              </md-card-area>


            </md-card>
          </div>
          <div class="md-layout-item">

            <md-card class="md-card-example">
              <md-card-content>
                <h3 class="md-subheading">When did you fly to europe? </h3>
                <md-datepicker v-model="date">
                </md-datepicker>
              </md-card-content>

              <md-card-content>
                <h3 class="md-subheading">You must leave Europe on </h3>
                <div class="card-reservation">
                  <md-icon>flight_takeoff</md-icon>
                  <div class="md-button-group">
                    <md-button>{{ mustLeave }}</md-button>
                  </div>
                </div>

                <h3 class="md-subheading">You can fly back on </h3>
                <div class="card-reservation">
                  <md-icon>flight_land</md-icon>
                  <div class="md-button-group">
                    <md-button>{{ returnDate }}</md-button>
                  </div>
                </div>
              </md-card-content>
            </md-card>
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



  .md-card-example .md-subhead .md-icon {
    width: 16px;
    min-width: 16px;
    height: 16px;
    font-size: 16px !important;
  }

  .md-card-example .md-subhead  {
    vertical-align: middle;
  }

  .md-card-example .card-reservation {
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .md-card-example .card-reservation .md-icon {
    margin: 8px;
  }

  .md-card-example .md-button-group {
    display: flex;
  }

  .md-card-example .md-button-group .md-button {
    min-width: 60px;
    border-radius: 2px;
  }
</style>