import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZIP uncompressed uses store option', () => {
    it('uncompressed zip of compressible data should be larger than medium compressed zip', async () => {
        // Create a temp directory with highly compressible content
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const tmpZipUncompressed = path.join(os.tmpdir(), 'test_uncompressed_store.zip');
        const tmpZipMedium = path.join(os.tmpdir(), 'test_medium_store.zip');

        try {
            // Write highly compressible content (repeated text)
            fs.writeFileSync(path.join(tmpDir, 'compressible.txt'), 'AAAAAAAAAA'.repeat(10000));

            await ZipAFolder.zip(tmpDir, tmpZipUncompressed, {
                compression: COMPRESSION_LEVEL.uncompressed,
            });
            await ZipAFolder.zip(tmpDir, tmpZipMedium, {
                compression: COMPRESSION_LEVEL.medium,
            });

            const sizeUncompressed = fs.statSync(tmpZipUncompressed).size;
            const sizeMedium = fs.statSync(tmpZipMedium).size;

            // store:true (original) produces much larger file than deflate medium for compressible data
            // zlib:{level:0} (mutated) also compresses somewhat, making it smaller
            expect(sizeUncompressed).toBeGreaterThan(sizeMedium * 2);
        } finally {
            fs.rmSync(tmpDir, { recursive: true, force: true });
            if (fs.existsSync(tmpZipUncompressed)) fs.unlinkSync(tmpZipUncompressed);
            if (fs.existsSync(tmpZipMedium)) fs.unlinkSync(tmpZipMedium);
        }
    });
});