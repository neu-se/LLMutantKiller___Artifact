import { zip } from '../../../lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';

describe('ZipAFolder', () => {
  it('should create a zip file with the correct compression level when compression is set to uncompressed', async () => {
    const src = 'test-data';
    const zipFilePath = 'test-data.zip';
    const compressionLevel = 0;

    await zip(src, zipFilePath, { compression: compressionLevel });

    const stats = fs.statSync(zipFilePath);
    const expectedSize = fs.statSync(src).size;
    expect(stats.size).toBeCloseTo(expectedSize, -1); // uncompressed size should be close to the original size

    fs.unlinkSync(zipFilePath);
  });
});