import { configInstance } from '../config/ConfigService'
import * as fs from 'fs'

fs.writeFileSync(
  'ormconfig.json',
  JSON.stringify(configInstance.createTypeOrmOptions(), null, 2),
)
