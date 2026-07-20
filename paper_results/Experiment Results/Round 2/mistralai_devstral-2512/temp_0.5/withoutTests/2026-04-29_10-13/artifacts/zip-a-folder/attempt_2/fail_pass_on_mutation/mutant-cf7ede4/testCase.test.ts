import { ZipAFolder } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as rimraf from 'rimraf';

describe('ZipAFolder.zip default compression behavior', () => {
    it('should apply compression when no options are provided', async () => {
        const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(testDir, 'src');
        const outputFile = path.join(testDir, 'output.zip');

        fs.mkdirSync(srcDir);
        fs.writeFileSync(path.join(srcDir, 'test.txt'), 'test content'.repeat(1000));

        await ZipAFolder.zip(srcDir, outputFile);

        const stats = fs.statSync(outputFile);
        const fileSize = stats.size;

        // Clean up
        rimraf.sync(testDir);

        // With default high compression, the file should be significantly smaller than uncompressed
        // The original would compress, the mutant would not (using default archiver behavior)
        expect(fileSize).toBeLessThan(10000);
    });
});