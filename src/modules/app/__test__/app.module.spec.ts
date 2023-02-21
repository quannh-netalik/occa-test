import { AppModule } from '../app.module';

describe('AppModule', () => {
  let appModule: AppModule;

  beforeEach(async () => {
    appModule = await Promise.resolve(new AppModule());
  });

  describe('root', () => {
    it('should define AppModule', () => {
      expect(appModule).toBeDefined();
    });
  });
});
