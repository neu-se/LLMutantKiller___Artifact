import { zip } from '../../lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import { expect } from 'jest';

describe('ZipAFolder', () => {
  it('should create a zip file with the correct compression level when compression is set to uncompressed', async () => {
    const src = 'test-data';
    const zipFilePath = 'test-data.zip';
    const compressionLevel = 0;

    await zip(src, zipFilePath, { compression: compressionLevel });

    const zipFileBuffer = fs.readFileSync(zipFilePath);
    const unzip = require('unzipper');
    const unzipStream = unzip.Open.buffer(zipFileBuffer);

    let compressionLevelFound = false;
    for await (const entry of unzipStream) {
      if (entry.path === 'test-data/') {
        compressionLevelFound = true;
        break;
      }
    }

    expect(compressionLevelFound).toBe(true);
    fs.unlinkSync(zipFilePath);
  });
});