import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

module.exports = {
  type: 'mysql',
  host: 'my-database',
  port: 3306,
  username: 'root',
  password: 'root',
  namingStrategy: new SnakeNamingStrategy(),
};
