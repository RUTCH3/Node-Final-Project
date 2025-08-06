import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) { }

    async register(dto: RegisterDto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        return this.userService.create({ ...dto, password: hashedPassword });
    }

    async login(dto: LoginDto) {
        const user = await this.userService.findByUsername(dto.username);
        if (!user || !await bcrypt.compare(dto.password, user.password)) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user._id, username: user.username };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
