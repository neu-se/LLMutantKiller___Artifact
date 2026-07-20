import { download } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/index';
import { TimeoutError } from '../../../../../../../../../../../subject_repositories/image-downloader/lib/TimeoutError';

describe('download', () => {
  it('should throw a TimeoutError with a meaningful message', (done) => {
    download.image({ url: 'https://someurl.com/image-timeout.png', timeout: 2000, dest: '/tmp' })
      .then(() => done(new Error('Should throw an error')))
      .catch((err: any) => {
        expect(err).toBeInstanceOf(TimeoutError);
        expect(err.message).not.toBe('');
        done();
      });
  });
});