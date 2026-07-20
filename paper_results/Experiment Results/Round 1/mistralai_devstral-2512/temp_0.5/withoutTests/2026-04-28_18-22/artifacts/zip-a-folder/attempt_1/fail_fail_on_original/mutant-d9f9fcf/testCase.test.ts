import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';

describe('ZipAFolder.zip with uncompressed compression', () => {
    const testDir = './test-dir';
    const testFile = path.join(testDir, 'test.txt');
    const outputZip = './output.zip';

    beforeAll(() => {
        fs.mkdirSync(testDir, { recursive: true });
        fs.writeFileSync(testFile, 'test content');
    });

    afterAll(() => {
        fs.unlinkSync(outputZip);
        fs.rmdirSync(testDir);
    });

    it('should create a zip file with store compression when compression level is uncompressed', async () => {
        await ZipAFolder.zip(testDir, outputZip, { compression: COMPRESSION_LEVEL.uncompressed });

        const stats = fs.statSync(outputZip);
        expect(stats.size).toBeGreaterThan(0);

        const zipContent = fs.readFileSync(outputZip);
        expect(zipContent).toBeDefined();
    });
});