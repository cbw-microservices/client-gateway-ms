import { Module } from '@nestjs/common';

import { TasksController } from './tasks.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVICE} from 'src/config';

@Module({
  controllers: [TasksController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: NATS_SERVICE,
        transport: Transport.NATS,
        options:{
         servers: envs.natsServers,
        }
      },
  ])
]
})
export class TasksModule {}
