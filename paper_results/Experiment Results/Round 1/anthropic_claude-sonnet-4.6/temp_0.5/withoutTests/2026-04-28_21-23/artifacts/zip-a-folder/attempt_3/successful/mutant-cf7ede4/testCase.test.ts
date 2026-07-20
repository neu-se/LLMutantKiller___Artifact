import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Writable } from 'stream';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder.ts';

describe('ZipAFolder.zip default compression', () => {
    it('should produce identical bytes to explicit high compression when using defaults', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        fs.mkdirSync(srcDir, { recursive: true });
        
        const content = 'Hello World '.repeat(10000);
        fs.writeFileSync(path.join(srcDir, 'test.txt'), content);

        // Use file-based approach to capture output
        const defaultZipPath = path.join(tmpDir, 'default.zip');
        const highZipPath = path.join(tmpDir, 'high.zip');
        const undefinedLevelZipPath = path.join(tmpDir, 'undefined.zip');

        await ZipAFolder.zip(srcDir, defaultZipPath);
        await ZipAFolder.zip(srcDir, highZipPath, { compression: COMPRESSION_LEVEL.high });
        // Simulate mutated behavior: pass options with compression explicitly undefined
        await ZipAFolder.zip(srcDir, undefinedLevelZipPath, {} as any);

        const defaultBytes = fs.readFileSync(defaultZipPath);
        const highBytes = fs.readFileSync(highZipPath);
        const undefinedBytes = fs.readFileSync(undefinedLevelZipPath);

        // Verify that undefined compression actually produces different bytes than high
        // (this confirms our test is meaningful)
        expect(defaultBytes).not.toEqual(undefinedBytes);
        
        // Original: default should match high
        expect(defaultBytes).toEqual(highBytes);

        fs.rmSync(tmpDir, { recursive: true, force: true });
    });
});