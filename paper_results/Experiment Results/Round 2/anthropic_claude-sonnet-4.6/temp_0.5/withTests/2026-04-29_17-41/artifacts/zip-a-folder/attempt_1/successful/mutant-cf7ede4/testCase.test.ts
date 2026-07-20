// <Jest test file containing exactly one test case>
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder default compression level for zip', () => {
    const testDir = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/zip-a-folder/test');
    const dataDir = path.resolve(testDir, 'data');
    const defaultZip = path.resolve(testDir, 'test_default_compression.zip');
    const highZip = path.resolve(testDir, 'test_high_compression.zip');

    afterAll(() => {
        if (fs.existsSync(defaultZip)) fs.unlinkSync(defaultZip);
        if (fs.existsSync(highZip)) fs.unlinkSync(highZip);
    });

    it('should use high compression by default when no options are provided', async () => {
        await ZipAFolder.zip(dataDir, defaultZip);
        await ZipAFolder.zip(dataDir, highZip, { compression: COMPRESSION_LEVEL.high });

        const defaultSize = fs.statSync(defaultZip).size;
        const highSize = fs.statSync(highZip).size;

        expect(defaultSize).toBe(highSize);
    });
});