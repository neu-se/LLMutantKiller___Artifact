'use strict';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { COMPRESSION_LEVEL, ZipAFolder as zipafolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZIP store flag in local file header', () => {
    const testDir = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/zip-a-folder/test');
    const testUNCOMPRESSEDZIP = path.resolve(testDir, 'mutant3_store_test.zip');
    const dataDir = path.resolve(testDir, 'data');

    afterAll(() => {
        rimraf.sync(testUNCOMPRESSEDZIP);
    });

    it('uncompressed ZIP should use compression method 0 (store) in ZIP local file headers', async () => {
        await zipafolder.zip(dataDir, testUNCOMPRESSEDZIP, {
            compression: COMPRESSION_LEVEL.uncompressed,
        });

        // Read the ZIP file and check the compression method in the local file header
        // ZIP local file header signature: PK\x03\x04
        // Offset 8 from signature start: compression method (2 bytes, little-endian)
        // 0 = store, 8 = deflate
        const buffer = fs.readFileSync(testUNCOMPRESSEDZIP);
        
        // Find the first local file header
        const signature = Buffer.from([0x50, 0x4b, 0x03, 0x04]);
        const sigIndex = buffer.indexOf(signature);
        
        expect(sigIndex).toBeGreaterThanOrEqual(0);
        
        // Compression method is at offset 8 from the start of the local file header
        const compressionMethod = buffer.readUInt16LE(sigIndex + 8);
        
        // With store:true, compression method should be 0 (stored/no compression)
        // With mutated code (no store:true), it defaults to 8 (deflated)
        expect(compressionMethod).toBe(0);
    });
});