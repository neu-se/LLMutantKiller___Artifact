import { download } from '../../lib/index';

describe('download an image', () => {
  it('should handle request error event', async () => {
    const req = {
      on: jest.fn(),
    };
    const http = {
      get: jest.fn(() => req),
    };
    const https = {
      get: jest.fn(() => req),
    };

    jest.spyOn(global, 'require').mockImplementation((moduleName: string) => {
      if (moduleName === 'follow-redirects') {
        return { http, https };
      }
      return require(moduleName);
    });

    await expect(download.image({ url: 'http://someurl.com/success', dest: '/tmp' })).resolves.not.toThrow();
  });
});