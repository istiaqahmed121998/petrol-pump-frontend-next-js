const navigation = () => {
  return [
    {
      title: 'Home',
      path: '/admin',
      icon: 'tabler:smart-home'
    },
    {
      title: 'Yealy Sells',
      path: '/admin/yearly',
      icon: 'tabler:gas-station'
    },
    {
      title: 'Perday Sells',
      path: '/admin/perday',
      icon: 'tabler:gas-station'
    },
    ,
    {
      title: 'Expense',
      icon: 'tabler:gas-station-off',
      badgeColor: 'danger',
      children: [
        {
          title: 'View',
          path: '/admin/expense/view'
        },
        {
          title: 'Create',
          path: '/admin/expense/create'
        }
      ]
    },
    {
      title: 'Manager',
      icon: 'tabler:user',
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
    },
    {
      title: 'Octane',
      icon: 'tabler:archive',
      badgeColor: 'success',
      children: [
        {
          title: 'View',
          path: '/admin/octane/view'
        },
        {
          title: 'Per day',
          path: '/admin/octane/perday'
        },
        {
          title: 'Create',
          path: '/admin/octane/create'
        },
        
      ]
    },
    {
      title: 'Diesel',
      icon: 'tabler:archive',
      badgeColor: 'success',
      children: [
        {
          title: 'View',
          path: '/admin/diesel/view'
        },
        {
          title: 'Per day',
          path: '/admin/diesel/perday'
        },
        {
          title: 'Create',
          path: '/admin/diesel/create'
        },
        
      ]
    },
    {
      title: 'Mobil',
      icon: 'tabler:archive',
      badgeColor: 'success',
      children: [
        {
          title: 'View',
          path: '/admin/mobil/view'
        },
        {
          title: 'Per day',
          path: '/admin/mobil/perday'
        },
        {
          title: 'Create',
          path: '/admin/mobil/create'
        },
        
      ]
    }
  ]
}

export default navigation
