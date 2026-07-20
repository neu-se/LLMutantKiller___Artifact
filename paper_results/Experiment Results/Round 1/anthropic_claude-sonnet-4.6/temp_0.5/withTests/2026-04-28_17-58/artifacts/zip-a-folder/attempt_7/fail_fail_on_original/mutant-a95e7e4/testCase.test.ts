import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder zip with uncompressed level', () => {
    it('should invoke archiver with store:true option when COMPRESSION_LEVEL.uncompressed is specified', async () => {
        const archiverModule = require('../../../../../../../../../../../subject_repositories/zip-a-folder/node_modules/archiver');
        
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const testFile = path.join(tmpDir, 'test.txt');
        fs.writeFileSync(testFile, 'hello world');
        const outputZip = path.join(os.tmpdir(), 'test_store_spy.zip');

        // Find the actual callable property on the archiver module
        const archiverKeys = Object.keys(archiverModule);
        
        try {
            // Based on earlier error, spying on archiverModule directly captured zlib:{level:1}
            // The ZipAFolder source does: const zipArchive = archiver(format, archiverOptions || {})
            // archiver is imported as `import * as archiver from 'archiver'`
            // So it calls archiver('zip', options) - this is the default export
            
            // Wrap the default export to capture calls
            const originalFn = archiverModule.default || archiverModule;
            const capturedCalls: any[] = [];
            
            const wrapFn = function(format: any, options: any) {
                capturedCalls.push({ format, options });
                return originalFn(format, options);
            };
            
            if (archiverModule.default) {
                archiverModule.default = wrapFn;
            } else {
                // archiver is called as archiver('zip', opts)
                // When imported as `import * as archiver`, the module itself is callable
                // We need to intercept at the module level
                Object.defineProperty(archiverModule, '__esModule', { value: true });
            }

            await ZipAFolder.zip(tmpDir, outputZip, {
                compression: COMPRESSION_LEVEL.uncompressed,
            });

            // Original: store:true in options => store property present
            // Mutated: zlib:{level:0} in options => no store property
            expect(capturedCalls.length).toBeGreaterThan(0);
            const options = capturedCalls[0].options;
            expect(options).toHaveProperty('store', true);
        } finally {
            if (fs.existsSync(outputZip)) fs.unlinkSync(outputZip);
            if (fs.existsSync(testFile)) fs.unlinkSync(testFile);
            fs.rmdirSync(tmpDir, { recursive: true });
        }
    });
});