import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as archiver from 'archiver';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder zip with customWriteStream', () => {
    it('should match archiver output with store:true when using customWriteStream', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');

        fs.mkdirSync(srcDir);
        // Use content that shows difference between store and deflate
        fs.writeFileSync(path.join(srcDir, 'test.txt'), 'A'.repeat(10000));

        // Get output from ZipAFolder using customWriteStream
        const libZipPath = path.join(tmpDir, 'lib.zip');
        const libStream = fs.createWriteStream(libZipPath);
        await ZipAFolder.zip(srcDir, undefined, {
            compression: COMPRESSION_LEVEL.high,
            customWriteStream: libStream,
        });

        // Get output from archiver directly with store:true (original behavior)
        const storeZipPath = path.join(tmpDir, 'store.zip');
        await new Promise<void>((resolve, reject) => {
            const output = fs.createWriteStream(storeZipPath);
            const arc = archiver('zip', { store: true, zlib: { level: 9 } } as any);
            output.on('close', resolve);
            output.on('error', reject);
            arc.pipe(output);
            arc.directory(srcDir, false);
            arc.finalize();
        });

        // Get output from archiver directly with no store (mutated behavior)
        const noStoreZipPath = path.join(tmpDir, 'nostore.zip');
        await new Promise<void>((resolve, reject) => {
            const output = fs.createWriteStream(noStoreZipPath);
            const arc = archiver('zip', { zlib: { level: 9 } });
            output.on('close', resolve);
            output.on('error', reject);
            arc.pipe(output);
            arc.directory(srcDir, false);
            arc.finalize();
        });

        const libSize = fs.statSync(libZipPath).size;
        const storeSize = fs.statSync(storeZipPath).size;
        const noStoreSize = fs.statSync(noStoreZipPath).size;

        // store:true produces larger files for compressible content
        expect(storeSize).toBeGreaterThan(noStoreSize);

        // Original code uses store:true so lib output should match store size
        // Mutated code uses {} so lib output should match noStore size
        expect(libSize).toBe(storeSize);

        fs.rmSync(tmpDir, { recursive: true });
    });
});