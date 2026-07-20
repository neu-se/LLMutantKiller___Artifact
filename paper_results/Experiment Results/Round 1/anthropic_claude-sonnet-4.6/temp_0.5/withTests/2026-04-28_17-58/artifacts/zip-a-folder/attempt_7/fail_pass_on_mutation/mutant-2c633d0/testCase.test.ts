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

    it('tar called with no options should pass gzipOptions.level of 9 to archiver', async () => {
        const outFile = path.join(tmpDir, 'out.tgz');

        // Spy on archiver before importing ZipAFolder so we capture the call
        const archiverModule = require('../../../../../../../../../../../../../subject_repositories/zip-a-folder/node_modules/archiver');

        const capturedOptions: any[] = [];
        const originalFn = archiverModule.default ?? archiverModule;

        // archiver exports itself as a function; we need to intercept it
        // The module exports a function directly, so we wrap it
        const archiverKey = Object.keys(archiverModule).find(k => typeof archiverModule[k] === 'function') || 'default';

        jest.mock('../../../../../../../../../../../../../subject_repositories/zip-a-folder/node_modules/archiver', () => {
            const original = jest.requireActual('../../../../../../../../../../../../../subject_repositories/zip-a-folder/node_modules/archiver');
            return jest.fn((format: string, options: any) => {
                capturedOptions.push({ format, options });
                return original(format, options);
            });
        });

        const { COMPRESSION_LEVEL, ZipAFolder } = require('../../../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder');

        await ZipAFolder.tar(srcDir, outFile);

        // Original: gzipOptions.level === 9 (COMPRESSION_LEVEL.high)
        // Mutated: gzipOptions.level === undefined
        expect(capturedOptions.length).toBeGreaterThan(0);
        expect(capturedOptions[0].options).toEqual(
            expect.objectContaining({
                gzip: true,
                gzipOptions: { level: 9 }
            })
        );

        jest.resetModules();
    });
});