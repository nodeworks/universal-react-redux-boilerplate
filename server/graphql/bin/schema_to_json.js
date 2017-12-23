const graphqlToJson = require('graphql-to-json');
graphqlToJson({input: './server/graphql/bin/schema_node.js', output: './graphql.schema.json'});

