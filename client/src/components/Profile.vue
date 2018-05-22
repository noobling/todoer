<template>
    <v-content>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
            <v-card>
                <v-card-media :src="require('@/assets/hero.jpeg')" height="300px">
                <v-layout column class="media">
                    <v-card-title>
                    <v-btn icon dark @click="$router.go(-1)">
                        <v-icon>chevron_left</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn icon class="mr-3" dark>
                        <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn icon dark>
                        <v-icon>more_vert</v-icon>
                    </v-btn>
                    </v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-title class="white--text pl-5 pt-5">
                    <div class="display-1 pl-5 pt-5">Ali Conners</div>
                    </v-card-title>
                </v-layout>
                </v-card-media>
                <v-list two-line>
                    <v-list-tile @click="">
                        <v-list-tile-action>
                        <v-icon color="indigo">mail</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                        <v-list-tile-title>aliconnors@example.com</v-list-tile-title>
                        <v-list-tile-sub-title>Personal</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider inset></v-divider>
                    <v-subheader>Public Shared Todo Lists</v-subheader>   
                    <v-list-tile @click="">
                        <v-list-tile-action>
                            <v-icon color="indigo">person</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Alis family todo list</v-list-tile-title>
                            <v-list-tile-sub-title>Alis family todo list</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-subheader>Private Shared Todo Lists</v-subheader>   
                    <v-list-tile>
                        <v-list-tile-action>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Coders for Causes todo list</v-list-tile-title>
                            <v-list-tile-sub-title>A very good shared todo list</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>        
                </v-list>
            </v-card>
            </v-flex>
        </v-layout>
    </v-content>
</template>

<style>
  .media {
      height: 100%;
      margin: 0
  }
</style>