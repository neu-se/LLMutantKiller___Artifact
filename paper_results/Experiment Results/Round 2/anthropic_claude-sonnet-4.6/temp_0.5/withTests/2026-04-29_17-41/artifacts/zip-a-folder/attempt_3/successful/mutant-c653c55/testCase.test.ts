'use strict';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as rimraf from 'rimraf';
import { COMPRESSION_LEVEL, ZipAFolder as zipafolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZIP uncompressed store behavior with compressible data', () => {
    let tmpDir: string;
    let srcDir: string;
    let uncompressedZip: string;
    let compressedZip: string;

    beforeAll(async () => {
        tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        srcDir = path.join(tmpDir, 'src');
        fs.mkdirSync(srcDir);
        
        // Create a highly compressible file (repeated content compresses very well)
        const compressibleContent = 'AAAAAAAAAA'.repeat(10000); // 100KB of repeated chars
        fs.writeFileSync(path.join(srcDir, 'compressible.txt'), compressibleContent);
        
        uncompressedZip = path.join(tmpDir, 'uncompressed.zip');
        compressedZip = path.join(tmpDir, 'compressed.zip');
    });

    afterAll(() => {
        rimraf.sync(tmpDir);
    });

    it('uncompressed ZIP with store:true should be significantly larger than compressed ZIP for compressible data', async () => {
        await zipafolder.zip(srcDir, uncompressedZip, {
            compression: COMPRESSION_LEVEL.uncompressed,
        });
        await zipafolder.zip(srcDir, compressedZip, {
            compression: COMPRESSION_LEVEL.high,
        });

        const sizeUncompressed = fs.statSync(uncompressedZip).size;
        const sizeCompressed = fs.statSync(compressedZip).size;

        // With store:true, the zip should be much larger than compressed
        // The compressible data (100KB of 'A's) compresses to ~100 bytes
        // Without store:true (mutated), both would be similarly small
        // Uncompressed should be at least 10x larger than compressed
        expect(sizeUncompressed).toBeGreaterThan(sizeCompressed * 10);
    });
});