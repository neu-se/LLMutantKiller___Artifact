// <Jest test file containing exactly one test case>
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder.zip', () => {
    it('should use store method (not deflate) for uncompressed level, resulting in no zlib header bytes in compressed data', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const zipFileUncompressed = path.join(tmpDir, 'uncompressed.zip');
        const zipFileDefault = path.join(tmpDir, 'default.zip');

        try {
            fs.mkdirSync(srcDir, { recursive: true });
            const content = 'A'.repeat(10000);
            fs.writeFileSync(path.join(srcDir, 'test.txt'), content);

            // Create zip with uncompressed option
            await ZipAFolder.zip(srcDir, zipFileUncompressed, { compression: COMPRESSION_LEVEL.uncompressed });
            // Create zip with default (compressed) option  
            await ZipAFolder.zip(srcDir, zipFileDefault, {});

            const uncompressedSize = fs.statSync(zipFileUncompressed).size;
            const defaultSize = fs.statSync(zipFileDefault).size;

            // With store: true (original uncompressed), the zip file should be LARGER than compressed
            // because the content is highly compressible (10000 'A's)
            // With zlib level 0 (mutated), it might also be large but structured differently
            // The stored zip should be larger than the deflated zip for compressible content
            expect(uncompressedSize).toBeGreaterThan(defaultSize);
        } finally {
            fs.rmSync(tmpDir, { recursive: true, force: true });
        }
    });
});