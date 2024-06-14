import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
  UseInterceptors,
  Delete,
  Param,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ResponseTransformInterceptor } from './interceptors/response-transform-interceptor';
import { ResponseMsg } from './decorators/response-message-decorator';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ExampleTodoDto } from './dto/example-todo.dto';
import { ResponseDto } from './dto/response.dto';

@ApiTags('todos')
@ApiExtraModels(ResponseDto)
@Controller('todos')
@UseInterceptors(ResponseTransformInterceptor)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ResponseMsg('create new todo')
  @ApiOperation({ summary: 'Generate todo' })
  @ApiResponse({ status: 200, description: 'create new todo' })
  async create(@Body() createTodoDto: CreateTodoDto) {
    await this.todosService.create(createTodoDto);

    return {
      data: createTodoDto,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ResponseMsg('find success todos')
  @ApiResponse({
    status: 200,
    description: 'find success todos',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(ExampleTodoDto) },
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: 'Get all' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async findAll() {
    const fetchedTodos = await this.todosService.findAll();

    if (fetchedTodos.length === 0) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return {
      data: fetchedTodos,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ResponseMsg('find one success')
  @ApiResponse({
    status: 200,
    description: 'find one success',
    type: ExampleTodoDto,
  })
  @ApiOperation({ summary: 'Get individual' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const findTodo = await this.todosService.findOne(id);

    if (findTodo === null) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return {
      data: findTodo,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ResponseMsg('update success')
  @ApiResponse({
    status: 200,
    description: 'update success',
    type: ExampleTodoDto,
  })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiOperation({ summary: 'Update individual' })
  @ApiBody({
    type: ExampleTodoDto,
    examples: {
      example: {
        value: {
          title: 'string',
          isDone: false,
        },
      },
    },
  })
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    const foundTodo = await this.todosService.findOne(+id);
    if (foundTodo === null) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    const updateTodo = await this.todosService.update(+id, updateTodoDto);

    return {
      data: updateTodo,
    };
  }

  @Delete(':id')
  @ResponseMsg('delete success')
  @ApiResponse({
    status: 200,
    description: 'delete success',
  })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiOperation({ summary: 'Delete individual' })
  @ApiBody({
    type: CreateTodoDto,
    examples: {
      example: {
        value: {
          title: 'string',
          isDone: false,
        },
      },
    },
  })
  async remove(@Param('id') id: string) {
    const foundTodo = await this.todosService.findOne(+id);

    if (foundTodo === null) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    await this.todosService.remove(+id);
    const fetchedTodos = await this.todosService.findAll();
    return {
      data: fetchedTodos,
    };
  }
}
