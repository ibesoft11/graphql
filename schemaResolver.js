var graph = require('graphql');
var Db = require('./db.js');

//define our custom DateTime type
const myDateType = new graph.GraphQLScalarType({
  name: 'DateTime',
  description: 'Description of DateTime scalar type',
  serialize(value) {
    return value.getTime();
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10);
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
        budget_vote: (root, args)=> Db.models.budget_vote.findAll({where:{issue_num: args.issue_num}}),
        budget_votes: (root, args)=> Db.models.budget_vote.findAll({where: args}),
        github_users: (root, args)=> Db.models.github_users.findAll({where: args}),
        github_user: (root, args)=> Db.models.github_users.findAll({where: {login: args.login}}),
        issues: (root, args)=> Db.models.issue.findAll({where: args}),
        issue: (root, args)=> Db.models.issue.findAll({where: {num: args.num}}),
        pay_period: (root, args)=> Db.models.pay_period.findAll({where: args}),
        reward_vote: (root, args)=> Db.models.reward_vote.findAll({where: args}),
        trust_cert: (root, args)=> Db.models.trust_cert.findAll({where: args})
    }
}
module.exports = resolvers;