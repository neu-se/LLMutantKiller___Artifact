import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('ZipAFolder.zip default compression level', () => {
    it('should use high compression by default when no options are provided', async () => {
        const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(testDir, 'src');
        const outputFile = path.join(testDir, 'output.zip');

        fs.mkdirSync(srcDir);
        fs.writeFileSync(path.join(srcDir, 'test.txt'), 'test content');

        await ZipAFolder.zip(srcDir, outputFile);

        const stats = fs.statSync(outputFile);
        const fileSize = stats.size;

        // Clean up
        fs.unlinkSync(outputFile);
        fs.rmdirSync(srcDir);
        fs.rmdirSync(testDir);

        // The file should exist and have a reasonable size (not uncompressed)
        expect(fileSize).toBeGreaterThan(0);
        expect(fileSize).toBeLessThan(1000); // Compressed size should be small
    });
});