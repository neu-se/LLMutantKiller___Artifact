import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('ZipAFolder', () => {
  it('should create a tar archive with the correct compression level', async () => {
    const src = 'test';
    const tarFilePath = 'test.tar';
    const options: ZipAFolder.ZipAFolderOptions = {
      compression: COMPRESSION_LEVEL.uncompressed,
    };

    await ZipAFolder.tar(src, tarFilePath, options);

    const stats = fs.statSync(tarFilePath);
    expect(stats.size).toBeLessThan(100); // uncompressed tar file should be smaller than a certain size

    rimraf.sync(tarFilePath);
  });
});