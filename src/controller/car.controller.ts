import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CarService } from '../service/car.service';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CarPropsDto } from './dto/car-props.dto';
import { Observable } from 'rxjs';
import { CarDto } from './dto/car.dto';
import { CarIdDto } from './dto/car-id.dto';

@ApiTags('Cars API')
@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @ApiOperation({
    summary: 'Create car',
    description: 'Create car',
  })
  @ApiBody({ type: CarPropsDto })
  @ApiCreatedResponse({ type: CarDto })
  @Post()
  create(@Body() carPropsDto: CarPropsDto): Observable<CarDto> {
    return this.carService.create(carPropsDto);
  }

  @ApiOperation({
    summary: 'Get all cars',
    description: 'Get all cars',
  })
  @ApiOkResponse({ type: [CarDto] })
  @Get()
  getAll(): Observable<CarDto[]> {
    return this.carService.findAll();
  }

  @ApiOperation({
    summary: 'Get car by id',
    description: 'Get car by id',
  })
  @ApiParam({ name: 'carId', description: 'Car id' })
  @ApiOkResponse({ type: CarDto })
  @Get(':carId')
  getOne(@Param() carIdDto: CarIdDto): Observable<CarDto> {
    return this.carService.getOne(carIdDto.carId);
  }

  @ApiOperation({
    summary: 'Update car by id',
    description: 'Update car by id',
  })
  @ApiParam({ name: 'carId', description: 'Car id' })
  @ApiBody({ type: CarPropsDto })
  @ApiOkResponse({ type: CarDto })
  @Put(':carId')
  update(@Param() carIdDto: CarIdDto, @Body() carPropsDto: CarPropsDto): Observable<CarDto> {
    return this.carService.update({ ...carPropsDto, id: carIdDto.carId });
  }
}
