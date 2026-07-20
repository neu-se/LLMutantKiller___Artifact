'use strict';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { COMPRESSION_LEVEL, ZipAFolder as zipafolder } from '../../../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('tar default compression mutation detection', () => {
    let tmpDir: string;
    let srcDir: string;

    beforeAll(() => {
        tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        srcDir = path.join(tmpDir, 'src');
        fs.mkdirSync(srcDir);
        fs.writeFileSync(path.join(srcDir, 'test.txt'), 'hello world');
    });

    afterAll(() => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
    });

    it('tar without options should produce gzip XFL byte 0x02 indicating maximum compression (level 9)', async () => {
        const outDefault = path.join(tmpDir, 'default.tgz');
        const outHigh = path.join(tmpDir, 'high.tgz');
        const outUndefinedLevel = path.join(tmpDir, 'undefined_level.tgz');

        // tar with no options - original defaults to COMPRESSION_LEVEL.high (9)
        await zipafolder.tar(srcDir, outDefault);

        // tar with explicit high compression
        await zipafolder.tar(srcDir, outHigh, { compression: COMPRESSION_LEVEL.high });

        // Read gzip XFL byte (byte index 8) from each file
        // XFL = 0x02 means maximum compression (level 9)
        // XFL = 0x00 means default compression (undefined level)
        const readXFL = (filePath: string): number => {
            const buf = Buffer.alloc(10);
            const fd = fs.openSync(filePath, 'r');
            fs.readSync(fd, buf, 0, 10, 0);
            fs.closeSync(fd);
            // Verify gzip magic bytes
            if (buf[0] !== 0x1f || buf[1] !== 0x8b) {
                throw new Error('Not a gzip file');
            }
            return buf[8]; // XFL byte
        };

        const xflDefault = readXFL(outDefault);
        const xflHigh = readXFL(outHigh);

        // Both should have XFL = 0x02 (maximum compression) in original
        // In mutated code, default would have XFL = 0x00 (default compression)
        expect(xflDefault).toBe(xflHigh);
        expect(xflDefault).toBe(0x02); // maximum compression flag
    });
});