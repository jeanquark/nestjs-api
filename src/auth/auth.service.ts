/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        console.log('user: ', user);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.firstname, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
