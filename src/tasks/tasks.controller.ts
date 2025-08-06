import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { TASK_SERVICE } from 'src/config';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PatchTaskDto } from './dto/patch-task.dto';
import { catchError, firstValueFrom } from 'rxjs';
@Controller('tasks')
export class TasksController {
  constructor(
    @Inject(TASK_SERVICE) private readonly tasksClient: ClientProxy,
  ) { }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksClient.send('createTask', createTaskDto);
  }

  @Get()
  findAll(
    @Query() paginationDto: PaginationDto
  ) {
    return this.tasksClient.send('findAllTasks', paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tasksClient.send('findOneTask', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }));
  }


  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksClient.send('updateTask', { updateTaskDto, id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }));;
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() patchTaskDto: PatchTaskDto) {
    return this.tasksClient.send('patchTask', { id, patchTaskDto }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }));;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.tasksClient.send('removeTask', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }));;
  }

  @Get('status/:status')
  async findByStatus(@Param('status') status: string) {
    return this.tasksClient.send('findByStatus', status).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }));
  }

  @Post(':id/schedule')
  async schedule(
    @Param('id') id: string,
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


