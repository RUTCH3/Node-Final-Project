import { Injectable } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Business, BusinessDocument } from './schemas/business.schema';
import { Model } from 'mongoose';

@Injectable()
export class BusinessService {
   constructor(
    @InjectModel(Business.name) private businessModel: Model<BusinessDocument>
  ) {}

  create(createBusinessDto: CreateBusinessDto) {
    const createdBusiness = new this.businessModel(createBusinessDto);
    return createdBusiness.save();
  }

  findAll() {
    return this.businessModel.find().exec();
  }

  findOne(id: number) {
    return this.businessModel.findById(id).exec();
  }

  update(id: number, updateBusinessDto: UpdateBusinessDto) {
    return this.businessModel.findByIdAndUpdate(id, updateBusinessDto).exec();
  }

  remove(id: number) {
    return this.businessModel.findByIdAndDelete(id).exec();
  }
}
