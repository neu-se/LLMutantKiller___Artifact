import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder.ts';

describe('ZipAFolder uncompressed zip', () => {
    it('should store files without compression when COMPRESSION_LEVEL.uncompressed is used', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const zipPath = path.join(tmpDir, 'output.zip');

        try {
            fs.mkdirSync(srcDir);
            // Create a highly compressible file
            const content = 'A'.repeat(10000);
            fs.writeFileSync(path.join(srcDir, 'test.txt'), content);

            await ZipAFolder.zip(srcDir, zipPath, { compression: COMPRESSION_LEVEL.uncompressed });

            const zipStats = fs.statSync(zipPath);
            const zipSize = zipStats.size;

            // The raw content is 10000 bytes. With store:true (uncompressed), 
            // the zip file should be larger than the compressed version.
            // With store:true, the zip should contain the file essentially uncompressed,
            // so the zip size should be close to the original file size (10000 bytes) plus overhead.
            // With store:false (mutant), compression would make the zip much smaller.
            
            // With store:true (original), the zip size should be > 5000 bytes (uncompressed storage)
            // With store:false (mutant), the zip size should be < 1000 bytes (compressed)
            expect(zipSize).toBeGreaterThan(5000);
        } finally {
            fs.rmSync(tmpDir, { recursive: true, force: true });
        }
    });
});