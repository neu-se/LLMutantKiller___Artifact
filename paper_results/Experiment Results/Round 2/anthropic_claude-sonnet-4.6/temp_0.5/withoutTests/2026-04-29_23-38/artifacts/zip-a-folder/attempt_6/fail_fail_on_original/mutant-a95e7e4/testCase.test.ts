import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as archiverLib from 'archiver';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder.zip with COMPRESSION_LEVEL.uncompressed', () => {
    it('should call archiver with store:true when compression is uncompressed', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const outDir = path.join(tmpDir, 'out');
        fs.mkdirSync(srcDir);
        fs.mkdirSync(outDir);

        fs.writeFileSync(path.join(srcDir, 'test.txt'), 'Hello World');

        const zipFilePath = path.join(outDir, 'output.zip');

        const capturedOptions: archiverLib.ArchiverOptions[] = [];
        const originalArchiver = archiverLib as any;
        const originalDefault = originalArchiver.default || originalArchiver;

        // Spy on the archiver module
        const spy = jest.spyOn(archiverLib as any, 'default').mockImplementation((format: string, options: archiverLib.ArchiverOptions) => {
            capturedOptions.push(options);
            return originalDefault(format, options);
        });

        try {
            await ZipAFolder.zip(srcDir, zipFilePath, { compression: COMPRESSION_LEVEL.uncompressed });

            expect(capturedOptions.length).toBeGreaterThan(0);
            // Original: store: true should be in options
            // Mutated: zlib: { level: 0 } would be in options instead
            expect(capturedOptions[0]).toHaveProperty('store', true);
        } finally {
            spy.mockRestore();
            fs.rmSync(tmpDir, { recursive: true, force: true });
        }
    });
});