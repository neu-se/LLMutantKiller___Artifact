'use strict';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZIP store option mutation test', () => {
    let tmpDir: string;
    let srcDir: string;
    let uncompressedZip: string;
    let compressedZip: string;

    beforeAll(() => {
        tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-mutation-test-'));
        srcDir = path.join(tmpDir, 'src');
        fs.mkdirSync(srcDir);
        // Write highly compressible content (repeated text)
        const compressibleContent = 'AAAAAAAAAA'.repeat(10000);
        fs.writeFileSync(path.join(srcDir, 'compressible.txt'), compressibleContent);
        uncompressedZip = path.join(tmpDir, 'uncompressed.zip');
        compressedZip = path.join(tmpDir, 'compressed.zip');
    });

    afterAll(() => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
    });

    it('uncompressed ZIP with store:true should be larger than compressed ZIP', async () => {
        await ZipAFolder.zip(srcDir, uncompressedZip, { compression: COMPRESSION_LEVEL.uncompressed });
        await ZipAFolder.zip(srcDir, compressedZip, { compression: COMPRESSION_LEVEL.high });

        const sizeUncompressed = fs.statSync(uncompressedZip).size;
        const sizeCompressed = fs.statSync(compressedZip).size;

        // With store:true (original), files are stored as-is → uncompressed ZIP is much larger
        // With store:false (mutant), compression is applied → sizes become similar
        expect(sizeUncompressed).toBeGreaterThan(sizeCompressed * 5);
    });
});