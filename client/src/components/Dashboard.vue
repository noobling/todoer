<template>
    <div>
      <v-content>
        <v-layout column>
          <v-flex xs12 sm6>
                <v-btn large color="green">
                  Create New Shared Todo List
                  <v-icon>add</v-icon>
                </v-btn>
                <v-btn large color="info">
                  Join a Shared Todo List
                  <v-icon>group</v-icon>
                </v-btn>
          </v-flex>
          <v-flex xs12 sm6 mt-5>
            <v-card>
              <v-container fluid grid-list-md>
                <v-layout row wrap>
                  <v-flex
                    v-for="card in cards"
                    v-bind="{ [`xs${card.flex}`]: true }"
                    :key="card.title"
                  >
                    <v-card>
                      <v-card-media
                        :src="card.src"
                        height="200px"
                      >
                        <v-container fill-height fluid>
                          <v-layout fill-height>
                            <v-flex xs12 align-end flexbox>
                              <span class="headline white--text" v-text="card.title"></span>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-card-media>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="card.dialog" max-width="290">
                          <v-btn flat slot="activator" color="red">Delete</v-btn>
                          <v-card>
                            <v-card-title class="headline">Are you sure you want to delete {{ card.title }}?</v-card-title>
                            <v-card-text>Warning you cannot undo this action!</v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="red" flat @click.native="card.dialog = false">Yes I am sure, delete</v-btn>                              
                              <v-btn color="green" flat @click.native="card.dialog = false">Cancel</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                        <v-btn flat color="orange">View</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-content>
      <v-footer app>
        <span>&copy; 2017</span>
      </v-footer>
    </div>
</template>

<script>
export default {
  data () {
    return {
      cards: [
        { title: 'Family Todo list', src: require('@/assets/todolists-img1.jpeg'), flex: 12, dialog: false },
        { title: 'CITS 2401 Project', src: require('@/assets/todolists-img2.jpeg'), flex: 6, dialog: false },
        { title: 'Coders for Causes Committee Todo List', src: require('@/assets/todolists-img3.jpeg'), flex: 6 }
      ]
    }
  }
}
</script>


