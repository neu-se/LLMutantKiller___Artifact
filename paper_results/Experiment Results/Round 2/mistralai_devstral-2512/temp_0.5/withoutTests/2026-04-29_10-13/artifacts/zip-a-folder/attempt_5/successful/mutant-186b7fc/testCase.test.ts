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

    it('should create an uncompressed tar archive when compression is set to uncompressed', async () => {
        await ZipAFolder.tar(srcDir, tarFilePath, { compression: COMPRESSION_LEVEL.uncompressed });

        const stats = fs.statSync(tarFilePath);
        expect(stats.size).toBeGreaterThan(0);

        // Verify the file is not gzipped by checking magic numbers
        const content = fs.readFileSync(tarFilePath);
        const header = content.subarray(0, 2);
        // Tar files should start with 'ustar' (0x7573746172) or similar
        // Gzipped files start with 0x1f8b
        expect(header[0]).not.toBe(0x1f);
        expect(header[1]).not.toBe(0x8b);
    });
});