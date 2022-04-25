import { ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import argon2 from 'argon2'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(data) {
    data.hash = await argon2.hash(data.password, { type: argon2.argon2id })
    delete data.password
    const user = await this.prisma.user.create({ data }).catch((error) => {
      throw error
    })

    const tokens = await this.getTokens(user.id)

    await this.updateRefreshTokenHash(user.id, tokens.refresh_token)

    return tokens
  }

  async signIn(data) {
    const where = { email: data.email }

    const user = await this.prisma.user.findUnique({ where })

    if (!user) throw new ForbiddenException('Access Denied')

    const passwordMatches = await argon2.verify(user.hash, data.password, {
      type: argon2.argon2id,
    })

    if (!passwordMatches) throw new ForbiddenException('Access Denied')

    const tokens = await this.getTokens(user.id)

    await this.updateRefreshTokenHash(user.id, tokens.refresh_token)

    return tokens
  }

  async logout(userId) {
    const data = { hashedRefreshToken: null }
    const user = await this.prisma.user.update({ where: { id: userId }, data })
    return 'Logged out ' + user.email
  }

  async refreshTokens(where, refreshToken: string) {
    const user = await this.prisma.user.findUnique({ where })
    if (!user || !user.hashedRefreshToken)
      throw new ForbiddenException('Access Denied')

    const refreshTokenMatches = await argon2.verify(
      user.hashedRefreshToken,
      refreshToken,
      {
        type: argon2.argon2id,
      },
    )

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied')

    const tokens = await this.getTokens(user.id)
    await this.updateRefreshTokenHash(user, tokens.refresh_token)

    return tokens
  }

  async updateRefreshTokenHash(id, refreshToken: string) {
    const data = {
      hashedRefreshToken: await argon2.hash(refreshToken, {
        type: argon2.argon2id,
      }),
    }
    await this.prisma.user.update({ where: { id }, data })
  }

  async getTokens(userId: string) {
    const jwtPayload = { userId }

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('ACCESSTOKENSECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('REFRESHTOKENSECRET'),
        expiresIn: '7d',
      }),
    ])

    return { access_token, refresh_token }
  }
}
