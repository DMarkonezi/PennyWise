import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Globalna podesavanja

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // AppModule dalje poziva sve ostale module koji postoje
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true, // Omogucava slanje autentifikacije
  });
  
  await app.listen(process.env.PORT ?? 3000);
  console.log('Backend listening on port 3000');
}
bootstrap();
