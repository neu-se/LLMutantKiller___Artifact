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

    const gzipCommand = `gzip -t ${tarFilePath}`;
    try {
      require('child_process').execSync(gzipCommand);
      throw new Error('Expected error');
    } catch (error) {
      expect(error.message).toContain('not in gzip format');
    }

    rimraf.sync(tarFilePath);
  });
});