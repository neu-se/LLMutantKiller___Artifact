import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZIP uncompressed uses store option', () => {
    it('should pass store:true to archiver when compression is uncompressed', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-spy-test-'));
        const tmpZip = path.join(os.tmpdir(), 'test_spy_store.zip');

        // Intercept archiver by spying on the archiver module's exported function
        const archiverModule = require('archiver');
        const capturedOptions: any[] = [];
        const originalFn = archiverModule;
        
        // Replace the module's function temporarily
        const spy = jest.fn().mockImplementation((format: any, options: any) => {
            capturedOptions.push({ format, options });
            return originalFn(format, options);
        });
        
        // Patch the require cache
        const archiverPath = require.resolve('archiver');
        const originalExports = require.cache[archiverPath]!.exports;
        require.cache[archiverPath]!.exports = spy;

        try {
            fs.writeFileSync(path.join(tmpDir, 'test.txt'), 'hello world');

            await ZipAFolder.zip(tmpDir, tmpZip, {
                compression: COMPRESSION_LEVEL.uncompressed,
            });

            expect(capturedOptions.length).toBeGreaterThan(0);
            expect(capturedOptions[0].options).toEqual(expect.objectContaining({ store: true }));
        } finally {
            require.cache[archiverPath]!.exports = originalExports;
            fs.rmSync(tmpDir, { recursive: true, force: true });
            if (fs.existsSync(tmpZip)) fs.unlinkSync(tmpZip);
        }
    });
});