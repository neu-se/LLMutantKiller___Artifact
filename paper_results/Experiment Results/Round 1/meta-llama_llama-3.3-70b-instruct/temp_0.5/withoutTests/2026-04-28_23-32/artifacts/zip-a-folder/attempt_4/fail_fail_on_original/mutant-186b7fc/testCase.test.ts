import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as rimraf from 'rimraf';

describe('ZipAFolder', () => {
  it('should create a tar archive with the correct compression level', async () => {
    const src = 'test';
    const tarFilePath = 'test.tar.gz';
    const options = {
      compression: COMPRESSION_LEVEL.uncompressed,
    };

    await ZipAFolder.tar(src, tarFilePath, options);

    const stats = fs.statSync(tarFilePath);
    const gzippedStats = fs.statSync(tarFilePath.replace('.gz', ''));

    expect(gzippedStats).toBeUndefined(); // if the compression is uncompressed, there should be no .tar file

    rimraf.sync(tarFilePath);
  });
});