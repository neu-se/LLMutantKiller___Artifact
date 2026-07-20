import { ZipAFolder, COMPRESSION_LEVEL } from '../../../lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { expect } from 'jest-extended';

describe('ZipAFolder', () => {
  it('should create a tar archive with the correct compression level', async () => {
    const src = 'test';
    const tarFilePath = 'test.tar.gz';
    const options: ZipAFolder.ZipAFolderOptions = {
      compression: COMPRESSION_LEVEL.uncompressed,
    };

    await ZipAFolder.tar(src, tarFilePath, options);

    const stats = fs.statSync(tarFilePath);
    const expectedSize = fs.statSync(src).size;
    expect(stats.size).toBeGreaterThan(expectedSize);

    rimraf.sync(tarFilePath);
  });
});