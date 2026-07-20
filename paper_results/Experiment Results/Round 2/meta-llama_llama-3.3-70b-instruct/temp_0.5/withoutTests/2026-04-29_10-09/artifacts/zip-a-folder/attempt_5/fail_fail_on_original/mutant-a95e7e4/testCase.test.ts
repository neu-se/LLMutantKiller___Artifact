import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import * as archiver from 'archiver';

describe('ZipAFolder', () => {
  it('should create a zip file with the correct compression level when compression is set to uncompressed', async () => {
    const src = './test-data';
    const zipFilePath = './test-data.zip';
    const compressionLevel = 0;

    // Create a test directory
    fs.mkdirSync(src);

    try {
      await zip(src, zipFilePath, { compression: compressionLevel });

      // Check if the zip file exists
      expect(fs.existsSync(zipFilePath)).toBe(true);

      // Check if the zip file is not empty
      const stats = fs.statSync(zipFilePath);
      expect(stats.size).toBeGreaterThan(0);

      // Check the compression level of the zip file
      const zipFileBuffer = fs.readFileSync(zipFilePath);
      const zipArchive = archiver('zip', {
        zlib: {
          level: compressionLevel,
        },
      });
      const zipEntries = await zipArchive.append(zipFileBuffer, { name: 'test-data' });
      expect(zipEntries).toHaveLength(1);

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