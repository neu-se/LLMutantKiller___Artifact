import path from 'path';
import nock from 'nock';
import * as download from '../../../../../../../../../../../subject_repositories/image-downloader/index.js';

describe('path resolution behavior', () => {
  it('should not modify an absolute dest path by prepending __dirname', async () => {
    nock('http://someurl.com')
      .get('/image-success.png')
      .replyWithFile(200, path.join(path.dirname(new URL(import.meta.url).pathname), '../../../../../../../../../../../subject_repositories/image-downloader/test/fixtures/android.jpg'), {
        'Content-Type': 'image/jpeg',
      });

    const absoluteDest = '/tmp/image-success.png';
    const result = await (download as any).image({
      url: 'http://someurl.com/image-success.png',
      dest: absoluteDest,
    });

    // With the original code: absolute path is left as-is, so filename === absoluteDest
    // With the mutated code: absolute path gets path.join(__dirname, absoluteDest) prepended,
    // resulting in something like /path/to/project/tmp/image-success.png
    expect(result.filename).toEqual(absoluteDest);
  });
});