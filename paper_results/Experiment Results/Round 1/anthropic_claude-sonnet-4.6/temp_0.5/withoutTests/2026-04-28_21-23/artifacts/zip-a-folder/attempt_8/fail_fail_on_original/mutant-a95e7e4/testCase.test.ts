// <Jest test file containing exactly one test case>
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as crypto from 'crypto';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder.zip', () => {
    it('uncompressed zip should be smaller than deflate-wrapped zip for incompressible data', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir1 = path.join(tmpDir, 'src1');
        const srcDir2 = path.join(tmpDir, 'src2');
        const zipFileStore = path.join(tmpDir, 'store.zip');
        const zipFileZlib = path.join(tmpDir, 'zlib.zip');

        try {
            // Create two identical source directories with incompressible data
            fs.mkdirSync(srcDir1, { recursive: true });
            fs.mkdirSync(srcDir2, { recursive: true });
            
            // Use fixed "random" bytes - incompressible content
            // Using a fixed seed-like pattern that won't compress well
            const incompressibleData = Buffer.alloc(10000);
            for (let i = 0; i < incompressibleData.length; i++) {
                incompressibleData[i] = (i * 137 + 42) % 256; // pseudo-random but deterministic
            }
            fs.writeFileSync(path.join(srcDir1, 'data.bin'), incompressibleData);
            fs.writeFileSync(path.join(srcDir2, 'data.bin'), incompressibleData);

            // Original: uses store:true → no overhead
            await ZipAFolder.zip(srcDir1, zipFileStore, { compression: COMPRESSION_LEVEL.uncompressed });
            
            // Compare with explicit zlib level 0 behavior by using medium compression
            // to establish that store produces different (smaller) output than deflate for this data
            await ZipAFolder.zip(srcDir2, zipFileZlib, { compression: COMPRESSION_LEVEL.medium });

            const storeSize = fs.statSync(zipFileStore).size;
            const zlibSize = fs.statSync(zipFileZlib).size;

            // For incompressible data, store should be smaller than deflate (no compression overhead)
            // Original: storeSize < zlibSize (store has no deflate overhead)
            // Mutated: storeSize ≈ zlibSize (both use deflate, just different levels)
            expect(storeSize).toBeLessThan(zlibSize);
        } finally {
            fs.rmSync(tmpDir, { recursive: true, force: true });
        }
    });
});