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


            <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
              <md-table-toolbar>
                <div class="md-toolbar-section-start">
                  <h1 class="md-title">Users</h1>
                </div>

                <md-field md-clearable class="md-toolbar-section-end">
                  <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
                </md-field>
              </md-table-toolbar>


              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
                <md-table-cell md-label="Gender" md-sort-by="gender">{{ item.gender }}</md-table-cell>
                <md-table-cell md-label="Job Title" md-sort-by="title">{{ item.title }}</md-table-cell>
              </md-table-row>
            </md-table>


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
        searched: [],
        users: [{
            id: 1,
            name: "Shawna Dubbin",
            email: "sdubbin0@geocities.com",
            gender: "Male",
            title: "Assistant Media Planner"
          },
          {
            id: 2,
            name: "Odette Demageard",
            email: "odemageard1@spotify.com",
            gender: "Female",
            title: "Account Coordinator"
          },
          {
            id: 3,
            name: "Vera Taleworth",
            email: "vtaleworth2@google.ca",
            gender: "Male",
            title: "Community Outreach Specialist"
          },
          {
            id: 4,
            name: "Lonnie Izkovitz",
            email: "lizkovitz3@youtu.be",
            gender: "Female",
            title: "Operator"
          }
        ]
      }
    },

    mounted: function () {
      this.loadData();
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
      searchOnTable() {
        this.searched = this.searchByName(this.users, this.search)
      },
      searchByName: function searchByName(items, term) {
        if (term) {
          return items.filter(item => this.toLower(item.name).includes(this.toLower(term)))
        }
        return items
      },
      toLower: function toLower(text) {
        return text.toString().toLowerCase()
      },
      addDays: function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result.toDateString();
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
  .md-list-item {
    height: fit-content;
  }

  label {
    padding-right: 0.5rem;
  }
</style>