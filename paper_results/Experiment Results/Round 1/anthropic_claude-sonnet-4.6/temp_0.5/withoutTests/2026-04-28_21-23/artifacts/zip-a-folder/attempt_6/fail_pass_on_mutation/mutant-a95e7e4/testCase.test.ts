// <Jest test file containing exactly one test case>
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as zlib from 'zlib';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder.zip', () => {
    it('stored zip should contain raw file bytes directly in the archive', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const zipFile = path.join(tmpDir, 'output.zip');

        try {
            fs.mkdirSync(srcDir, { recursive: true });
            // Use unique recognizable content
            const content = 'HELLO_UNIQUE_MARKER_12345';
            fs.writeFileSync(path.join(srcDir, 'test.txt'), content);

            await ZipAFolder.zip(srcDir, zipFile, { compression: COMPRESSION_LEVEL.uncompressed });

            const zipBuffer = fs.readFileSync(zipFile);
            const contentBuffer = Buffer.from(content, 'utf8');

            // With store:true (original), raw file bytes appear verbatim in the zip
            // With zlib level 0 (mutated), bytes are wrapped in deflate format
            // Check if the raw content bytes appear directly in the zip buffer
            const contentStr = contentBuffer.toString('hex');
            const zipHex = zipBuffer.toString('hex');
            
            expect(zipHex).toContain(contentStr);
        } finally {
            fs.rmSync(tmpDir, { recursive: true, force: true });
        }
    });
});