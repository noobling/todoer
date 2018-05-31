<template>
    <v-content>
      <section>
        <v-parallax :src="require('@/assets/bg-header-star.jpg')" height="600">
          <v-layout
            column
            align-center
            justify-center
            class="white--text"
          >
            <h1 class="white--text mb-2 display-3 text-xs-center mt-5">Todoer</h1>
            <div class="subheading mb-3 text-xs-center">by David and Thai</div>
            <v-layout class="mt-5">
              <v-flex>
                <v-btn
                  large
                  color="primary"
                  to="/signup"
                >
                  Get Started
                </v-btn>
              </v-flex>
              <v-flex>
                <a href="/info">
                  <v-btn large color="secondary">
                    Learn More
                  </v-btn>
                </a>
              </v-flex>
            </v-layout>
            
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">A Modern Todo App</h2>
              <span class="subheading">
                Powered by the latest web technologies
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">color_lens</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Responsive to the Core</div>
                    </v-card-title>
                    <v-card-text class="text-sm-center">
                      Browse the app anywhere on any device. 100% repsonsive, anything less would be not be acceptable. 
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">flash_on</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Blazing Fast SPA App</div>
                    </v-card-title>
                    <v-card-text class="text-xs-center">
                      Built from the ground up to be a fast modern web application. Pages load instantly, get work done faster.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">build</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">For Collaboration</div>
                    </v-card-title>
                    <v-card-text class="text-xs-center">
                      We didn't hold back when it came to extending the software for collaboration. With real time chat and updates work with your team members more effectively.
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-parallax :src="require('@/assets/bg-header-star.jpg')" height="380">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-3 text-xs-center">Collaboration has never been easier</div>
            <em>Kick-start your life today</em>
            <v-btn
              large
              color="primary"
              to="/signup"
            >
              Get Started
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Thai Nguyen</div>
                </v-card-title>
                <v-card-text>
                  Software engi. Check out my club too <a href="https://codersforcauses.org" target="_blank"> here </a>
                </v-card-text>
                <v-list class="transparent">
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">phone</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>450-242-678</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">place</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>UWA, BEST UNIVERSITY</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">email</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>21986407@student.uwa.edu.au</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">David Yu</div>
                </v-card-title>
                <v-card-text>
                  I program sometimes and I made this web app. Check out my club too <a href="https://codersforcauses.org" target="_blank"> here </a>
                </v-card-text>
                <v-list class="transparent">
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">phone</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>450-759-888</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">place</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>UWA, BEST UNIVERSITY</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">email</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>21711933@student.uwa.edu.au</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>
    </v-content>
</template>

<style>
  a {
    text-decoration: none;
  }
</style>
