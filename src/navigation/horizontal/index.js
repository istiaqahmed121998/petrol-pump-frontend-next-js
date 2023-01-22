const navigation = () => [
  {
    title: 'Home',
    path: '/admin',
    icon: 'tabler:smart-home',
  },
  {
    title: 'Second Page',
    path: '/admin/second-page',
    icon: 'tabler:mail',
  },
  {
    title: 'Manager',
    path: '/admin/manager',
    icon: 'tabler:mail',
  },
  {
    path: '/acl',
    action: 'read',
    subject: 'acl-page',
    title: 'Access Control',
    icon: 'tabler:shield',
  }
]

export default navigation
