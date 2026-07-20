import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder default compression level for zip', () => {
    it('should use high compression by default when no options are provided to zip()', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        fs.mkdirSync(srcDir);

        // Create a highly compressible file
        const compressibleContent = 'a'.repeat(100000);
        fs.writeFileSync(path.join(srcDir, 'data.txt'), compressibleContent);

        const defaultZip = path.join(tmpDir, 'default.zip');
        const uncompressedZip = path.join(tmpDir, 'uncompressed.zip');
        const highZip = path.join(tmpDir, 'high.zip');

        await ZipAFolder.zip(srcDir, defaultZip);
        await ZipAFolder.zip(srcDir, uncompressedZip, { compression: COMPRESSION_LEVEL.uncompressed });
        await ZipAFolder.zip(srcDir, highZip, { compression: COMPRESSION_LEVEL.high });

        const defaultSize = fs.statSync(defaultZip).size;
        const uncompressedSize = fs.statSync(uncompressedZip).size;
        const highSize = fs.statSync(highZip).size;

        // Clean up
        fs.rmSync(tmpDir, { recursive: true });

        // In original code: default uses COMPRESSION_LEVEL.high, so defaultSize should equal highSize
        // In mutated code: default uses undefined compression (zlib default ~level 6), so defaultSize > highSize
        expect(defaultSize).toBe(highSize);
        // Also verify that high compression is indeed smaller than uncompressed
        expect(highSize).toBeLessThan(uncompressedSize);
    });
});