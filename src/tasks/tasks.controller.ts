import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { NATS_SERVICE } from 'src/config';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PatchTaskDto } from './dto/patch-task.dto';
import { catchError } from 'rxjs';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { AuthGuard } from 'src/auth/guards/auth.guard';
@Controller('tasks')
export class TasksController {
  constructor(
    @Inject(NATS_SERVICE) private readonly tasksClient: ClientProxy,
  ) { }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksClient.send('createTask', createTaskDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(
    @Query() paginationDto: PaginationDto
  ) {
    return this.tasksClient.send('findAllTasks', paginationDto);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.tasksClient.send('findOneTask', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }));
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id', ParseMongoIdPipe) id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksClient.send('updateTask', { updateTaskDto, id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }));;
  }
  
  @UseGuards(AuthGuard)
  @Patch(':id')
  async patch(@Param('id', ParseMongoIdPipe) id: string, @Body() patchTaskDto: PatchTaskDto) {
    return this.tasksClient.send('patchTask', { id, patchTaskDto }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }));;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.tasksClient.send('removeTask', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }));;
  }

  @UseGuards(AuthGuard)
  @Get('status/:status')
  async findByStatus(@Param('status') status: string) {
    return this.tasksClient.send('findByStatus', status).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }));
  }

  @UseGuards(AuthGuard)
  @Post(':id/schedule')
  async schedule(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() body: { runAt: Date },
  ) {
    return this.tasksClient.send('scheduleTask', {
      id,
      runAt: body.runAt,
    }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }));
  }
}


