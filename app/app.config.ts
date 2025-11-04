export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
    },
    button: {
      slots: {
        base: 'cursor-pointer',
      },
    },
    checkbox: {
      variants: {
        disabled: {
          false: {
            base: 'cursor-pointer',
          },
        },
      },
    },
    dropdownMenu: {
      slots: {
        item: 'cursor-pointer',
      },
    },
    selectMenu: {
      slots: {
        base: 'cursor-pointer',
      },
    },
    tabs: {
      slots: {
        trigger: 'cursor-pointer',
      },
    },

    dashboardSidebarCollapse: {
      base: 'cursor-pointer',
    },
    dashboardSidebarToggle: {
      base: 'cursor-pointer',
    },
  },
})
