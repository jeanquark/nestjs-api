/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordHelper } from '../auth/helpers/password.helper';
import { CreateUserDto } from '../users/dto/create-user.dto'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private passwordHelper: PasswordHelper
    ) { }

    async signIn(email: string, pass: string): Promise<any> {
        const user: CreateUserDto = await this.usersService.findByEmail(email);
        // if (!user) {
        //     throw new NotFoundException();
        // }
        console.log('user: ', user);
        // if (user?.password !== password) {
        //     throw new UnauthorizedException();
        // }
        const abc = await this.passwordHelper.comparePassword(pass, user.password)
        console.log('abc: ', abc);
        if (!await this.passwordHelper.comparePassword(pass, user.password)) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.firstname, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
