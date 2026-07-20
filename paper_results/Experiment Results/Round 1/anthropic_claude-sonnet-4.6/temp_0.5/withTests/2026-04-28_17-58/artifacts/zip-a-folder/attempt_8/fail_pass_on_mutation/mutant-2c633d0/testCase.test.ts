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

    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetModules();
    });

    it('tar called with no options should use COMPRESSION_LEVEL.high (9) as gzip level', async () => {
        const outFile = path.join(tmpDir, 'out.tgz');

        const capturedOptions: any[] = [];

        // Mock archiver to capture options
        jest.mock('../../../../../../../../../../../../../subject_repositories/zip-a-folder/node_modules/archiver', () => {
            const actual = jest.requireActual('../../../../../../../../../../../../../subject_repositories/zip-a-folder/node_modules/archiver');
            const mockFn = jest.fn((format: string, options: any) => {
                capturedOptions.push(options);
                return actual(format, options);
            });
            return mockFn;
        });

        const { ZipAFolder } = require('../../../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder');
        await ZipAFolder.tar(srcDir, outFile);

        expect(capturedOptions.length).toBeGreaterThan(0);
        // Original: level is 9 (COMPRESSION_LEVEL.high)
        // Mutated: level is undefined
        expect(capturedOptions[0]).toEqual(
            expect.objectContaining({
                gzip: true,
                gzipOptions: expect.objectContaining({ level: 9 })
            })
        );
    });
});