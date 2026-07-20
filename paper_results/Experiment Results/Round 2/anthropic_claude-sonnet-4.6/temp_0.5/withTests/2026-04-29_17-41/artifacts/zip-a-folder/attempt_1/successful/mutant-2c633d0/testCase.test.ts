import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import { COMPRESSION_LEVEL, ZipAFolder as zipafolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('tar default compression level', () => {
    const testDir = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/zip-a-folder/test');
    const dataDir = path.resolve(testDir, 'data');
    const tarDefault = path.resolve(testDir, 'test_default_compression.tgz');
    const tarHigh = path.resolve(testDir, 'test_high_compression.tgz');

    it('tar without options should use high compression level (same as explicit COMPRESSION_LEVEL.high)', async () => {
        if (fs.existsSync(tarDefault)) fs.unlinkSync(tarDefault);
        if (fs.existsSync(tarHigh)) fs.unlinkSync(tarHigh);

        await zipafolder.tar(dataDir, tarDefault);
        await zipafolder.tar(dataDir, tarHigh, { compression: COMPRESSION_LEVEL.high });

        const sizeDefault = fs.statSync(tarDefault).size;
        const sizeHigh = fs.statSync(tarHigh).size;

        if (fs.existsSync(tarDefault)) fs.unlinkSync(tarDefault);
        if (fs.existsSync(tarHigh)) fs.unlinkSync(tarHigh);

        expect(sizeDefault).toBe(sizeHigh);
    });
});