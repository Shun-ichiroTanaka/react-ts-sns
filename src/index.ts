import { MikroORM } from "@mikro-orm/core";
import express from 'express';
import microConfig from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const app = express();
  app.get('/', (_, res) => {
    res.send("どうも");
  });
  
  app.listen(4000, () => {
    console.log('localhost:4000でサーバーを立ち上げ')
  })
};

main().catch((err) => {
  console.error(err);
});