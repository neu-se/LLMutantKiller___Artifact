import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as rimraf from 'rimraf';
import * as archiver from 'archiver';

describe('ZipAFolder.zip default compression level', () => {
    it('should use high compression level by default when no options are provided', async () => {
        const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(testDir, 'src');
        const outputFile = path.join(testDir, 'output.zip');

        fs.mkdirSync(srcDir);
        fs.writeFileSync(path.join(srcDir, 'test.txt'), 'test content'.repeat(1000));

        // Spy on archiver to check the options passed
        const archiverSpy = jest.spyOn(archiver, 'zip');

        await ZipAFolder.zip(srcDir, outputFile);

        const archiverOptions = archiverSpy.mock.calls[0][1];
        const compressionLevel = archiverOptions?.zlib?.level;

        // Clean up
        rimraf.sync(testDir);
        archiverSpy.mockRestore();

        // The original code sets compression to COMPRESSION_LEVEL.high (9) by default
        // The mutant would have undefined compression level
        expect(compressionLevel).toBe(COMPRESSION_LEVEL.high);
    });
});