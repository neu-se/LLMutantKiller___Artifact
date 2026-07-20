// testCase.test.ts
const fs = require('fs');
const path = require('path');
const nock = require('nock');
const download = require('../../../../../../../../../../../subject_repositories/image-downloader/index.js');

nock('http://someurl.com')
  .get('/image-success.png')
  .replyWithFile(200, path.join(__dirname, 'fixtures/android.jpg'), {
    'Content-Type': 'image/jpeg',
  });

describe('path resolution behavior', () => {
  it('should resolve relative destination paths correctly', () => {
    const relativeDest = 'test/output';
    const url = 'http://someurl.com/image-success.png';
    const expectedAbsolutePath = path.resolve(__dirname, relativeDest, 'image-success.png');

    return download.image({ url, dest: relativeDest }).then(({ filename }) => {
      expect(filename).toEqual(expectedAbsolutePath);
      expect(() => fs.accessSync(filename)).not.toThrow();
      expect(path.isAbsolute(filename)).toBe(true);
    });
  });
});