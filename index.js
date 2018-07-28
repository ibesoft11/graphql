var Db = require('./db.js');
const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `
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
      
  }
`