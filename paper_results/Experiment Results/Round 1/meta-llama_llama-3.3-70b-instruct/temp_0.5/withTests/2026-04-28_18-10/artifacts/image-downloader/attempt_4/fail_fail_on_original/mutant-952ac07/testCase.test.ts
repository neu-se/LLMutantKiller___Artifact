import { download } from '../../../lib/index';

describe('download an image', () => {
  it('should handle request error event', async () => {
    const originalRequest = global.setTimeout;
    global.setTimeout = () => {
      throw new Error('Timeout');
    };

    try {
      await download.image({ url: 'http://someurl.com/success', dest: '/tmp' });
    } catch (error) {
      // pass
    } finally {
      global.setTimeout = originalRequest;
    }
  });
});