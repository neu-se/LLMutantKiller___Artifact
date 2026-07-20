import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as archiver from 'archiver';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder zip store option', () => {
    it('should produce same output as archiver with zlib level but without store:true', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const zipFromLib = path.join(tmpDir, 'lib.zip');
        const zipFromArchiver = path.join(tmpDir, 'archiver.zip');

        fs.mkdirSync(srcDir);
        fs.writeFileSync(path.join(srcDir, 'test.txt'), 'hello world test content');

        // Use ZipAFolder with high compression
        await ZipAFolder.zip(srcDir, zipFromLib, { compression: COMPRESSION_LEVEL.high });

        // Manually create zip with store:true to compare
        // Original passes archiverOptions: { store: true, zlib: { level: 9 } }
        // This should match original behavior
        await new Promise<void>((resolve, reject) => {
            const output = fs.createWriteStream(zipFromArchiver);
            const archive = archiver('zip', {
                store: true,
                zlib: { level: COMPRESSION_LEVEL.high }
            } as any);
            output.on('close', resolve);
            output.on('error', reject);
            archive.pipe(output);
            archive.directory(srcDir, false);
            archive.finalize();
        });

        const libSize = fs.readFileSync(zipFromLib).length;
        const archiverSize = fs.readFileSync(zipFromArchiver).length;

        // Original code: archiverOptions has store:true AND zlib.level
        // The store:true makes archiver store without compression (larger for compressible data)
        // Mutated code: archiverOptions has only zlib.level (deflate compression, smaller)
        // store:true zip should be LARGER than deflate zip for compressible content
        // So original (store:true) size >= archiver-with-store size
        // Both store:true versions should be larger than deflate versions
        
        // archiver with store:true produces 154 bytes (from previous test)
        // lib produces 156 bytes with original code
        // Let's verify lib size is >= archiver-with-store size (both uncompressed)
        expect(libSize).toBeGreaterThanOrEqual(archiverSize);

        fs.rmSync(tmpDir, { recursive: true });
    });
});