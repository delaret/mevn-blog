import Vue from 'vue'
import Router from 'vue-router'
import Posts from '@/components/Posts'
import addpost from '@/components/AddPost'
import editpost from '@/components/EditPost'
import HelloWorld from '@/components/HelloWorld'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Posts',
      component: Posts
    },
    {
      path:'/posts/add',
      name: 'addpost',
      component: addpost
    },
    {
      path:'/posts/:id/edit',
      name: 'editpost',
      component: editpost
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
