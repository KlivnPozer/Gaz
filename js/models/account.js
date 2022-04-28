let user = sqlize.define({
    login: {
      type: Sqlizze.STRING,
      field: 'name',
      allownull: false,
      defaultValue: 'yanglong',
      comment: 'name'
    },
    passwordHash:{
     type: Sqlizze.STRING,
     field: '',
     allownull: false,
     comment: 'passwordHash'
    },
    isRoot:{
        type: Sqlizze.BOOLIAN,
        field: 'isRoot',
        defaultValue: false,
        comment: 'isRoot',
        allownull: false,
    }

  },{
    tableName: 'dt_user'
  })