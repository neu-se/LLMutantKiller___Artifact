'use strict';
import * as path from 'path';
import * as fs from 'fs';
import * as archiver from 'archiver';
import { COMPRESSION_LEVEL, ZipAFolder as zipafolder } from '../../../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('tar default compression mutation detection', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('tar called with no options should pass gzipOptions level 9 (COMPRESSION_LEVEL.high) to archiver', async () => {
        const testDir = path.resolve(__dirname, '../../../../../../../../../../../../../subject_repositories/zip-a-folder/test/data/');
        const outFile = path.resolve(__dirname, '../../../../../../../../../../../../../subject_repositories/zip-a-folder/test/test_spy_level.tgz');

        if (fs.existsSync(outFile)) fs.unlinkSync(outFile);

        const capturedArchiverOptions: archiver.ArchiverOptions[] = [];
        const originalArchiver = archiver as any;

        // archiver is called as a function: archiver(format, options)
        // We need to spy on it as a callable
        const archiverModule = require('../../../../../../../../../../../../../subject_repositories/zip-a-folder/node_modules/archiver');
        const spy = jest.spyOn(archiverModule, 'default' in archiverModule ? 'default' : 'create');

        await zipafolder.tar(testDir, outFile);

        if (fs.existsSync(outFile)) fs.unlinkSync(outFile);

        // Original: level should be 9
        // Mutated: level should be undefined
        expect(spy).toHaveBeenCalledWith('tar', expect.objectContaining({
            gzip: true,
            gzipOptions: { level: COMPRESSION_LEVEL.high }
        }));
    });
});