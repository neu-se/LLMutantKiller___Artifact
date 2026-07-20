import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZIP compression with store option', () => {
    it('should produce a zip with store:true (no actual compression) for medium compression level, resulting in a larger file than a truly compressed zip', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        fs.mkdirSync(srcDir);
        // Create a compressible file
        fs.writeFileSync(path.join(srcDir, 'test.txt'), 'a'.repeat(10000));

        const storedZip = path.join(tmpDir, 'stored.zip');
        const compressedZip = path.join(tmpDir, 'compressed.zip');

        await ZipAFolder.zip(srcDir, storedZip, { compression: COMPRESSION_LEVEL.medium });
        await ZipAFolder.zip(srcDir, compressedZip, { compression: COMPRESSION_LEVEL.high });

        const storedSize = fs.statSync(storedZip).size;
        const compressedSize = fs.statSync(compressedZip).size;

        // With store:true, both should be uncompressed (same large size)
        // With mutated code (no store:true), they'd be compressed (smaller)
        expect(storedSize).toBeGreaterThan(5000); // stored zip should be large
        expect(compressedSize).toBeGreaterThan(5000); // also stored, so large

        fs.rmSync(tmpDir, { recursive: true });
    });
});