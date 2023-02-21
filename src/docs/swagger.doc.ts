import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import config from 'config';

interface ISwaggerSettings {
  name: string;
  description: string;
  docsBaseUrl: string;
  apiVersion: string;
  auth: {
    name: string;
    description: string;
    scheme: string;
  };
}

export const initializeSwagger = (app: INestApplication) => {
  const { name, description, docsBaseUrl, apiVersion, auth } =
    config.get<ISwaggerSettings>('swagger');
  const options = new DocumentBuilder()
    .setTitle(`${name} API spec`)
    .setDescription(description)
    .setVersion(apiVersion)
    .addBearerAuth(
      {
        type: 'http',
        name: auth.name,
        description: auth.description,
        scheme: auth.scheme,
      },
      auth.name.toLowerCase(),
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(docsBaseUrl, app, document, {
    swaggerOptions: {
      displayOperationId: true,
    },
  });
};
