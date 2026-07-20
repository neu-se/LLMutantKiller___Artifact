import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as rimraf from 'rimraf';

describe('ZipAFolder.zip default compression level', () => {
    it('should use high compression level when no options are provided', async () => {
        const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(testDir, 'src');
        const outputFile = path.join(testDir, 'output.zip');
        const testContent = 'test content'.repeat(10000); // Large enough to see compression difference

        fs.mkdirSync(srcDir);
        fs.writeFileSync(path.join(srcDir, 'test.txt'), testContent);

        // Test default compression
        await ZipAFolder.zip(srcDir, outputFile);
        const defaultCompressedSize = fs.statSync(outputFile).size;

        // Compare with explicitly uncompressed
        const uncompressedOutput = path.join(testDir, 'uncompressed.zip');
        await ZipAFolder.zip(srcDir, uncompressedOutput, { compression: COMPRESSION_LEVEL.uncompressed });
        const uncompressedSize = fs.statSync(uncompressedOutput).size;

        // Clean up
        rimraf.sync(testDir);

        // The default should be significantly smaller than uncompressed
        // This will fail on the mutant because it won't apply compression by default
        expect(defaultCompressedSize).toBeLessThan(uncompressedSize * 0.3);
    });
});