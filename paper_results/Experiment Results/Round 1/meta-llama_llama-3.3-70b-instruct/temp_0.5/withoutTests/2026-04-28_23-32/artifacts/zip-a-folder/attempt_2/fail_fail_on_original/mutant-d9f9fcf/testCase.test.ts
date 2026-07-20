import { ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import rimraf from 'rimraf';

describe('ZipAFolder', () => {
  it('should create an uncompressed zip archive when compression level is set to uncompressed', async () => {
    const testDir = 'test-dir';
    const zipFilePath = 'uncompressed.zip';
    const src = 'src';
    await fs.promises.mkdir(testDir, { recursive: true });
    await fs.promises.mkdir(path.join(testDir, src), { recursive: true });
    await fs.promises.writeFile(path.join(testDir, src, 'file.txt'), 'Hello World!');
    await ZipAFolder.zip(path.join(testDir, src), zipFilePath, { compression: ZipAFolder.COMPRESSION_LEVEL.uncompressed });
    const stats = await fs.promises.stat(zipFilePath);
    expect(stats.size).toBeGreaterThan(0);
    await rimraf.sync(testDir);
    await fs.promises.unlink(zipFilePath);
  });
});