import { Test, TestingModule } from '@nestjs/testing';
import { CarsService } from './car.service';
import { MongoDbServer } from '../db-handler';
import { MongooseModule } from '@nestjs/mongoose';
import { CarSchema } from './schemas/car.schema';
import { CreateCarDto } from './dto/create-car-dto';
import { CreateManufacturerDto } from './dto/manufacturer.dto';
import { CreateOwnerDto } from './dto/owner.dto';
import { manufacturerEntityToDto } from './helpers/mapper.helper';

describe('CarsService', () => {
  let service: CarsService;
  let car: CreateCarDto;

  beforeEach(async () => {
    car = new CreateCarDto();
    const manufacturer = new CreateManufacturerDto();
    const owner = new CreateOwnerDto();
    car.owners = Array<CreateOwnerDto>();

    car.firstRegistrationDate = '2018-02-04T22:44:30.652Z';
    car.price = 12000;

    manufacturer.name = 'Renault';
    manufacturer.phone = '202-555-0174';
    manufacturer.siret = 78012998703591;
    car.manufacturer = manufacturer;
    
    owner.name = 'Ivan';
    owner.purchaseDate = '2019-04-04T12:44:30.652Z';
    car.owners.push(owner);
    await new MongoDbServer().init();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:62917/ultra-io?', { useNewUrlParser: true }),
        MongooseModule.forFeature([
          { name: 'Car', schema: CarSchema },
        ]),
      ],
      providers: [CarsService],
    }).compile();

    service = module.get<CarsService>(CarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be created a new car register', async () => {
    const register = await service.create(car);
    expect(register.price).toEqual(12000);
    expect(register.id.toString()).toHaveLength(24);
    expect(register.owners).toHaveLength(1);
  });

  it('should be updated a car register', async () => {

    const register = await service.create(car);
    const owner = new CreateOwnerDto();
    owner.name = 'Ivan';
    owner.purchaseDate = '2019-04-04T12:44:30.652Z';
    car.owners.push(owner);
    // new price
    car.price = 12500;
    owner.name = 'Israel';

    const registerUpdated = await service.update(register.id, car);
    expect(registerUpdated.price).toEqual(12500);
    expect(registerUpdated.id.toString()).toHaveLength(24);
    expect(registerUpdated.id).toEqual(register.id);
    expect(registerUpdated.owners[1].name).toEqual('Israel');
  });

  it('should be deleted a car register', async () => {

    const register = await service.create(car);

    await service.delete(register.id);
    const registerDeleted = await service.getByID(register.id);
    expect(registerDeleted.id).toBeUndefined();
  });

  it('should be returned a register by its ID', async () => {

    const register = await service.create(car);
    const regirterFound = await service.getByID(register.id);
    expect(regirterFound.id).toEqual(register.id);
  });

  it('should be returned all registers', async () => {

    const registers= await service.getAll();
    expect(registers).toHaveLength(3);
  });

  it('should be remove owners and applied a discount', async () => {

    const car2 = new CreateCarDto();
    const manufacturer = new CreateManufacturerDto();
    const owner = new CreateOwnerDto();
    const owner2 = new CreateOwnerDto();
    const owner3 = new CreateOwnerDto();
    car2.owners = Array<CreateOwnerDto>();

    car2.firstRegistrationDate = '2018-02-04T22:44:30.652Z';
    car2.price = 13500;

    manufacturer.name = 'Renault';
    manufacturer.phone = '202-555-0174';
    manufacturer.siret = 78012998703591;
    car2.manufacturer = manufacturer;

    owner.name = 'Ivan';
    owner.purchaseDate = '2012-04-04T12:44:30.652Z';
    car2.owners.push(owner);
    owner2.name = 'Israel';
    owner2.purchaseDate = '2018-01-04T12:44:30.652Z';
    car2.owners.push(owner);
    owner3.name = 'Elian';
    owner3.purchaseDate = '2020-01-04T12:44:30.652Z';
    car2.owners.push(owner);

    const register = await service.create(car2);

    await service.launchProcess();

    const register2 = await service.getByID(register.id);
    expect(register2.id).toEqual(register.id);
    expect(register.price).toEqual(10800);
    expect(register.owners).toHaveLength(1);
  });

  
});
