import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder.ts';

describe('ZipAFolder.zip default compression', () => {
    it('should use high compression level by default when no options are provided', async () => {
        // Create a temp directory with highly compressible content
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const outDir = path.join(tmpDir, 'out');
        fs.mkdirSync(srcDir);
        fs.mkdirSync(outDir);

        // Create a highly compressible file (repeated content)
        const compressibleContent = 'AAAAAAAAAA'.repeat(10000);
        fs.writeFileSync(path.join(srcDir, 'test.txt'), compressibleContent);

        // Zip with default options (no options passed)
        const defaultZipPath = path.join(outDir, 'default.zip');
        await ZipAFolder.zip(srcDir, defaultZipPath);

        // Zip with explicit high compression
        const highZipPath = path.join(outDir, 'high.zip');
        await ZipAFolder.zip(srcDir, highZipPath, { compression: COMPRESSION_LEVEL.high });

        const defaultSize = fs.statSync(defaultZipPath).size;
        const highSize = fs.statSync(highZipPath).size;

        // With original code: default should equal high compression (both level 9)
        // With mutated code: default uses undefined level, high uses level 9 - sizes may differ
        expect(defaultSize).toBe(highSize);

        // Cleanup
        fs.rmSync(tmpDir, { recursive: true, force: true });
    });
});