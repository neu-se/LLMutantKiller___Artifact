import { ZipAFolder, COMPRESSION_LEVEL } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('ZipAFolder compression behavior', () => {
    it('should create a zip file with uncompressed compression level', async () => {
        const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(testDir, 'src');
        const outputFile = path.join(testDir, 'output.zip');

        fs.mkdirSync(srcDir);
        fs.writeFileSync(path.join(srcDir, 'test.txt'), 'test content');

        try {
            await ZipAFolder.zip(srcDir, outputFile, {
                compression: COMPRESSION_LEVEL.uncompressed
            });

            const stats = fs.statSync(outputFile);
            expect(stats.size).toBeGreaterThan(0);
        } finally {
            fs.rmSync(testDir, { recursive: true, force: true });
        }
    });
});