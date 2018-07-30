var graph = require('graphql');
var Db = require('./db.js');

const myDateType = new graph.GraphQLScalarType({
  name: 'DateTime',
  description: 'Description of DateTime scalar type',
  serialize(value) {
    console.log('dd');
    return value.getTime();
  },
  parseValue(value) {
    console.log('dd');
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      console.log('dd');
      return parseInt(ast.value, 10); // ast value is always in string format
    }
  }
});


const resolvers = {
    DateTime: {
      myDateType
    },
    Query: {
        admin_settings: (root, args)=> Db.models.admin_settings.findAll({where: args}),
        authorities: (root, args)=> Db.models.authorities.findAll({where: args}),
        budget_vote: (root, args)=> Db.models.budget_votes.findAll({where:{issue_num: args.issue_num}}),
        //budget_votes: (root, args)=> Db.models.budget_vote.findAll({where: args}),
        dataface_failed_logins: (root, args)=> Db.models.dataface_failed_logins.findAll({where: args}),
        dataface_modules: (root, args)=> Db.models.dataface_modules.findAll({where: args}),
        dataface_mtimes: (root, args)=> Db.models.dataface_mtimes.findAll({where: args}),
        dataface_version: (root, args)=> Db.models.dataface_versions.findAll({where: args}),
        github_users: (root, args)=> Db.models.github_users.findAll({where: args}),
        //github_user: (root, args)=> Db.models.github_user.findAll({where: {login: args.login}}),
        issues: (root, args)=> Db.models.issue.findAll({where: args}),
        issue: (root, args)=> Db.models.issue.findAll({where: {num: args.num}}),
        pay_period: (root, args)=> Db.models.pay_periods.findAll({where: args}),
        reward_vote: (root, args)=> Db.models.reward_votes.findAll({where: args}),
        trust_cert: (root, args)=> Db.models.trust_certs.findAll({where: args})
    },
    Mutation: {
        createIssue: async (_, {num, title, labels, createdAt, updatedAt, state, repo}) =>{
            let isCreated=false;
          await Db.models.issue.create({
              num: num,
              title: title,
              labels: labels,
              createdAt: createdAt,
              updatedAt: updatedAt,
              state: state,
              repo: repo
          }).then(() => {
              isCreated = true;
          }).catch((err) => {
              isCreated = false;
          });
          if (isCreated == true){
            return "Issue created successfully";
          } else {
            return "Issue was not created, an error occurred";
          }
      }
    }
}
module.exports = resolvers;