import { DataSource } from 'typeorm'

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: '0.0.0.0',
        port: 5432,
        username: 'postgres',
        password: 'fUck_U_n1ggErs_@ss',
        database: 'chatxdb',
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      })

      return dataSource.initialize()
    },
  },
]
