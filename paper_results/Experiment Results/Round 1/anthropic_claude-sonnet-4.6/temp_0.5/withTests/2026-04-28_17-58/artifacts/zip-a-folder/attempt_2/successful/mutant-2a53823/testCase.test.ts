'use strict';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { COMPRESSION_LEVEL, ZipAFolder as zipafolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('Tar uncompressed mutation test', () => {
    const testUNCOMPRESSEDTAR = path.resolve(
        __dirname,
        '../../../../../../../../../../../subject_repositories/zip-a-folder/test/testMutantUNCOMPRESSED.tar'
    );

    beforeAll(() => {
        rimraf.sync(testUNCOMPRESSEDTAR);
    });

    afterAll(() => {
        rimraf.sync(testUNCOMPRESSEDTAR);
    });

    it('tar with uncompressed compression level should create a tar file', async () => {
        // In the original code, when compression === COMPRESSION_LEVEL.uncompressed,
        // it calls ZipAFolder.compress with tar format (no gzip options), creating the file.
        // In the mutated code, the if-block body is empty so nothing happens and no file is created.
        await zipafolder.tar(
            path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/zip-a-folder/test/data/'),
            testUNCOMPRESSEDTAR,
            { compression: COMPRESSION_LEVEL.uncompressed }
        );

        expect(fs.existsSync(testUNCOMPRESSEDTAR)).toBe(true);
        expect(fs.statSync(testUNCOMPRESSEDTAR).size).toBeGreaterThan(0);
    });
});