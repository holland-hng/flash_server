import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export class AccountAlreadyExistsException extends BadRequestException {
  constructor() {
    super('Account already exists');
  }
}

export class AccountDoseNotExist extends NotFoundException {
  constructor() {
    super('Account does not exist');
  }
}

export class WrongPasswordException extends UnauthorizedException {
  constructor() {
    super('Wrong password');
  }
}
