import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder zip with uncompressed level', () => {
    it('should invoke archiver with store:true (not zlib options) when COMPRESSION_LEVEL.uncompressed is specified', async () => {
        const archiverModule = require('../../../../../../../../../../../subject_repositories/zip-a-folder/node_modules/archiver');
        
        const capturedOptions: any[] = [];
        const realArchiver = archiverModule;
        
        // We need to intercept the archiver() call to see what options are passed
        const archiverDefault = archiverModule.default || archiverModule;
        
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const testFile = path.join(tmpDir, 'test.txt');
        fs.writeFileSync(testFile, 'hello world');
        const outputZip = path.join(os.tmpdir(), 'test_options_check.zip');

        try {
            // Spy on the archiver module function
            const spy = jest.spyOn(archiverModule, archiverModule.default ? 'default' : 'create');
            
            await ZipAFolder.zip(tmpDir, outputZip, {
                compression: COMPRESSION_LEVEL.uncompressed,
            });

            expect(spy).toHaveBeenCalled();
            const callArgs = spy.mock.calls[0];
            const options = callArgs[1] as any;
            
            // Original: options should have store:true
            // Mutated: options should have zlib:{level:0}
            expect(options).toHaveProperty('store', true);
            expect(options).not.toHaveProperty('zlib');
        } finally {
            jest.restoreAllMocks();
            if (fs.existsSync(outputZip)) fs.unlinkSync(outputZip);
            if (fs.existsSync(testFile)) fs.unlinkSync(testFile);
            fs.rmdirSync(tmpDir, { recursive: true });
        }
    });
});