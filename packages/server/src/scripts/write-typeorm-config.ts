import TypeOrmConfig from '../config/TypeOrmConfig'
import * as fs from 'fs'

const configInstance = new TypeOrmConfig()
fs.writeFileSync(
  'ormconfig.json',
  JSON.stringify(configInstance.createTypeOrmOptions(), null, 2),
)
