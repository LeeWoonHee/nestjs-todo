import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from '@prisma/client';
import { PrismaService } from 'src/prisma.client';

@Injectable()
export class TodosService {
  constructor(private prismaService: PrismaService) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todoCount = await this.prismaService.todo.count();
    const newId = todoCount + 1;
    return this.prismaService.todo.create({
      data: {
        id: newId,
        title: createTodoDto.title,
        isDone: createTodoDto.isDone,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async findAll(): Promise<Todo[]> {
    return this.prismaService.todo.findMany();
  }

  async findOne(id: number): Promise<Todo | null> {
    return this.prismaService.todo.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    return this.prismaService.todo.update({
      where: {
        id,
      },
      data: {
        title: updateTodoDto.title,
        isDone: updateTodoDto.isDone,
      },
    });
  }

  async remove(id: number): Promise<Todo> {
    return this.prismaService.todo.delete({
      where: {
        id,
      },
    });
  }
}
