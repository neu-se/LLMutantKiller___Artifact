import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as archiver from 'archiver';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder zip store option', () => {
    it('should produce same output as archiver with store:true option', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const zipFromLib = path.join(tmpDir, 'lib.zip');
        const zipFromArchiver = path.join(tmpDir, 'archiver.zip');

        fs.mkdirSync(srcDir);
        fs.writeFileSync(path.join(srcDir, 'test.txt'), 'hello world test content');

        // Use ZipAFolder (original uses store:true, mutated uses {})
        await ZipAFolder.zip(srcDir, zipFromLib, { compression: COMPRESSION_LEVEL.high });

        // Manually create zip with store:true to compare with original behavior
        await new Promise<void>((resolve, reject) => {
            const output = fs.createWriteStream(zipFromArchiver);
            const archive = archiver('zip', {
                store: true,
                zlib: { level: COMPRESSION_LEVEL.high }
            } as any);
            output.on('close', resolve);
            output.on('error', reject);
            archive.pipe(output);
            archive.directory(srcDir, false);
            archive.finalize();
        });

        const libBuffer = fs.readFileSync(zipFromLib);
        const archiverBuffer = fs.readFileSync(zipFromArchiver);

        // Original code uses store:true, so output should match archiver with store:true
        // Mutated code uses {}, so output would differ
        expect(libBuffer.length).toBe(archiverBuffer.length);

        fs.rmSync(tmpDir, { recursive: true });
    });
});