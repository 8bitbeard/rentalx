import { createConnection, getConnectionOptions } from "typeorm";

interface IOptions {
  host: string;
  port: number;
}

getConnectionOptions().then((options) => {
  const newOptions = options as IOptions;
  newOptions.host = "database";
  newOptions.port = 5432;
  createConnection({
    ...options,
  });
});
