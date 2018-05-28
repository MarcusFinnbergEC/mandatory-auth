import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';

// ...
// Example of user credentials to match against incoming credentials.
const username  = 'me@test.com';
const password  = 'password';

// list of friends to return when the route /api/friends is invoked.
const friends   = [{name: 'Kejsaren', myDesc: 'I can\'t live without him', pic: '../assets/images/Kejsare.jpg'}, {name: 'Sultan', myDesc: 'My first true bromance, love at first sight', pic: '../assets/images/Sultan.png'}, {name: 'Kejsarinnan', myDesc: 'My true master, I do as she says', pic: '../assets/images/Empress.jpg'}];

// the hardcoded JWT access token you created @ jwt.io.
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDU0MTIiLCJuYW1lIjoiTWFyY3VzIFN0b3JmdXJzdGVuIEZpbm5iZXJnIiwiaWF0IjoxfQ.plr6It0vU75MeCOdrU4HcuWTOedDtoSPqOrkA8Ky_pg';

// ...
// Use these methods in the implementation of the intercept method below to return either a success or failure response.
const makeError = (status, error) => {
    return Observable.throw(
        new HttpErrorResponse({
            status,
            error
        })
    );
};

const makeResponse = body => {
    return of(
        new HttpResponse({
            status: 200,
            body
        })
    );
};

// ...

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    const { 
        body,       // object
        headers,    // object
        method,     // string
        url,        // string
    } = req;
    console.log("interceptor");
    //console.log (body, headers, method, url);
    //console.log(body.username, username, body.password, password);

    if (url.endsWith('/login')){
      if (body.username === username && body.password === password) {
        console.log("log from if url = login !!!! :    It's true!");
        return makeResponse({
            token: token
          });
        }
        else {
        console.log('error!');
        return makeError(401, 'Failed to login');
      }
    }

    else if (url.endsWith('/friends')) {
      if (headers.has('Authorization')) {
        if (headers.get('Authorization') === `Bearer ${token}`) {
          return makeResponse(friends);
        }
        else {
          return makeError(401, {})
        }
      }
      else {
        return makeError(401, {})
      }
      //console.log('intercept friends', friends);
      //return makeResponse(friends);

    }
    else {
      makeError(500, {})
    }
    //console.log(body.friends);
    console.error('intercepted', method, url);

    // implement logic for handling API requests, as defined in the exercise instructions.
  }
}
