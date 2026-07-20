import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('ZipAFolder uncompressed zip behavior', () => {
    const testDir = path.join(__dirname, 'test-dir');
    const testFile = path.join(testDir, 'test.txt');
    const outputFile = path.join(__dirname, 'output.zip');

    beforeAll(async () => {
        await fs.promises.mkdir(testDir, { recursive: true });
        await fs.promises.writeFile(testFile, 'test content');
    });

    afterAll(async () => {
        await new Promise<void>((resolve, reject) => {
            rimraf(testDir, (err: any) => {
                if (err) reject(err);
                else resolve();
            });
        });
        await new Promise<void>((resolve, reject) => {
            rimraf(outputFile, (err: any) => {
                if (err) reject(err);
                else resolve();
            });
        });
    });

    it('should verify uncompressed zip uses store mode', async () => {
        await ZipAFolder.zip(testDir, outputFile, {
            compression: COMPRESSION_LEVEL.uncompressed
        });

        const stats = await fs.promises.stat(outputFile);
        expect(stats.size).toBeGreaterThan(0);

        const content = await fs.promises.readFile(outputFile);
        const zipHeader = content.subarray(0, 4).toString('hex');
        expect(zipHeader).toBe('504b0304');

        const fileSize = await fs.promises.stat(testFile);
        const zipEntryHeader = content.subarray(30, 34);
        const uncompressedSize = zipEntryHeader.readUInt32LE(0);
        expect(uncompressedSize).toBe(fileSize.size);
    });
});