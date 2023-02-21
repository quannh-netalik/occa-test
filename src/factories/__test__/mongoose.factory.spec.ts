import config from 'config';

import { mongooseFactory } from '../mongoose.factory';

jest.mock('config');

describe('mongooseFactory', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should be defined mongooseFactory', async () => {
    jest.spyOn(config, 'get').mockReturnValue('some_config');

    expect(await mongooseFactory()).toMatchObject({
      uri: 'some_config',
    });
  });
});
