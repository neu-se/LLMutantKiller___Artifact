import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('ZipAFolder.tar with uncompressed compression', () => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-a-folder-test-'));
    const srcDir = path.join(testDir, 'src');
    const tarFilePath = path.join(testDir, 'output.tar');

    beforeAll(() => {
        fs.mkdirSync(srcDir);
        fs.writeFileSync(path.join(srcDir, 'test.txt'), 'test content');
    });

    afterAll(() => {
        fs.rmSync(testDir, { recursive: true, force: true });
    });

    it('should not compress when COMPRESSION_LEVEL.uncompressed is specified', async () => {
        const spy = jest.spyOn(ZipAFolder as any, 'compress');

        await ZipAFolder.tar(srcDir, tarFilePath, { compression: COMPRESSION_LEVEL.uncompressed });

        expect(spy).not.toHaveBeenCalled();
        spy.mockRestore();
    });
});