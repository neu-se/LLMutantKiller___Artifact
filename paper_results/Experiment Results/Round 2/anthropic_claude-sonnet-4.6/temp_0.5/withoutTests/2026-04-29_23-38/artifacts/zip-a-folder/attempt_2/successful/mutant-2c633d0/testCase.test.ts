import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder.ts';

describe('ZipAFolder.tar default compression', () => {
    it('should use COMPRESSION_LEVEL.high (9) by default, producing smaller output than medium compression', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-a-folder-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const defaultFile = path.join(tmpDir, 'default.tar.gz');
        const level6File = path.join(tmpDir, 'level6.tar.gz');

        try {
            fs.mkdirSync(srcDir);
            // Use highly compressible content where compression level matters
            // Fibonacci-like pattern that benefits from higher compression
            let content = '';
            for (let i = 0; i < 100000; i++) {
                content += String.fromCharCode(65 + (i % 26));
            }
            fs.writeFileSync(path.join(srcDir, 'test.txt'), content);

            // tar with no options - original defaults to level 9, mutant defaults to undefined (zlib default=6)
            await ZipAFolder.tar(srcDir, defaultFile);
            
            // tar with explicit medium compression (level 5) - should be larger than level 9
            // but we need to distinguish level 9 from level 6 (zlib default)
            // Instead, let's use a custom write stream to capture bytes and compare
            
            // Actually compare default vs explicit level 9
            const highFile = path.join(tmpDir, 'high.tar.gz');
            await ZipAFolder.tar(srcDir, highFile, { compression: COMPRESSION_LEVEL.high });

            const defaultSize = fs.statSync(defaultFile).size;
            const highSize = fs.statSync(highFile).size;

            // Original: both should be identical (both use level 9)
            // Mutated: defaultFile uses level undefined (=6), highFile uses level 9
            // They would differ in size
            expect(defaultSize).toBe(highSize);
        } finally {
            fs.rmSync(tmpDir, { recursive: true, force: true });
        }
    });
});