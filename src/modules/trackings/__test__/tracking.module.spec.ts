import { TrackingModule } from '../tracking.module';

describe('TrackingModule', () => {
  let trackingModule: TrackingModule;

  beforeEach(async () => {
    trackingModule = await Promise.resolve(new TrackingModule());
  });

  describe('root', () => {
    it('should define TrackingModule', () => {
      expect(trackingModule).toBeDefined();
    });
  });
});
