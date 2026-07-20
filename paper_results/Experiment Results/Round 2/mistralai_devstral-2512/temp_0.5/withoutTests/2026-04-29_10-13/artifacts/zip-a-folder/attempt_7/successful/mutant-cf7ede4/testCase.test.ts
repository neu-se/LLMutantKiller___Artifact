import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as rimraf from 'rimraf';

describe('ZipAFolder.zip default compression verification', () => {
    it('should apply high compression by default when no options are provided', async () => {
        const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(testDir, 'src');
        const outputFile = path.join(testDir, 'output.zip');
        const testContent = 'x'.repeat(100000); // Highly compressible content

        fs.mkdirSync(srcDir);
        fs.writeFileSync(path.join(srcDir, 'compressible.txt'), testContent);

        // Test default behavior
        await ZipAFolder.zip(srcDir, outputFile);
        const defaultSize = fs.statSync(outputFile).size;

        // Test with explicitly set high compression
        const highOutput = path.join(testDir, 'high.zip');
        await ZipAFolder.zip(srcDir, highOutput, { compression: COMPRESSION_LEVEL.high });
        const highSize = fs.statSync(highOutput).size;

        // Clean up
        rimraf.sync(testDir);

        // The default should be identical to explicitly setting high compression
        // This will fail on the mutant because it won't apply high compression by default
        expect(defaultSize).toBe(highSize);
    });
});