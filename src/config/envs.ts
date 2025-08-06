import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  TASKS_MICROSERVICE_HOST: string;
  TASKS_MICROSERVICE_PORT: number;
  NATS_SERVERS: string[];
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    TASKS_MICROSERVICE_HOST: joi.string().required(),
    TASKS_MICROSERVICE_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  tasksMicroserviceHost: envVars.TASKS_MICROSERVICE_HOST,
  tasksMicroservicePort: envVars.TASKS_MICROSERVICE_PORT,
};
