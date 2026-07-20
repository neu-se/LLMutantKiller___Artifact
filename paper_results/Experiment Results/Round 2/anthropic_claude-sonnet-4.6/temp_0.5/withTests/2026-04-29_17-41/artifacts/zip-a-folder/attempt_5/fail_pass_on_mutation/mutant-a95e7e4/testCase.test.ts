import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZIP uncompressed vs default compression', () => {
    it('uncompressed zip should be larger than default compression zip for highly compressible data', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-cmp-test-'));
        const tmpZipUncompressed = path.join(os.tmpdir(), 'test_uncmp.zip');
        const tmpZipDefault = path.join(os.tmpdir(), 'test_default.zip');

        try {
            // Highly compressible: 100KB of repeated bytes
            const content = Buffer.alloc(100000, 0x41); // 100000 'A' bytes
            fs.writeFileSync(path.join(tmpDir, 'big.txt'), content);

            await ZipAFolder.zip(tmpDir, tmpZipUncompressed, {
                compression: COMPRESSION_LEVEL.uncompressed,
            });
            // Default: no compression option => zlib:{level:undefined} => default compression
            await ZipAFolder.zip(tmpDir, tmpZipDefault);

            const sizeUncompressed = fs.statSync(tmpZipUncompressed).size;
            const sizeDefault = fs.statSync(tmpZipDefault).size;

            // Original: uncompressed uses store:true => raw data => much larger than default zlib compression
            // Mutated: uncompressed uses zlib:{level:0} => similar to default zlib => sizes similar
            // The ratio should be very large for truly compressible data
            expect(sizeUncompressed).toBeGreaterThan(sizeDefault * 10);
        } finally {
            fs.rmSync(tmpDir, { recursive: true, force: true });
            if (fs.existsSync(tmpZipUncompressed)) fs.unlinkSync(tmpZipUncompressed);
            if (fs.existsSync(tmpZipDefault)) fs.unlinkSync(tmpZipDefault);
        }
    });
});