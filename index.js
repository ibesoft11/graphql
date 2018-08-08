var typeDefs = require('./schemaDefs');
var resolvers = require('./schemaResolver');
const { GraphQLServer } = require('graphql-yoga');

const server = new GraphQLServer({typeDefs, resolvers});
const port = process.env.PORT || 4000;
server.start({port: port}, () => console.log('Server is running on localhost:'+port));