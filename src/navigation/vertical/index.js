const navigation = () => {
  return [
    {
      title: 'Home',
      path: '/admin',
      icon: 'tabler:smart-home'
    },
    {
      title: 'Second Page',
      path: '/admin/second-page',
      icon: 'tabler:mail'
    },
    ,
    {
      badgeContent: '2',
      title: 'Manager',
      icon: 'tabler:archive',
      badgeColor: 'success',
      children: [
        {
          title: 'View',
          path: '/admin/manager/view'
        },
        {
          title: 'Create',
          path: '/admin/manager/create'
        }
      ]
    }
  ]
}

export default navigation
