import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder zip functionality', () => {
    it('should create a valid zip file containing the source directory files', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const zipPath = path.join(tmpDir, 'output.zip');

        fs.mkdirSync(srcDir);
        fs.writeFileSync(path.join(srcDir, 'hello.txt'), 'hello world');
        fs.writeFileSync(path.join(srcDir, 'data.txt'), 'some data content here');

        await ZipAFolder.zip(srcDir, zipPath, { compression: COMPRESSION_LEVEL.high });

        expect(fs.existsSync(zipPath)).toBe(true);

        const zipBuffer = fs.readFileSync(zipPath);

        // Verify it's a valid zip (starts with PK signature)
        expect(zipBuffer[0]).toBe(0x50); // P
        expect(zipBuffer[1]).toBe(0x4b); // K

        // Verify zip contains filenames by searching for them in the central directory
        const zipStr = zipBuffer.toString('binary');
        expect(zipStr).toContain('hello.txt');
        expect(zipStr).toContain('data.txt');

        // Verify the zip ends with end of central directory record (PK\x05\x06)
        let hasEndRecord = false;
        for (let i = zipBuffer.length - 22; i >= 0; i--) {
            if (zipBuffer[i] === 0x50 && zipBuffer[i+1] === 0x4b &&
                zipBuffer[i+2] === 0x05 && zipBuffer[i+3] === 0x06) {
                hasEndRecord = true;
                break;
            }
        }
        expect(hasEndRecord).toBe(true);

        // Verify the zip size is reasonable - with store:true (original), 
        // the zip should be larger than with deflate (mutated {})
        // For 'hello world' (11 bytes) + 'some data content here' (22 bytes) = 33 bytes total
        // With store:true: stored uncompressed, zip overhead ~200 bytes, total ~233+
        // With deflate: compressed, smaller
        // Actually from previous tests we know store:true is ignored...
        // Let's just verify the file is valid and non-empty
        expect(zipBuffer.length).toBeGreaterThan(100);

        fs.rmSync(tmpDir, { recursive: true });
    });
});