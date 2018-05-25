<template>
  <v-content>
    <v-layout mt-5>
      <v-flex xs12 sm6 offset-sm3>
        <v-toolbar
          xs12 sm6 offset-sm3
          dense
        >
        <v-text-field prepend-icon="search" hide-details single-line placeholder="Search Todos"></v-text-field>
        <v-btn :to="'/todolist/'+todoList._id+'/todoItem/create'" icon>
          <v-icon>add</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>people</v-icon>
        </v-btn>
      </v-toolbar>
      </v-flex>
    </v-layout>
    
      
    <v-layout row mt-4>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
        <v-list three-line>
          <v-subheader v-if="todoList.name">{{ todoList.name }}</v-subheader>
          <template v-for="(item, index) in todoItems">
            <v-divider v-if="index != 0" :inset="true" :key="index"></v-divider>
            <v-list-tile :key="item.name" class="tile" avatar>
              <v-list-tile-avatar @click="item.profileDialog = true">
                <img :src="userAvatar(item)">
              </v-list-tile-avatar>
              <v-list-tile-content @click="item.itemDialog = true" class="tile-text">
                <v-list-tile-title v-html="item.name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.description"></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-dialog v-model="item.profileDialog" max-width="500px">
                <v-card>
                  <v-card-title>
                    {{ item.title }} 's Todo List
                  </v-card-title>
                  <v-card-text>
                    
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="primary" flat @click.stop="item.profileDialog=false">Close</v-btn>
                    <v-btn color="orange" flat :to="'/profile/'+item.userId">View Profile</v-btn>                                        
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog
                v-model="item.itemDialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
                scrollable
              >
                <v-card tile>
                  <v-toolbar card>
                    <v-btn icon dark @click.native="item.itemDialog = false">
                      <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Settings</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                      <v-btn dark flat>Save</v-btn>
                    </v-toolbar-items>
                    <v-menu bottom right offset-y>
                      <v-btn slot="activator" dark icon>
                        <v-icon>more_vert</v-icon>
                      </v-btn>
                    </v-menu>
                  </v-toolbar>
                  <v-card-text>
                    Card text here
                  </v-card-text>

                  <div style="flex: 1 1 auto;"></div>
                </v-card>
              </v-dialog>
            </v-list-tile>
            
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</v-content>
  
</template>
<script>
import axios from 'axios'

let utils = require('../js/utils')

export default {
  created () {
    this.fetchTodoList()
    this.fetchTodoListItems()
    // eslint-disable-next-line
    window.events.$on('JoinedTodoList', flash('Joined Todo List'))
  },

  watch: {
    '$route' (to, from) {
      this.todoListId = to.params.todoListId
      this.fetchTodoList()
      this.fetchTodoListItems()
    }
  },

  data () {
    return {
      todoList: '',
      todoItems: [],
      todoListId: this.$route.params.todoListId,
      userAvatar: utils.userAvatar
    }
  },

  methods: {
    fetchTodoList () {
      axios(window.HOST + '/todolist/' + this.todoListId, {
        method: 'GET',
        withCredentials: true
      }).then(({data}) => {
        this.todoList = data
      }).catch((err) => {
        // eslint-disable-next-line
        flash('Failed to fetch todolist check developer console for more information', 'error')
        console.log(err.response.data)
      })
    },

    fetchTodoListItems () {
      axios.get(window.HOST + '/todolist/' + this.todoListId + '/todoItems')
        .then(({data}) => {
          for (let i = 0; i < data.length; i++) {
            this.todoItems.push(data[i])
            data[i].participants.forEach(participant => {
              axios.get(window.HOST + '/user/' + participant)
                .then(({data}) => {
                  // assuming only one participant for now
                  this.todoItems[i].assignedUser = data
                })
            })
          }
        })
    }
  }
}
</script>

<style scoped>
  .avatar {
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  }

  .avatar:hover {
    cursor: pointer;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }

  .tile {
    transition: all 0.3s;
  }

  .tile:hover {
    background: hsla(0,0%,100%,.12);
  }

  .tile-text:hover {
    cursor: pointer;
  }
</style>
