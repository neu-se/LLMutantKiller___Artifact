import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as rimraf from 'rimraf';

describe('ZipAFolder.zip compression level verification', () => {
    it('should use high compression by default when no options are provided', async () => {
        const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(testDir, 'src');
        const outputFile = path.join(testDir, 'output.zip');
        const testContent = 'test content'.repeat(1000);

        fs.mkdirSync(srcDir);
        fs.writeFileSync(path.join(srcDir, 'test.txt'), testContent);

        await ZipAFolder.zip(srcDir, outputFile);

        const compressedStats = fs.statSync(outputFile);
        const compressedSize = compressedStats.size;

        // Now test with explicitly uncompressed to compare sizes
        const outputFileUncompressed = path.join(testDir, 'output-uncompressed.zip');
        await ZipAFolder.zip(srcDir, outputFileUncompressed, { compression: COMPRESSION_LEVEL.uncompressed });
        const uncompressedStats = fs.statSync(outputFileUncompressed);
        const uncompressedSize = uncompressedStats.size;

        // Clean up
        rimraf.sync(testDir);

        // The default compressed version should be significantly smaller than uncompressed
        // This will fail on the mutant because it won't apply compression by default
        expect(compressedSize).toBeLessThan(uncompressedSize * 0.5);
    });
});