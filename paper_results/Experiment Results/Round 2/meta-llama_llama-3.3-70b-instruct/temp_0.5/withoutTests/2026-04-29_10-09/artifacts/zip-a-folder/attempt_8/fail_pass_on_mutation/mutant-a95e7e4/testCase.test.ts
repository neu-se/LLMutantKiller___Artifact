import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';

describe('ZipAFolder', () => {
  it('should create a zip file with the correct compression level when compression is set to uncompressed', async () => {
    const src = './test-data';
    const zipFilePath = './test-data.zip';
    const compressionLevel = 0;

    // Create a test directory
    fs.mkdirSync(src);
    fs.writeFileSync('./test-data/test.txt', 'Hello World');

    try {
      await zip(src, zipFilePath, { compression: compressionLevel });

      // Check if the zip file exists
      expect(fs.existsSync(zipFilePath)).toBe(true);

      // Check if the zip file is not empty
      const stats = fs.statSync(zipFilePath);
      expect(stats.size).toBeGreaterThan(fs.statSync('./test-data/test.txt').size); // uncompressed size should be larger

      // Remove the test directory and zip file
      fs.rmdirSync(src, { recursive: true });
      fs.unlinkSync(zipFilePath);
    } catch (error) {
      // Remove the test directory
      fs.rmdirSync(src, { recursive: true });
      throw error;
    }
  });
});