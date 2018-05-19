<template>
  <v-content>
    <v-layout mt-5>
      <v-flex xs12 sm6 offset-sm3>
        <v-toolbar
          xs12 sm6 offset-sm3
          dense
        >
        <v-text-field prepend-icon="search" hide-details single-line placeholder="Search Todos"></v-text-field>
      </v-toolbar>
      </v-flex>
    </v-layout>
    
      
    <v-layout row mt-4>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
        <v-list three-line>
          <template v-for="(item, index) in items">
            <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
            <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
            <v-list-tile v-else :key="item.title" class="tile" avatar>
              <v-list-tile-avatar @click="item.profileDialog = true">
                <img :src="item.avatar">
              </v-list-tile-avatar>
              <v-list-tile-content @click="item.itemDialog = true" class="tile-text">
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
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
export default {
  data () {
    return {
      items: [
        { header: 'Coders for Causes Committee Todo List' },
        {
          avatar: require('@/assets/profile1.jpeg'),
          title: 'Brunch this weekend?',
          subtitle:
            "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
          id: 1,
          profileDialog: false,
          itemDialog: false,
          userId: 1
        },
        { divider: true, inset: true },
        {
          avatar: require('@/assets/profile3.jpeg'),
          title: 'Oui oui',
          subtitle:
            "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
          id: 2,
          profileDialog: false,
          itemDialog: false,
          userId: 2
        },
        { divider: true, inset: true },
        {
          avatar: require('@/assets/profile4.jpg'),
          title: 'Birthday gift',
          subtitle:
            "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?",
          id: 3,
          profileDialog: false,
          itemDialog: false,
          userId: 3
        },
        { divider: true, inset: true },
        {
          avatar: require('@/assets/hero.jpeg'),
          title: 'Recipe to try',
          subtitle:
            "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
          id: 4,
          profileDialog: false,
          itemDialog: false,
          userId: 4
        }
      ]
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
