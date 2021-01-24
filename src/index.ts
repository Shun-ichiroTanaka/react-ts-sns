import { MikroORM } from "@mikro-orm/core";
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from "type-graphql";
import microConfig from "./mikro-orm.config";
import { HelloResolver } from "./resolvers/hello";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ HelloResolver] ,
      validate: false
    })
  });

  apolloServer.applyMiddleware({ app });
  
  app.listen(4000, () => {
    console.log('localhost:4000でサーバーを立ち上げ')
  })
};

main().catch((err) => {
  console.error(err);
});