<template lang="html">
  <div class="v-autocomplete">
    <div class="v-autocomplete-input-group" :class="{'v-autocomplete-selected': value}">
      <input type="search" v-model="searchText" v-bind="inputAttrs" 
            :class="inputAttrs.class || inputClass"
            :placeholder="inputAttrs.placeholder || placeholder"
            :disabled="inputAttrs.disabled || disabled"
            @blur="blur" @focus="focus" @input="inputChange"
            @keyup.enter="keyEnter" @keydown.tab="keyEnter" 
            @keydown.up="keyUp" @keydown.down="keyDown">
    </div>
    <div class="v-autocomplete-list" v-if="show">
      <div class="v-autocomplete-list-friends" v-for="friend in friends" :key="friend.id" @click="onClickfriends(friend)"
           :class="{'v-autocomplete-friends-active': i === cursor}" @mouseover="cursor = i">
        <div :is="componentfriend" :friend="friend" :searchText="searchText"></div>
      </div>
    </div>
  </div>
</template>



<template>

<div>

    <h1 v-if="Globals.user">{{Globals.user.name}} Friends Page</h1>
    <ul>
        <li v-for="friend in friends" :key="friend.id">
            {{friend.FirstName}} {{friend.LastName}}
        </li>
    </ul>
</div>
</template>

<script>
import { Globals } from "@/models/api";
import { GetFriends } from "@/models/users.js";



export default {
    data(){
        return {
            Globals: Globals,
            friends: []
        }
    },
    async mounted(){
        this.friends = await GetFriends();
    },
    name: 'v-autocomplete',
  props: {
    componentfriends: { default: () => friends },
    value: null,
    getLabel: {
      type: Function,
      default: friends => friends
    },
    friends: Array,
    autoSelectOnefriends: { type: Boolean, default: true },
    placeholder: String,
    inputClass: {type: String, default: 'v-autocomplete-input'},
    disabled: {type: Boolean, default: false},
    inputAttrs: {type: Object, default: () => {return {}}},
    keepOpen: {type: Boolean, default: false}
  },
  data () {
    return {
      searchText: '',
      showList: false,
      cursor: -1,
      internalfriends: this.friends || []
    }
  },
  computed: {
    hasfriends () {
      return !!this.internalfriends.length
    },
    show () {
      return (this.showList && this.hasfriends) || this.keepOpen
    }
  },
  methods: {
    inputChange () {
      this.showList = true
      this.cursor = -1
      this.onSelectfriends(null, 'inputChange')
      utils.callUpdatefriends(this.searchText, this.updatefriends)
      this.$emit('change', this.searchText)
    },
    updatefriendss () {
      this.$emit('update-friends', this.searchText)
    },
    focus () {
      this.$emit('focus', this.searchText)
      this.showList = true
    },
    blur () {
      this.$emit('blur', this.searchText)
      setTimeout( () => this.showList = false, 200)
    },
    onClickfriend(friends) {
      this.onSelectfriends(friends)
      this.$emit('friends-clicked', friends)
    },
    onSelectfriend (friends) {
      if (friends) {
        this.internalfriends = [friends]
        this.searchText = this.getLabel(friends)
        this.$emit('friends-selected', friends)
      } else {
        this.setfriends(this.friends)
      }
      this.$emit('input', friends)
    },
    setfriends (friends) {
      this.internalfriends = friends || []
    },
    isSelectedValue (value) {
      return 1 == this.internalfriends.length && value == this.internalfriends[0]
    },
    keyUp (e) {
      if (this.cursor > -1) {
        this.cursor--
        this.friendsView(this.$el.getElementsByClassName('v-autocomplete-list-friends')[this.cursor])
      }
    },
    keyDown (e) {
      if (this.cursor < this.internalfriends.length) {
        this.cursor++
        this.friendsView(this.$el.getElementsByClassName('v-autocomplete-list-friends')[this.cursor])
      }
    },
    friendsView (friends) {
      if (friends && friends.scrollIntoView) {
        friends.scrollIntoView(false)
      }
    },
    keyEnter (e) {
      if (this.showList && this.internalfriends[this.cursor]) {
        this.onSelectfriends(this.internalfriends[this.cursor])
        this.showList = false
      }
    },
  }
  }

</script>

<style>
 .v-autocomplete {
    position: relative;
  }
  .v-autocomplete .v-autocomplete-list {
    position: absolute;
  }
  .v-autocomplete .v-autocomplete-list .v-autocomplete-list-friends {
    cursor: pointer;
  }
  .v-autocomplete .v-autocomplete-list .v-autocomplete-list-friends.v-autocomplete-friends-active {
    background-color: #f3f6fa;
  }
</style>
