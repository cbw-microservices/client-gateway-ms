import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { NatsModule } from './transports/nats.module';

@Module({
  imports: [TasksModule, NatsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
