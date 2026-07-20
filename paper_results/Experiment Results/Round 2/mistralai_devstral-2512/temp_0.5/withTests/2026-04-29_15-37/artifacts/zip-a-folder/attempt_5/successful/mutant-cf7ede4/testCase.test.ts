import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder default compression test', () => {
    const testDir = path.resolve(__dirname, 'test-data');
    const outputPath = path.resolve(__dirname, 'output.zip');
    const testFile = path.join(testDir, 'test.txt');

    beforeAll(async () => {
        await fs.promises.mkdir(testDir, { recursive: true });
        await fs.promises.writeFile(testFile, 'test content');
    });

    afterAll(async () => {
        await rimraf.sync(testDir);
        if (fs.existsSync(outputPath)) {
            await fs.promises.unlink(outputPath);
        }
    });

    it('should use high compression by default when no options are provided', async () => {
        // Spy on the compress method to check the options passed
        const compressSpy = jest.spyOn(ZipAFolder as any, 'compress');

        await ZipAFolder.zip(testDir, outputPath);

        // Verify that compress was called with high compression (level 9)
        expect(compressSpy).toHaveBeenCalledWith(
            expect.objectContaining({
                archiverOptions: expect.objectContaining({
                    zlib: expect.objectContaining({
                        level: 9
                    })
                })
            })
        );

        compressSpy.mockRestore();
    });
});