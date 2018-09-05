const typeDefs = `
  scalar DateTime

  type Query {
    admin_settings: [admin_settings],
    authorities(login: String, rating: Int): [authorities],
    budget_votes(voter: String, issue_num: Int): [budget_vote],
    github_users(login: String): [github_users],
    issues(num: Int, state: String): [issue],
    pay_period(start_date: DateTime): [pay_period],
    reward_vote(pay_period: DateTime, issue_num: Int, voter: String, worker: String): [reward_vote],
    trust_cert(subject: String, voter: String, rating: Int): [trust_cert],
    invoice_summary(pay_period: DateTime, worker: String): [invoice_summary],
    issue_budget(issue_num: Int, pay_period: DateTime): [issue_budget],
    reward(issue_num: Int, pay_period: DateTime): [reward],
    slash_judgement: [slash_judgement],
    task_approval_overdue(issue_num: Int, state: String): [task_approval_overdue],
    user_flair(login: String): [user_flair]
  }

  type user_flair {
    login: String,
	  verified_coop: String,
	  rating: Int,
	  rating_label: String,
	  weight: Float,
	  sig: String
  }

  type task_approval_overdue {
    issue_num: Int,
	  title: String,
	  state: String,
	  days_old: Int,
	  weeks_old: Int,
	  labels: String,
	  createdAt: DateTime,
	  updatedAt: DateTime
  }

  type slash_judgement {
    worker: String,
	  voters: String,
	  weight: Float,
	  issue_num: Int,
	  pay_period: DateTime
  }

  type reward {
    issue_num: Int,
    title: String,
    worker: String, 
    reward_usd: Float,
    percent_avg: Float,
    budget_usd: Float,
    voter_qty: Int,
    voters: String,
    reward_provisional: Float,
    budget_provisional: Float,
    pay_period: DateTime,
    labels: String
  }

  type issue_budget {
    issue_num: Int,
    title: String,
    budget_usd: Float,
    budget_provisional: Float,
    voter_qty: Int,
    voters: String,
    pay_period: DateTime,
    labels: String
  }

  type invoice_summary {
    pay_period: DateTime!,
    worker: String,
    issues: String,
    USD: Int,
    RHOC: Float
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
`
module.exports = typeDefs;