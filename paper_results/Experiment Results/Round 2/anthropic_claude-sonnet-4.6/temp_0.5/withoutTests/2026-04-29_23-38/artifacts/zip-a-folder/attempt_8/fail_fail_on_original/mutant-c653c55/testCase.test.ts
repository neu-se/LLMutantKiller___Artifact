import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as archiver from 'archiver';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder zip store option', () => {
    it('should produce different size output than archiver with empty options (no store:true)', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const zipFromLib = path.join(tmpDir, 'lib.zip');
        const zipNoStore = path.join(tmpDir, 'nostore.zip');
        const zipWithStore = path.join(tmpDir, 'withstore.zip');

        fs.mkdirSync(srcDir);
        // Use highly compressible content so store vs deflate makes a big difference
        fs.writeFileSync(path.join(srcDir, 'test.txt'), 'A'.repeat(10000));

        await ZipAFolder.zip(srcDir, zipFromLib, { compression: COMPRESSION_LEVEL.high });

        // Archiver with store:true (original behavior)
        await new Promise<void>((resolve, reject) => {
            const output = fs.createWriteStream(zipWithStore);
            const arc = archiver('zip', { store: true, zlib: { level: 9 } } as any);
            output.on('close', resolve);
            output.on('error', reject);
            arc.pipe(output);
            arc.directory(srcDir, false);
            arc.finalize();
        });

        // Archiver with no store (mutated behavior - just zlib level)
        await new Promise<void>((resolve, reject) => {
            const output = fs.createWriteStream(zipNoStore);
            const arc = archiver('zip', { zlib: { level: 9 } });
            output.on('close', resolve);
            output.on('error', reject);
            arc.pipe(output);
            arc.directory(srcDir, false);
            arc.finalize();
        });

        const libSize = fs.statSync(zipFromLib).size;
        const storeSize = fs.statSync(zipWithStore).size;
        const noStoreSize = fs.statSync(zipNoStore).size;

        // store:true should produce larger files for compressible content
        expect(storeSize).toBeGreaterThan(noStoreSize);

        // Original code uses store:true, so lib output should be closer to storeSize
        // Mutated code uses {}, so lib output would be closer to noStoreSize
        // The lib size should be >= noStoreSize (original uses store, mutated doesn't)
        expect(libSize).toBeGreaterThanOrEqual(noStoreSize);
        // And lib size should be closer to storeSize than noStoreSize
        const diffToStore = Math.abs(libSize - storeSize);
        const diffToNoStore = Math.abs(libSize - noStoreSize);
        expect(diffToStore).toBeLessThan(diffToNoStore);

        fs.rmSync(tmpDir, { recursive: true });
    });
});