import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import * as zlib from 'zlib';

const gunzip = promisify(zlib.gunzip);

describe('ZipAFolder uncompressed zip compression', () => {
    it('should create a zip file with uncompressed entries when store is true', async () => {
        const testDir = path.join(__dirname, 'test-dir');
        const outputFile = path.join(__dirname, 'output.zip');
        const testContent = 'This is test content for compression verification';

        // Create test directory and file
        await fs.promises.mkdir(testDir, { recursive: true });
        const testFile = path.join(testDir, 'test.txt');
        await fs.promises.writeFile(testFile, testContent);

        try {
            await ZipAFolder.zip(testDir, outputFile, { compression: COMPRESSION_LEVEL.uncompressed });

            // Read the zip file and check if it contains uncompressed data
            const zipData = await fs.promises.readFile(outputFile);

            // The original code with store:true should not compress the data
            // The mutated code with store:false would compress the data
            // We can verify this by checking if the content appears as-is in the zip
            const contentFound = zipData.includes(Buffer.from(testContent));
            expect(contentFound).toBe(true);
        } finally {
            // Cleanup
            await fs.promises.unlink(outputFile).catch(() => {});
            await fs.promises.rm(testDir, { recursive: true, force: true });
        }
    });
});