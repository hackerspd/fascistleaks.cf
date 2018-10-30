import { getMD } from './utils'

export default {
//  preact: true,
  getRoutes: async () => {
    const content = await getMD('./src/content')
    const posts = await getMD('./src/posts')
    return [
      {
        path: '/',
        component: 'src/containers/Home',
        getData: () => ({
          content,
          posts,
        }),
      },
      {
        path: '/form',
        component: 'src/containers/Form',
        getData: () => ({
          content,
        })
      },
      {
        path: '/about',
        component: 'src/containers/About',
      },
      {
        path: '/blog',
        component: 'src/containers/Blog',
        getData: () => ({
          posts,
        }),
        children: Object.values(posts).map(post => ({
          path: `/post/${post.slug}`,
          component: 'src/containers/Post',
          getData: () => ({
            post,
          }),
        })),
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
}
