import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder.zip with COMPRESSION_LEVEL.uncompressed', () => {
    it('should pass store:true to archiver resulting in no zlib wrapper in zip entries', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const outDir = path.join(tmpDir, 'out');
        fs.mkdirSync(srcDir);
        fs.mkdirSync(outDir);

        const testContent = 'Hello World Test Content 12345';
        fs.writeFileSync(path.join(srcDir, 'test.txt'), testContent);

        const zipUncompressed = path.join(outDir, 'uncompressed.zip');
        const zipDefault = path.join(outDir, 'default.zip');

        try {
            // Create zip with uncompressed setting
            await ZipAFolder.zip(srcDir, zipUncompressed, { compression: COMPRESSION_LEVEL.uncompressed });
            // Create zip with default (no options) - goes to else branch with zlib
            await ZipAFolder.zip(srcDir, zipDefault);

            const uncompressedBuf = fs.readFileSync(zipUncompressed);
            const defaultBuf = fs.readFileSync(zipDefault);

            // With store:true (original), the raw file content should appear verbatim in the zip
            // We can verify this by searching for the exact test content bytes in the zip buffer
            const contentBytes = Buffer.from(testContent);
            
            // Check if the raw content appears in the uncompressed zip (store method)
            let foundInUncompressed = false;
            for (let i = 0; i <= uncompressedBuf.length - contentBytes.length; i++) {
                if (uncompressedBuf.slice(i, i + contentBytes.length).equals(contentBytes)) {
                    foundInUncompressed = true;
                    break;
                }
            }

            // With store:true (original), raw content MUST appear verbatim
            expect(foundInUncompressed).toBe(true);
        } finally {
            fs.rmSync(tmpDir, { recursive: true, force: true });
        }
    });
});