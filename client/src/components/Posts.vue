<template>
    <div class="posts">
        <h1>Посты</h1>
        Здесь перечислены все сообщения
        <div v-if='posts.length > 0' class="table-wrap">
           <div>
               <router-link :to="{ name: 'addpost' }" class="">Добавить пост</router-link>
           </div>
           <table>
               <tr>
                   <td>Название</td>
                   <td width="550">Описание</td>
                   <td width="100" align="center">Действие</td>
               </tr>
               <v-for="post_in_posts" :key="post.id">
                   <td>{{ post.title }}</td>
                   <td>{{ post.description }}</td>
                   <td align="center">
                       <router-link :to="{ name: 'editpost', params: { id: post._id } }">Редактировать</router-link>
                       <a href="#" @click="deletePost(post._id)">Удалить</a>
                   </td>
           </table>
        </div>
        <div v-else>
            Надо добавить хотя-бы один пост <br/><br/>
            <router-link :to="{ name: 'addpost' }" class="add_post_link">Добавить пост</router-link>
        </div>
    </div>
</template>

<script>
import PostsService from '@/services/PostsService'

export default {
    name: 'posts',
    data() {
        return {
            posts: []
        }
    },
    mounted() {
        this.getPosts()
    },
    methods: {
        async getPosts() {
            const response = await PostsService.fetchPosts()
            this.posts = response.data.posts
        },
        async deletePost(id) {
            const $this = this
            $this.$swal({
                title:'Вы уверены?',
                text: 'Это действие нельзя будет отменить!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Да, удалить'
            }). then(function() {
                PostsService.deletePost(id)
                $this.$router.go({
                    path:'/'
                })
            })
        }
    }
}
</script>

<style type="text/css">
    .table-wrap {
        width: 60%;
        margin: 0 auto;
        text-align: center;
    }

    table th, table tr {
        text-align: left;
    }

    table thead {
        background: #f2f2f2;
    }

    table tr td {
        padding: 10px;
    }

    table tr:nth-child(odd) {
        background: #f2f2f2;
    }

    table tr:nth-child(1) {
        background: #4d7ef7;
        color: #fff;
    }

    a {
        color: #4d7ef7;
        text-decoration: none;
    }

    a.add_post_link {
        background: #4d7ef7;
        color: #fff;
        padding: 10px 80px;
        text-transform: uppercase;
        font-size: 12px;
        font-weight: bold;
    }
</style>