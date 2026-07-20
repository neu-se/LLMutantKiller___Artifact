import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import * as rimrafModule from 'rimraf';

const rimraf = promisify(rimrafModule);

describe('ZipAFolder uncompressed zip behavior', () => {
    const testDir = path.join(__dirname, 'test-dir');
    const testFile = path.join(testDir, 'test.txt');
    const outputFile = path.join(__dirname, 'output.zip');

    beforeAll(async () => {
        await fs.promises.mkdir(testDir, { recursive: true });
        await fs.promises.writeFile(testFile, 'test content');
    });

    afterAll(async () => {
        await rimraf(testDir);
        await rimraf(outputFile);
    });

    it('should create a zip file with store=true for uncompressed zip', async () => {
        await ZipAFolder.zip(testDir, outputFile, {
            compression: COMPRESSION_LEVEL.uncompressed
        });

        const stats = await fs.promises.stat(outputFile);
        expect(stats.size).toBeGreaterThan(0);

        const content = await fs.promises.readFile(outputFile);
        const zipHeader = content.subarray(0, 4).toString('hex');
        expect(zipHeader).toBe('504b0304');
    });
});