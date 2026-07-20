// <Jest test file containing exactly one test case>
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder.zip', () => {
    it('stored zip should have CRC32 in local file header (not deferred to data descriptor)', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const zipFile = path.join(tmpDir, 'output.zip');

        try {
            fs.mkdirSync(srcDir, { recursive: true });
            fs.writeFileSync(path.join(srcDir, 'test.txt'), 'Hello World');

            await ZipAFolder.zip(srcDir, zipFile, { compression: COMPRESSION_LEVEL.uncompressed });

            const zipBuffer = fs.readFileSync(zipFile);

            // Find local file header signature 0x04034b50
            let offset = -1;
            for (let i = 0; i < zipBuffer.length - 4; i++) {
                if (zipBuffer.readUInt32LE(i) === 0x04034b50) {
                    offset = i;
                    break;
                }
            }
            expect(offset).toBeGreaterThanOrEqual(0);

            // General purpose bit flag is at offset + 6
            // Bit 3 (0x0008) means sizes/CRC are in data descriptor after file data
            const generalPurposeBitFlag = zipBuffer.readUInt16LE(offset + 6);
            const hasDataDescriptor = (generalPurposeBitFlag & 0x0008) !== 0;

            // With store: true (original): archiver can write CRC upfront, no data descriptor needed
            // With zlib/deflate (mutated): archiver uses streaming, sets bit 3, uses data descriptor
            expect(hasDataDescriptor).toBe(false);
        } finally {
            fs.rmSync(tmpDir, { recursive: true, force: true });
        }
    });
});