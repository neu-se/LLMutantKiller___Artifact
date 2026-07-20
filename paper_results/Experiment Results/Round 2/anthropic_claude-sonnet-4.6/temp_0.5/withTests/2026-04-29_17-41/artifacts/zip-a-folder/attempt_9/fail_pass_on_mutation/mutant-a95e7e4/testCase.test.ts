import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZIP uncompressed store behavior', () => {
    it('uncompressed zip compressed size should equal uncompressed size in central directory', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-sizes-test-'));
        const tmpZip = path.join(os.tmpdir(), 'test_sizes.zip');

        try {
            // Write content where deflate would produce different compressed vs uncompressed sizes
            const content = 'Hello World! '.repeat(5000); // ~65KB, very compressible
            fs.writeFileSync(path.join(tmpDir, 'hello.txt'), content);

            await ZipAFolder.zip(tmpDir, tmpZip, {
                compression: COMPRESSION_LEVEL.uncompressed,
            });

            const buf = fs.readFileSync(tmpZip);

            // Find central directory file header: PK\x01\x02
            const cdSig = Buffer.from([0x50, 0x4b, 0x01, 0x02]);
            let pos = 0;
            let foundEntry = false;
            while (pos < buf.length) {
                const idx = buf.indexOf(cdSig, pos);
                if (idx === -1) break;
                
                const compressionMethod = buf.readUInt16LE(idx + 10);
                const compressedSize = buf.readUInt32LE(idx + 20);
                const uncompressedSize = buf.readUInt32LE(idx + 24);
                const fileNameLength = buf.readUInt16LE(idx + 28);
                const fileName = buf.slice(idx + 46, idx + 46 + fileNameLength).toString();
                
                if (fileName.includes('hello.txt')) {
                    foundEntry = true;
                    // With store:true: compressedSize === uncompressedSize, method === 0
                    // With zlib:{level:0}: compressedSize !== uncompressedSize (deflate overhead), method === 8
                    expect(compressedSize).toBe(uncompressedSize);
                }
                pos = idx + 1;
            }
            expect(foundEntry).toBe(true);
        } finally {
            fs.rmSync(tmpDir, { recursive: true, force: true });
            if (fs.existsSync(tmpZip)) fs.unlinkSync(tmpZip);
        }
    });
});