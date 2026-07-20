'use strict';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('tar default compression mutation detection', () => {
    let tmpDir: string;
    let srcDir: string;

    beforeAll(() => {
        tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        srcDir = path.join(tmpDir, 'src');
        fs.mkdirSync(srcDir);
        fs.writeFileSync(path.join(srcDir, 'test.txt'), 'hello world');
    });

    afterAll(() => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
    });

    it('tar called with no options should use gzip level 9 matching COMPRESSION_LEVEL.high', async () => {
        const outFile = path.join(tmpDir, 'out.tgz');

        // Require archiver and ZipAFolder fresh
        jest.resetModules();
        const archiverModule = require('../../../../../../../../../../../../../subject_repositories/zip-a-folder/node_modules/archiver');
        
        // archiver exports itself as a callable function with properties
        // We wrap the module's create method which is what archiver() calls internally
        const capturedOptions: any[] = [];
        
        // archiver's internal create function
        const originalCreate = archiverModule.create.bind(archiverModule);
        jest.spyOn(archiverModule, 'create').mockImplementation((format: string, options: any) => {
            capturedOptions.push({ format, options });
            return originalCreate(format, options);
        });

        const { ZipAFolder } = require('../../../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder');
        await ZipAFolder.tar(srcDir, outFile);

        jest.restoreAllMocks();

        expect(capturedOptions.length).toBeGreaterThan(0);
        const tarCall = capturedOptions.find((c: any) => c.format === 'tar');
        expect(tarCall).toBeDefined();
        // Original: level is 9 (COMPRESSION_LEVEL.high)
        // Mutated: level is undefined
        expect(tarCall.options).toEqual(
            expect.objectContaining({
                gzip: true,
                gzipOptions: expect.objectContaining({ level: 9 })
            })
        );
    });
});