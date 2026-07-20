import { ZipAFolder } from '../../../lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import { tempDir } from 'tmp-promise';
import { cleanup, setup } from 'tmp-promise';
import { promisify } from 'util';
import rimraf from 'rimraf';

const rm = promisify(rimraf);

describe('ZipAFolder', () => {
  it('should create an uncompressed zip archive when compression level is set to uncompressed', async () => {
    const testDir = await tempDir();
    const zipFilePath = path.join(testDir, 'uncompressed.zip');
    const src = path.join(testDir, 'src');
    await fs.promises.mkdir(src);
    await fs.promises.writeFile(path.join(src, 'file.txt'), 'Hello World!');
    await ZipAFolder.zip(src, zipFilePath, { compression: ZipAFolder.COMPRESSION_LEVEL.uncompressed });
    const stats = await fs.promises.stat(zipFilePath);
    expect(stats.size).toBeGreaterThan(0);
    await rm(testDir);
  });
});