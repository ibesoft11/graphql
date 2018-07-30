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
        dataface_failed_logins: (root, args)=> Db.models.dataface_failed_logins.findAll({where: args}),
        dataface_modules: (root, args)=> Db.models.dataface_modules.findAll({where: args}),
        dataface_mtimes: (root, args)=> Db.models.dataface_mtimes.findAll({where: args}),
        dataface_version: (root, args)=> Db.models.dataface_version.findAll({where: args}),
        github_users: (root, args)=> Db.models.github_users.findAll({where: args}),
        github_user: (root, args)=> Db.models.github_user.findAll({where: {login: args.login}}),
        issues: (root, args)=> Db.models.issue.findAll({where: args}),
        issue: (root, args)=> Db.models.issue.findAll({where: {num: args.num}}),
        pay_period: (root, args)=> Db.models.pay_period.findAll({where: args}),
        reward_vote: (root, args)=> Db.models.reward_vote.findAll({where: args}),
        trust_cert: (root, args)=> Db.models.trust_cert.findAll({where: args})
    },
    Mutation: {
        createPay_period: async (_, {start_date, end_date, weighted, rate}) =>{
            let isCreated=false;
          await Db.models.pay_period.create({
              start_date: start_date,
              end_date: end_date,
              weighted: weighted,
              rate: rate
          }).then(() => {
              isCreated = true;
          }).catch((err) => {
              isCreated = false;
          });
          if (isCreated == true){
            return "Pay period added successfully";
          } else {
            return "Pay period was not created, an error occurred";
          }
      },
        createGithub_user: async (_, {login, followers, name, location, email, bio, websiteUrl, avatarUrl, permission, createdAt, session_token, verified_coop}) =>{
            let isCreated=false;
          await Db.models.github_user.create({
              login: login,
              followers: followers,
              name: name,
              location: location,
              email: email,
              bio: bio,
              websiteUrl: websiteUrl,
              avatarUrl: avatarUrl,
              permission: permission,
              createdAt: createdAt,
              session_token: session_token,
              verified_coop: verified_coop
          }).then(() => {
              isCreated = true;
          }).catch((err) => {
              isCreated = false;
          });
          if (isCreated == true){
            return "Github user added successfully";
          } else {
            return "Github user was not created, an error occurred";
          }
      },
        createDataface_version: async (_, {version}) =>{
            let isCreated=false;
          await Db.models.dataface_version.create({
              version: version
          }).then(() => {
              isCreated = true;
          }).catch((err) => {
              isCreated = false;
          });
          if (isCreated == true){
            return "Dataface version added successfully";
          } else {
            return "Dataface version was not created, an error occurred";
          }
      },
        createDataface_mtimes: async (_, {name, mtime}) =>{
            let isCreated=false;
          await Db.models.dataface_mtimes.create({
              name: name,
              mtime: mtime
          }).then(() => {
              isCreated = true;
          }).catch((err) => {
              isCreated = false;
          });
          if (isCreated == true){
            return "Dataface mtimes added successfully";
          } else {
            return "Dataface mtimes was not created, an error occurred";
          }
      },
        createDataface_modules: async (_, {module_name, module_version}) =>{
            let isCreated=false;
          await Db.models.dataface_modules.create({
              module_name: module_name,
              module_version: module_version
          }).then(() => {
              isCreated = true;
          }).catch((err) => {
              isCreated = false;
          });
          if (isCreated == true){
            return "Dataface module added successfully";
          } else {
            return "Dataface module was not created, an error occurred";
          }
      },
        createDataface_failed_logins: async (_, {attempt_id, ip_address, username, time_of_attempt}) =>{
            let isCreated=false;
          await Db.models.dataface_failed_logins.create({
              attempt_id: attempt_id,
              ip_address: ip_address,
              username: username,
              time_of_attempt: time_of_attempt
          }).then(() => {
              isCreated = true;
          }).catch((err) => {
              isCreated = false;
          });
          if (isCreated == true){
            return "Dataface failed login added successfully";
          } else {
            return "Dataface failed login was not created, an error occurred";
          }
      },
        createBudget_vote: async (_, {pay_period, issue_num, voter, amount, vote_time}) =>{
            let isCreated=false;
          await Db.models.budget_vote.create({
              pay_period: pay_period,
              issue_num: issue_num,
              voter: voter,
              amount: amount,
              vote_time: vote_time
          }).then(() => {
              isCreated = true;
          }).catch((err) => {
              isCreated = false;
          });
          if (isCreated == true){
            return "Budget voted created successfully";
          } else {
            return "Budget vote was not created, an error occurred";
          }
      },
        createAuthorities: async (_, {login, rating, last_cert_time}) =>{
            let isCreated=false;
          await Db.models.authorities.create({
              login: login,
              rating: rating,
              last_cert_time: last_cert_time
          }).then(() => {
              isCreated = true;
          }).catch((err) => {
              isCreated = false;
          });
          if (isCreated == true){
            return "Authority added successfully";
          } else {
            return "Authority was not created, an error occurred";
          }
      },
        createAdmin_setting: async (_, {current_pay_period}) =>{
            let isCreated=false;
          await Db.models.admin_settings.create({
              current_pay_period: current_pay_period
          }).then(() => {
              isCreated = true;
          }).catch((err) => {
              isCreated = false;
          });
          if (isCreated == true){
            return "Admin setting added successfully";
          } else {
            return "Admin setting was not created, an error occurred";
          }
      },
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