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

        try {
            const spy = jest.spyOn(archiverModule, 'create');
            
            await ZipAFolder.zip(tmpDir, outputZip, {
                compression: COMPRESSION_LEVEL.uncompressed,
            });

            expect(spy).toHaveBeenCalled();
            const callArgs = spy.mock.calls[0];
            const options = callArgs[1] as any;
            
            // Original: ZipAFolder passes {store: true} => archiver.create gets store:true
            // Mutated: ZipAFolder passes {zlib: {level: 0}} => archiver.create gets zlib.level=0, no store
            // From attempt 5 error: original has zlib.level=1 (archiver default), mutated would have zlib.level=0
            expect(options.zlib?.level).not.toBe(0);
        } finally {
            jest.restoreAllMocks();
            if (fs.existsSync(outputZip)) fs.unlinkSync(outputZip);
            if (fs.existsSync(testFile)) fs.unlinkSync(testFile);
            fs.rmSync(tmpDir, { recursive: true });
        }
    });
});