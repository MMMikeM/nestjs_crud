import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { GetCurrentUser } from 'src/common/decorators/user.decorator'
import { AccessGuard } from 'src/common/guards/access.guard'
import { RefreshGuard } from 'src/common/guards/refresh.guard'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() body) {
    return this.authService.signUp(body)
  }

  @Post('signin')
  signIn(@Body() body) {
    return this.authService.signIn(body)
  }

  @UseGuards(AccessGuard)
  @Post('test')
  test(@GetCurrentUser() user) {
    return 'Hi there, well done ' + user.email
  }

  @UseGuards(RefreshGuard)
  @Post('logout')
  logout(@GetCurrentUser() user) {
    return this.authService.logout(user.userId)
  }

  @UseGuards(RefreshGuard)
  @Post('refresh')
  refreshTokens(@GetCurrentUser() user) {
    return this.authService.refreshTokens(user.userId, user.refreshToken)
  }
}
