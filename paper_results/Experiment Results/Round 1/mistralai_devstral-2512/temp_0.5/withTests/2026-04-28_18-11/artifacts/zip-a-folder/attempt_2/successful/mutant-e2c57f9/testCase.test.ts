'use strict';
import * as fs from 'fs';
import * as path from 'path';
import { COMPRESSION_LEVEL, zip, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder uncompressed zip store behavior', () => {
    const testDir = path.resolve(__dirname, 'test-data');
    const outputPath = path.resolve(__dirname, 'test-uncompressed.zip');

    beforeAll(async () => {
        await fs.promises.mkdir(testDir, { recursive: true });
        await fs.promises.writeFile(path.join(testDir, 'file1.txt'), 'content1');
        await fs.promises.writeFile(path.join(testDir, 'file2.txt'), 'content2');
    });

    afterAll(async () => {
        await fs.promises.rm(outputPath, { force: true });
        await fs.promises.rm(testDir, { recursive: true, force: true });
    });

    it('should verify uncompressed zip uses store method', async () => {
        await zip(testDir, outputPath, { compression: COMPRESSION_LEVEL.uncompressed });

        expect(fs.existsSync(outputPath)).toBe(true);

        const stats = await fs.promises.stat(outputPath);
        const zipSize = stats.size;

        // The key difference: with store=true, the zip should be larger
        // because it's not compressed at all. With store=false, it would
        // use deflate compression even at level 0, resulting in a smaller file.
        // We verify this by checking the file contains uncompressed data
        const zipContent = await fs.promises.readFile(outputPath);
        expect(zipContent.includes(Buffer.from('content1'))).toBe(true);
        expect(zipContent.includes(Buffer.from('content2'))).toBe(true);

        // Additional verification: the size should be roughly the size of the original files
        // plus ZIP metadata overhead (typically small)
        const file1Size = (await fs.promises.stat(path.join(testDir, 'file1.txt'))).size;
        const file2Size = (await fs.promises.stat(path.join(testDir, 'file2.txt'))).size;
        const expectedMinSize = file1Size + file2Size;
        expect(zipSize).toBeGreaterThanOrEqual(expectedMinSize);
    });
});