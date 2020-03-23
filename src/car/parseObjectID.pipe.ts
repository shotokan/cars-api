/**
 * Pipe to validate a mongo Id
 */
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Validator } from 'class-validator';
import { ObjectID } from 'mongodb';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, ObjectID> {
  transform(value: any): ObjectID {
    const validator = new Validator();
    const validObjectId = !validator.isMongoId(value);

    if (validObjectId) {
      throw new BadRequestException('Invalid ObjectId');
    }

    const objectId: ObjectID = ObjectID.createFromHexString(value);
    return objectId;
  }
}
