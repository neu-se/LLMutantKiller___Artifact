import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZIP store flag detection', () => {
    it('uncompressed zip should have store compression method for all entries', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-store-test-'));
        const tmpZip = path.join(os.tmpdir(), 'test_store_flag.zip');

        try {
            // Write content that deflate level 0 would NOT compress to stored
            fs.writeFileSync(path.join(tmpDir, 'data.txt'), 'Hello World! '.repeat(1000));

            await ZipAFolder.zip(tmpDir, tmpZip, {
                compression: COMPRESSION_LEVEL.uncompressed,
            });

            const buf = fs.readFileSync(tmpZip);
            const sig = Buffer.from([0x50, 0x4b, 0x03, 0x04]);

            let found = false;
            let pos = 0;
            while (pos < buf.length - 4) {
                const idx = buf.indexOf(sig, pos);
                if (idx === -1) break;
                found = true;
                const compressionMethod = buf.readUInt16LE(idx + 8);
                // store:true => method 0; zlib:{level:0} => method 8
                expect(compressionMethod).toBe(0);
                pos = idx + 4;
            }
            expect(found).toBe(true);
        } finally {
            fs.rmSync(tmpDir, { recursive: true, force: true });
            if (fs.existsSync(tmpZip)) fs.unlinkSync(tmpZip);
        }
    });
});