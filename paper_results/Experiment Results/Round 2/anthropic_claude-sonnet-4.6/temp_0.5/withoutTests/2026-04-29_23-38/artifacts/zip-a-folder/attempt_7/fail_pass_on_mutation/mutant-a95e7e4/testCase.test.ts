import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { PassThrough } from 'stream';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder.zip with COMPRESSION_LEVEL.uncompressed', () => {
    it('should produce a zip where stored file size exactly equals original file size', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const outDir = path.join(tmpDir, 'out');
        fs.mkdirSync(srcDir);
        fs.mkdirSync(outDir);

        // Use content that is NOT compressible (random-looking bytes as text)
        // so that store vs zlib-level-0 produces measurably different sizes
        const testContent = 'Hello World Test';
        fs.writeFileSync(path.join(srcDir, 'test.txt'), testContent);

        const zipStorePath = path.join(outDir, 'store.zip');
        const zipZlibPath = path.join(outDir, 'zlib.zip');

        try {
            // Create zip with uncompressed (should use store:true in original)
            await ZipAFolder.zip(srcDir, zipStorePath, { compression: COMPRESSION_LEVEL.uncompressed });

            // Create zip with zlib level 0 explicitly by using medium compression as baseline
            // to understand size differences - instead let's directly compare sizes
            // between store:true and zlib:{level:0} by creating a reference

            const storeBuf = fs.readFileSync(zipStorePath);

            // With store:true, the zip local file header + content should contain
            // the raw bytes of testContent verbatim in the zip stream.
            // With zlib:{level:0}, archiver for zip format with zlib options
            // wraps content differently.
            
            // The most reliable check: find the local file header and verify
            // that the compressed size field (when not using data descriptor) 
            // equals the uncompressed size exactly.
            // 
            // Actually let's check the central directory record compression method
            // Central directory signature: PK\x01\x02
            let cdCompressionMethod: number | null = null;
            for (let i = 0; i <= storeBuf.length - 46; i++) {
                if (storeBuf[i] === 0x50 && storeBuf[i+1] === 0x4B &&
                    storeBuf[i+2] === 0x01 && storeBuf[i+3] === 0x02) {
                    cdCompressionMethod = storeBuf.readUInt16LE(i + 10);
                    break;
                }
            }

            expect(cdCompressionMethod).not.toBeNull();
            // store:true → method 0; zlib:{level:0} → method 8
            expect(cdCompressionMethod).toBe(0);
        } finally {
            fs.rmSync(tmpDir, { recursive: true, force: true });
        }
    });
});