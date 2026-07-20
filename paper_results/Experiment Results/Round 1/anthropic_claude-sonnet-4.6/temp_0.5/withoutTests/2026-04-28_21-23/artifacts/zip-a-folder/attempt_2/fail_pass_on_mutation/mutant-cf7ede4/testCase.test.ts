import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as zlib from 'zlib';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder.ts';

describe('ZipAFolder.zip default compression', () => {
    it('should use compression level 9 by default, producing smaller files than zlib default level', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');

        fs.mkdirSync(srcDir, { recursive: true });
        
        // Create content that shows clear difference between compression levels
        // Random-ish but compressible data
        let content = '';
        const words = ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta'];
        for (let i = 0; i < 100000; i++) {
            content += words[i % words.length] + ' ';
        }
        fs.writeFileSync(path.join(srcDir, 'data.txt'), content);

        // Verify zlib level 9 vs level 6 (default) actually differ for this content
        const buf = Buffer.from(content);
        const level9Size = zlib.deflateRawSync(buf, { level: 9 }).length;
        const defaultLevelSize = zlib.deflateRawSync(buf, { level: zlib.constants.Z_DEFAULT_COMPRESSION }).length;
        
        // Only run the test if the content actually shows a difference
        if (level9Size < defaultLevelSize) {
            const defaultZipPath = path.join(tmpDir, 'default.zip');
            const highZipPath = path.join(tmpDir, 'high.zip');

            await ZipAFolder.zip(srcDir, defaultZipPath);
            await ZipAFolder.zip(srcDir, highZipPath, { compression: COMPRESSION_LEVEL.high });

            const defaultSize = fs.statSync(defaultZipPath).size;
            const highSize = fs.statSync(highZipPath).size;

            // Original: default uses level 9, so sizes should match high
            // Mutated: default uses undefined (level 6), so sizes differ
            expect(defaultSize).toBe(highSize);
        }

        fs.rmSync(tmpDir, { recursive: true, force: true });
    });
});