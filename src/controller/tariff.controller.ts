import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TariffService } from '../service/tariff.service';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TariffPropsDto } from './dto/tariff-props.dto';
import { TariffDto } from './dto/tariff.dto';
import { Observable } from 'rxjs';
import { TariffIdDto } from './dto/tariff-id.dto';

@ApiTags('Tariffs API')
@Controller('tariffs')
export class TariffController {
  constructor(private readonly tariffService: TariffService) {}

  @ApiOperation({
    summary: 'Create tariff',
    description: 'Create tariff',
  })
  @ApiBody({ type: TariffPropsDto })
  @ApiCreatedResponse({ type: TariffDto })
  @Post()
  create(@Body() tariffPropsDto: TariffPropsDto): Observable<TariffDto> {
    return this.tariffService.create(tariffPropsDto);
  }

  @ApiOperation({
    summary: 'Get all tariffs',
    description: 'Get all tariffs',
  })
  @ApiOkResponse({ type: [TariffDto] })
  @Get()
  getAll(): Observable<TariffDto[]> {
    return this.tariffService.findAll();
  }

  @ApiOperation({
    summary: 'Get tariff by id',
    description: 'Get tariff by id',
  })
  @ApiParam({ name: 'tariffId', description: 'Tariff id' })
  @ApiOkResponse({ type: TariffDto })
  @Get(':tariffId')
  getOne(@Param() tariffIdDto: TariffIdDto): Observable<TariffDto> {
    return this.tariffService.getOne(tariffIdDto.tariffId);
  }

  @ApiOperation({
    summary: 'Update tariff by id',
    description: 'Update tariff by id',
  })
  @ApiParam({ name: 'tariffId', description: 'Tariff id' })
  @ApiBody({ type: TariffPropsDto })
  @ApiOkResponse({ type: TariffDto })
  @Put(':tariffId')
  update(@Param() tariffIdDto: TariffIdDto, @Body() tariffPropsDto: TariffPropsDto): Observable<TariffDto> {
    return this.tariffService.update({ ...tariffPropsDto, id: tariffIdDto.tariffId });
  }
}
