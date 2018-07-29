//var typeDefs = require('./schemaDefs');
//var resolvers = require('./schemaResolver');
const { GraphQLServer } = require('graphql-yoga');
var Db = require('./db.js');

const typeDefs = `
  scalar DateTime

  type Query {
    admin_settings: [admin_settings],
    authorities: [authorities],
    budget_vote: [budget_vote],
    dataface_failed_logins: [dataface_failed_logins],
    dataface_modules: [dataface_modules],
    dataface_mtimes: [dataface_mtimes],
    dataface_version: [dataface_version],
    github_users: [github_users],
    issue: [issue],
    pay_period: [pay_period],
    reward_vote: [reward_vote],
    trust_cert: [trust_cert]
  }
  type admin_settings {
    id: ID!,
    current_pay_period: DateTime!
  }
  type authorities {
    login: String,
    rating: Int,
    last_cert_time: DateTime
  }
  type budget_vote {
    pay_period: DateTime!,
    issue_num: Int!,
    voter: String!,
    amount: Float!,
    vote_time: DateTime!
  }
  type github_users {
    login: String!,
    followers: Int,
    name: String,
    location: String,
    email: String,
    bio: String,
    websiteUrl: String,
    avatarUrl: String,
    permission: String,
    createdAt: DateTime!,
    session_token: String,
    verified_coop: Int
  }
  type dataface_failed_logins {
    attempt_id: Int!,
    ip_address: String!,
    username: String!,
    time_of_attempt: Int!,
  }
  type dataface_modules {
    module_name: String!,
    module_version: Int
  }
  type dataface_mtimes {
    name: String!,
    mtime: Int
  }
  type dataface_version {
    version: Int!
  }
  
  type issue {
    num: Int!,
    title: String!,
    labels: String,
    createdAt: DateTime!,
    updatedAt: DateTime!,
    state: String!,
    repo: String!
  }
  type pay_period {
    start_date: DateTime!,
    end_date: DateTime!,
    weighted: Int,
    rate: Float
  }
  type reward_vote {
    pay_period: DateTime!,
    issue_num: Int!,
    voter: String!,
    worker: String!,
    percent: Int!,
    vote_time: DateTime,
    slash: Int
  }
  type trust_cert {
    subject: String!,
    voter: String!,
    rating: Int!,
    cert_time: DateTime!
  }

  type Mutation {
    createAdmin_settings(id: ID!, current_pay_period: DateTime!): String,
    createAuthorities(login: String, rating: Int, last_cert_time: DateTime): String,
    createBudget_vote(pay_period: DateTime!, issue_num: Int!, voter: String!, amount: Float!, vote_time: DateTime!): String,
    createGithub_users(login: String!, followers: Int, name: String, location: String, email: String, bio: String,
        websiteUrl: String,
        avatarUrl: String,
        permission: String,
        createdAt: DateTime!,
        session_token: String,
        verified_coop: Int): String,
    createDataface_failed_logins(attempt_id: Int!, ip_address: String!, username: String!, time_of_attempt: Int!): String,
    createDataface_modules(module_name: String!, module_version: Int): String,
    createDataface_mtimes(name: String!, mtime: Int): String,
    createDataface_version(version: Int!): String,
    createIssue(num: Int!, title: String!, labels: String, createdAt: DateTime!, updatedAt: DateTime!,
            state: String!,
            repo: String!): String,
    createPay_period(start_date: DateTime!, end_date: DateTime!, weighted: Int, rate: Float): String,
    createReward_vote(pay_period: DateTime!, issue_num: Int!, voter: String!, worker: String!,
            percent: Int!,
            vote_time: DateTime,
            slash: Int): String,
    createTrust_cert(subject: String!, voter: String!, rating: Int!, cert_time: DateTime!): String
  }
`
const resolvers = {
    Query: {
        admin_settings: (root, args)=> Db.models.admin_settings.findAll({where: args}),
        authorities: (root, args)=> Db.models.authorities.findAll({where: args}),
        budget_vote: (root, args)=> Db.models.budget_vote.findAll({where:{issue_num: args.issue_num}}),
        //budget_votes: (root, args)=> Db.models.budget_vote.findAll({where: args}),
        dataface_failed_logins: (root, args)=> Db.models.dataface_failed_logins.findAll({where: args}),
        dataface_modules: (root, args)=> Db.models.dataface_modules.findAll({where: args}),
        dataface_mtimes: (root, args)=> Db.models.dataface_mtimes.findAll({where: args}),
        dataface_version: (root, args)=> Db.models.dataface_version.findAll({where: args}),
        github_users: (root, args)=> Db.models.github_user.findAll({where: args}),
        //github_user: (root, args)=> Db.models.github_user.findAll({where: {login: args.login}}),
        //issues: (root, args)=> Db.models.issue.findAll({where: args}),
        issue: (root, args)=> Db.models.issue.findAll({where: {num: args.num}}),
        pay_period: (root, args)=> Db.models.pay_period.findAll({where: args}),
        reward_vote: (root, args)=> Db.models.reward_vote.findAll({where: args}),
        trust_cert: (root, args)=> Db.models.trust_cert.findAll({where: args})
    },
    DateTime: {
        __parseValue(value) {
          return new Date(value); // value from the client
        },
        __serialize(value) {
          return value.getTime(); // value sent to the client
        },
        __parseLiteral(ast) {
          if (ast.kind === Kind.INT) {
            return parseInt(ast.value, 10); // ast value is always in string format
          }
          return null;
        }
      },
    Mutation: {
        createIssue: async (_, {num, title, labels, createdAt, updatedAt, state, repo}) => {
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
const server = new GraphQLServer({typeDefs, resolvers});
server.start(() => console.log('Server is running on localhost:4000'));