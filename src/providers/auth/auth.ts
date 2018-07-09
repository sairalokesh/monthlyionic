import { Injectable } from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthProvider {

  constructor() {}

  public static authenticated() {
    return tokenNotExpired('/_ionickv/token');
  }

}
