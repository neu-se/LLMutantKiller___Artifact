import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder zip store option behavior', () => {
    it('should produce a valid zip file with store:true that differs from no options', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const zipPath = path.join(tmpDir, 'output.zip');

        fs.mkdirSync(srcDir);
        // Write a text file
        fs.writeFileSync(path.join(srcDir, 'test.txt'), 'hello world this is test content for zipping');

        await ZipAFolder.zip(srcDir, zipPath, { compression: COMPRESSION_LEVEL.high });

        const zipBuffer = fs.readFileSync(zipPath);

        // Find ALL local file headers PK\x03\x04
        const sig = [0x50, 0x4b, 0x03, 0x04];
        let headers: number[] = [];
        for (let i = 0; i < zipBuffer.length - 30; i++) {
            if (zipBuffer[i] === sig[0] && zipBuffer[i+1] === sig[1] &&
                zipBuffer[i+2] === sig[2] && zipBuffer[i+3] === sig[3]) {
                headers.push(i);
            }
        }

        expect(headers.length).toBeGreaterThan(0);

        // Check general purpose bit flag at offset 6 from header start
        // Bit 3 (0x0008): if set, sizes/CRC are in data descriptor after compressed data
        // store:true in archiver causes data descriptor to NOT be used (bit 3 = 0)
        // Without store:true (mutated {}), archiver uses data descriptor (bit 3 = 1)
        const firstHeaderOffset = headers[0];
        const generalPurposeBitFlag = zipBuffer.readUInt16LE(firstHeaderOffset + 6);
        const dataDescriptorBit = (generalPurposeBitFlag & 0x0008) !== 0;

        // Original (store:true): data descriptor bit should be 0 (sizes known upfront)
        // Mutated ({}): data descriptor bit should be 1 (streaming mode)
        expect(dataDescriptorBit).toBe(false);

        // Cleanup
        fs.rmSync(tmpDir, { recursive: true });
    });
});