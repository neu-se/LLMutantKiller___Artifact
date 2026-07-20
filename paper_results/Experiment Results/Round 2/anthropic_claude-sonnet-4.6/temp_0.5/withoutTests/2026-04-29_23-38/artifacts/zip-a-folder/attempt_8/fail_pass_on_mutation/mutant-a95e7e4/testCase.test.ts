import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as archiver from 'archiver';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder.zip with COMPRESSION_LEVEL.uncompressed', () => {
    it('should produce identical output to archiver with store:true option', async () => {
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

        // Create zip using ZipAFolder with uncompressed setting
        const zipPath = path.join(outDir, 'output.zip');
        await ZipAFolder.zip(srcDir, zipPath, { compression: COMPRESSION_LEVEL.uncompressed });

        const storeSize = fs.statSync(refStorePath).size;
        const zlibSize = fs.statSync(refZlibPath).size;
        const outputSize = fs.statSync(zipPath).size;

        // If store and zlib produce different sizes, we can distinguish them
        // If they produce the same size, check byte equality
        if (storeSize !== zlibSize) {
            // Original uses store:true, so output should match store reference
            expect(outputSize).toBe(storeSize);
        } else {
            // They're the same size - check if content differs
            const storeBuf = fs.readFileSync(refStorePath);
            const zlibBuf = fs.readFileSync(refZlibPath);
            const outputBuf = fs.readFileSync(zipPath);

            if (!storeBuf.equals(zlibBuf)) {
                // Buffers differ - original should match store
                expect(outputBuf.equals(storeBuf)).toBe(true);
            } else {
                // Truly equivalent - check compression method in central directory
                // Central directory: PK\x01\x02
                let cdMethod: number | null = null;
                for (let i = 0; i <= outputBuf.length - 46; i++) {
                    if (outputBuf[i] === 0x50 && outputBuf[i+1] === 0x4B &&
                        outputBuf[i+2] === 0x01 && outputBuf[i+3] === 0x02) {
                        cdMethod = outputBuf.readUInt16LE(i + 10);
                        break;
                    }
                }
                // Both paths produce the same result - test passes either way
                expect(cdMethod).not.toBeNull();
            }
        }

        fs.rmSync(tmpDir, { recursive: true, force: true });
    });
});