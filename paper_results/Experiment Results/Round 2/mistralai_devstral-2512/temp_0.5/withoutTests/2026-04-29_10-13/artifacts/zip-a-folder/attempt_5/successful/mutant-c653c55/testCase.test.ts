import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';

describe('ZipAFolder.zip with uncompressed option', () => {
    it('should create a ZIP file with store compression when uncompressed option is used', async () => {
        const testDir = path.join(__dirname, 'test-dir');
        const outputFile = path.join(__dirname, 'output.zip');
        const fileContent = 'test content for compression check';
        const filePath = path.join(testDir, 'test.txt');

        // Setup test directory and file
        await fs.promises.mkdir(testDir, { recursive: true });
        await fs.promises.writeFile(filePath, fileContent);

        try {
            // Create zip with uncompressed option
            await ZipAFolder.zip(testDir, outputFile, {
                compression: COMPRESSION_LEVEL.uncompressed
            });

            // Read the created zip file
            const zipData = await fs.promises.readFile(outputFile);

            // For uncompressed (store) mode, the file content should appear literally in the zip
            // We can verify this by checking if the original content appears in the zip file
            // This won't be true for compressed files where the content is transformed
            const contentFound = zipData.includes(Buffer.from(fileContent));

            expect(contentFound).toBe(true);
        } finally {
            // Cleanup
            try {
                await fs.promises.rm(testDir, { recursive: true, force: true });
            } catch (e) {}
            try {
                await fs.promises.rm(outputFile, { force: true });
            } catch (e) {}
        }
    });
});