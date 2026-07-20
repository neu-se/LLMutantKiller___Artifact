import path from 'path';
import nock from 'nock';
import fs from 'fs';

const download = require('../../../../../../../../../../../subject_repositories/image-downloader/index.js');

nock('http://someurl.com')
  .get('/image-relative-test.png')
  .reply(200, Buffer.from('fake-image-data'), {
    'Content-Type': 'image/png',
  });

describe('relative path resolution', () => {
  it('should resolve a relative dest path to an absolute path', () => {
    const relativeDest = './test/fixtures';

    return download.image({ url: 'http://someurl.com/image-relative-test.png', dest: relativeDest }).then(({ filename }: { filename: string }) => {
      // The filename should be an absolute path
      expect(path.isAbsolute(filename)).toBe(true);
      // The filename should be resolved relative to the module's __dirname (project root)
      // not just the current working directory arbitrarily
      expect(filename).toEqual(path.resolve(path.join(__dirname, '../../../../../../../../../../../subject_repositories/image-downloader'), relativeDest, 'image-relative-test.png'));
    });
  });
});