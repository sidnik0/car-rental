import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { DiscountService } from '../service/discount.service';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { DiscountPropsDto } from './dto/discount-props.dto';
import { DiscountDto } from './dto/discount.dto';
import { Observable } from 'rxjs';
import { DiscountIdDto } from './dto/discount-id.dto';

@ApiTags('Discounts API')
@Controller('discounts')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @ApiOperation({
    summary: 'Create discount',
    description: 'Create discount',
  })
  @ApiBody({ type: DiscountPropsDto })
  @ApiCreatedResponse({ type: DiscountDto })
  @Post()
  create(@Body() discountPropsDto: DiscountPropsDto): Observable<DiscountDto> {
    return this.discountService.create(discountPropsDto);
  }

  @ApiOperation({
    summary: 'Get all discount',
    description: 'Get all discount',
  })
  @ApiOkResponse({ type: [DiscountDto] })
  @Get()
  getAll(): Observable<DiscountDto[]> {
    return this.discountService.findAll();
  }

  @ApiOperation({
    summary: 'Get discount by id',
    description: 'Get discount by id',
  })
  @ApiParam({ name: 'discountId', description: 'Discount id' })
  @ApiOkResponse({ type: DiscountDto })
  @Get(':discountId')
  getOne(@Param() discountIdDto: DiscountIdDto): Observable<DiscountDto> {
    return this.discountService.getOne(discountIdDto.discountId);
  }

  @ApiOperation({
    summary: 'Update discount by id',
    description: 'Update discount by id',
  })
  @ApiParam({ name: 'discountId', description: 'Discount id' })
  @ApiBody({ type: DiscountPropsDto })
  @ApiOkResponse({ type: DiscountDto })
  @Put(':discountId')
  update(@Param() discountIdDto: DiscountIdDto, @Body() discountPropsDto: DiscountPropsDto): Observable<DiscountDto> {
    return this.discountService.update({ ...discountPropsDto, id: discountIdDto.discountId });
  }
}
