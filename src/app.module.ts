import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { NatsModule } from './transports/nats.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TasksModule, NatsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
