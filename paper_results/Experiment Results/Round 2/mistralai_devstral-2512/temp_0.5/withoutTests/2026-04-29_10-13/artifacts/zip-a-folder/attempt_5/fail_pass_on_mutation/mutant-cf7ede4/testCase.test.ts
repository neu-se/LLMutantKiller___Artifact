import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as rimraf from 'rimraf';

describe('ZipAFolder.zip compression behavior', () => {
    it('should use high compression by default when no options are provided', async () => {
        const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(testDir, 'src');
        const outputFile = path.join(testDir, 'output.zip');
        const largeContent = 'a'.repeat(100000); // 100KB of data

        fs.mkdirSync(srcDir);
        fs.writeFileSync(path.join(srcDir, 'large.txt'), largeContent);

        await ZipAFolder.zip(srcDir, outputFile);

        const stats = fs.statSync(outputFile);
        const compressedSize = stats.size;

        // The original code uses high compression (level 9) by default
        // The mutant would use default archiver behavior (no compression)
        // High compression should reduce 100KB to much less than 50KB
        // Uncompressed would be close to 100KB
        expect(compressedSize).toBeLessThan(50000);

        // Clean up
        rimraf.sync(testDir);
    });
});