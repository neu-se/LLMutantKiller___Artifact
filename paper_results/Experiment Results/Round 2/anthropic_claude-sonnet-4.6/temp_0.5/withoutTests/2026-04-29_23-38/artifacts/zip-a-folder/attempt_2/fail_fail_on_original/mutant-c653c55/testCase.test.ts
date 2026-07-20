import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder zip with uncompressed level', () => {
    it('should produce a larger zip file when store option is set (uncompressed storage)', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const zipPathHigh = path.join(tmpDir, 'output_high.zip');
        const zipPathStore = path.join(tmpDir, 'output_store.zip');

        fs.mkdirSync(srcDir);
        // Create a file with highly compressible content
        const compressibleContent = 'A'.repeat(50000);
        fs.writeFileSync(path.join(srcDir, 'test.txt'), compressibleContent);

        // zip with high compression (this uses archiverOptions with store:true in original)
        await ZipAFolder.zip(srcDir, zipPathHigh, { compression: COMPRESSION_LEVEL.high });

        // zip with medium compression  
        await ZipAFolder.zip(srcDir, zipPathStore, { compression: COMPRESSION_LEVEL.medium });

        const highSize = fs.statSync(zipPathHigh).size;
        const mediumSize = fs.statSync(zipPathStore).size;

        // Both should produce valid zip files
        expect(highSize).toBeGreaterThan(0);
        expect(mediumSize).toBeGreaterThan(0);

        // With store:true in archiverOptions (original), the zip stores without compression
        // making it larger than with medium compression
        // With {} (mutated), both use deflate so high compression produces smaller file
        expect(highSize).toBeGreaterThan(mediumSize);

        // Cleanup
        fs.rmSync(tmpDir, { recursive: true });
    });
});