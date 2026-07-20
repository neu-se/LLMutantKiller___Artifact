import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as archiver from 'archiver';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder.zip with COMPRESSION_LEVEL.uncompressed', () => {
    it('should produce same output as archiver store:true, not zlib:{level:0}', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const outDir = path.join(tmpDir, 'out');
        fs.mkdirSync(srcDir);
        fs.mkdirSync(outDir);

        fs.writeFileSync(path.join(srcDir, 'test.txt'), 'A'.repeat(500));

        // Create reference zip using archiver directly with store:true
        const refStorePath = path.join(outDir, 'ref_store.zip');
        await new Promise<void>((resolve, reject) => {
            const output = fs.createWriteStream(refStorePath);
            const arc = archiver('zip', { store: true });
            output.on('close', resolve);
            output.on('error', reject);
            arc.pipe(output);
            arc.directory(srcDir, false);
            arc.finalize();
        });

        // Create reference zip using archiver directly with zlib:{level:0}
        const refZlibPath = path.join(outDir, 'ref_zlib.zip');
        await new Promise<void>((resolve, reject) => {
            const output = fs.createWriteStream(refZlibPath);
            const arc = archiver('zip', { zlib: { level: 0 } });
            output.on('close', resolve);
            output.on('error', reject);
            arc.pipe(output);
            arc.directory(srcDir, false);
            arc.finalize();
        });

        const storeBuf = fs.readFileSync(refStorePath);
        const zlibBuf = fs.readFileSync(refZlibPath);

        // Only proceed if the two reference zips actually differ
        // If they're identical, this mutation is equivalent and untestable via output
        // But if they differ, we can detect which one ZipAFolder produces
        expect(storeBuf.equals(zlibBuf)).toBe(false);

        // Now create zip using ZipAFolder with uncompressed setting
        const zipPath = path.join(outDir, 'output.zip');
        await ZipAFolder.zip(srcDir, zipPath, { compression: COMPRESSION_LEVEL.uncompressed });
        const outputBuf = fs.readFileSync(zipPath);

        // Original code uses store:true, so output should match store reference
        expect(outputBuf.equals(storeBuf)).toBe(true);

        fs.rmSync(tmpDir, { recursive: true, force: true });
    });
});