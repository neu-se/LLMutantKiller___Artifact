import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as rimraf from 'rimraf';

describe('ZipAFolder', () => {
  it('should create a tar archive with the correct compression level', async () => {
    const src = 'test';
    const tarFilePath = 'test.tar';
    const options = {
      compression: COMPRESSION_LEVEL.uncompressed,
    };

    await ZipAFolder.tar(src, tarFilePath, options);

    const stats = fs.statSync(tarFilePath);
    const gzipCommand = `gzip -t ${tarFilePath}`;
    const gzipResult = require('child_process').execSync(gzipCommand);
    expect(gzipResult.toString()).toBe(''); // gzip -t should not output anything if the file is not compressed

    rimraf.sync(tarFilePath);
  });
});