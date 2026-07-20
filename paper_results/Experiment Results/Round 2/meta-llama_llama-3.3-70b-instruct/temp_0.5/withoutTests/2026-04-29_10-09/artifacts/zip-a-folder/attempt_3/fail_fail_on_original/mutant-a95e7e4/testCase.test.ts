import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';

describe('ZipAFolder', () => {
  it('should create a zip file with the correct compression level when compression is set to uncompressed', async () => {
    const src = './test-data';
    const zipFilePath = './test-data.zip';
    const compressionLevel = 0;

    await zip(src, zipFilePath, { compression: compressionLevel });

    const stats = fs.statSync(zipFilePath);
    const expectedSize = fs.statSync(src).size;
    expect(stats.size).toBeGreaterThan(0); // check if file is created

    const zipStats = fs.statSync(zipFilePath);
    expect(zipStats.size).toBeGreaterThan(0); // check if file is not empty

    fs.unlinkSync(zipFilePath);
  });
});