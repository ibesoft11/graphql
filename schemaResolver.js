var graph = require('graphql');
var Db = require('./db.js');

//define our custom DateTime type
const myDateType = new graph.GraphQLScalarType({
  name: 'DateTime',
  description: 'DateTime scalar type',
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

//Resolver functions for views
function getViewData(viewName){
  return new Promise(resolve => {
    Db.query(`SELECT * FROM ${viewName}`, { type: Db.QueryTypes.SELECT}).then(result =>{
      resolve(result);
    });
  });
}
//Resolver for our schema definitions
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
        issues: (root, args)=> Db.models.issue.findAll({where: args}),
        pay_period: (root, args)=> Db.models.pay_period.findAll({where: args}),
        reward_vote: (root, args)=> Db.models.reward_vote.findAll({where: args}),
        trust_cert: (root, args)=> Db.models.trust_cert.findAll({where: args}),
        //Use SQL Raw Queries to fetch data from Views
        invoice_summary: (root, args)=> getViewData('invoice_summary').then((result)=>{
          return result;
        }),
        issue_budget: (root, args)=> getViewData('issue_budget').then((result)=>{
          return result;
        }),
        reward: (root, args)=> getViewData('reward').then((result)=>{
          return result;
        }),
        slash_judgement: (root, args)=> getViewData('slash_judgement').then((result)=>{
          return result;
        }),
        task_approval_overdue: (root, args)=> getViewData('task_approval_overdue').then((result)=>{
          return result;
        }),
        user_flair: (root, args)=> getViewData('user_flair').then((result)=>{
          return result;
        })
    }
}
module.exports = resolvers;