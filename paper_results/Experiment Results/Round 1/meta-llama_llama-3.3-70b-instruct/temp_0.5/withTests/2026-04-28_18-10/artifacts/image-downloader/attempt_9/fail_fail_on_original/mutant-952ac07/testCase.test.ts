import { download } from '../../../../../../../../subject_repositories/image-downloader/lib/request';

describe('download an image', () => {
  it('should handle request error event', async () => {
    const url = 'http://someurl.com/success';
    const dest = '/tmp';

    await expect(download({ url, dest })).resolves.not.toThrow();
  });
});