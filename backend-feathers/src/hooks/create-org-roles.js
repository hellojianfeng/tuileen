// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return context => {
    const { data } = context;

    // Throw an error if we didn't get a text
    if(!data.id) {
      throw new Error('A message must have a id');
    }

    // The authenticated user
    //const user = context.params.user;
    //by default ,we should add everyone, nobody, member, member.admin, member.employee, member.client, public as default roles to org
    const { app } = context;
    return app.service('roles').create(
      [
        {
          name: 'everyone',
          display_name:'everyone',
          path:'everyone',
          org:{
            oid: data.id,
            name: data.name
          }
        },
        {
          name: 'nobody',
          display_name:'nobody',
          path:'nobody',
          org:{
            oid: data.id,
            name: data.name
          }
        },
        {
          name: 'member',
          display_name:'member',
          path:'member',
          include_opeation_way: 'parent',
          org:{
            oid: data.id,
            name: data.name
          }
        },
        {
          name: 'employee',
          display_name:'employee',
          path:'member.employee',
          org:{
            oid: data.id,
            name: data.name
          }
        },
        {
          name: 'admin',
          display_name:'admin',
          path:'member.admin',
          include_opeation_rule: 'child',
          org:{
            oid: data.id,
            name: data.name
          }
        },
        {
          name: 'client',
          display_name:'client',
          path:'member.client',
          org:{
            oid: data.id,
            name: data.name
          }
        },
        {
          name: 'public',
          display_name:'public',
          path:'public',
          org:{
            oid: data.id,
            name: data.name
          }
        }
      ]
    );
  };
};
