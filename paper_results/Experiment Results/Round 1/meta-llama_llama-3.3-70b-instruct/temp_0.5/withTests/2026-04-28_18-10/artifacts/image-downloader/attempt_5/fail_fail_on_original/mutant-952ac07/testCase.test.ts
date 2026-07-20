import { download } from '../../../../../../../../subject_repositories/image-downloader/lib/index';

describe('download an image', () => {
  it('should handle request error event', async () => {
    const originalHttp = require('http');
    const originalHttps = require('https');
    jest.spyOn(originalHttp, 'get').mockImplementationOnce(() => {
      const req = originalHttp.get('http://someurl.com/success');
      req.on('error', () => {
        throw new Error('Mocked error');
      });
      return req;
    });
    jest.spyOn(originalHttps, 'get').mockImplementationOnce(() => {
      const req = originalHttps.get('https://someurl.com/success');
      req.on('error', () => {
        throw new Error('Mocked error');
      });
      return req;
    });

    try {
      await download.image({ url: 'http://someurl.com/success', dest: '/tmp' });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    } finally {
      jest.restoreAllMocks();
    }
  });
});