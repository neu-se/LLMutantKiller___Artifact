import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder.ts';

describe('ZipAFolder.tar default compression', () => {
    it('should use high compression level by default when no options are provided to tar', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-a-folder-test-'));
        const srcDir = path.join(tmpDir, 'src');
        fs.mkdirSync(srcDir);
        
        // Create a compressible file
        const content = 'a'.repeat(10000);
        fs.writeFileSync(path.join(srcDir, 'test.txt'), content);
        
        const defaultTarPath = path.join(tmpDir, 'default.tar.gz');
        const highTarPath = path.join(tmpDir, 'high.tar.gz');
        const lowTarPath = path.join(tmpDir, 'low.tar.gz');
        
        // Tar with no options (should default to high compression)
        await ZipAFolder.tar(srcDir, defaultTarPath);
        
        // Tar with explicit high compression
        await ZipAFolder.tar(srcDir, highTarPath, { compression: COMPRESSION_LEVEL.high });
        
        // Tar with explicit medium compression  
        await ZipAFolder.tar(srcDir, lowTarPath, { compression: COMPRESSION_LEVEL.medium });
        
        const defaultSize = fs.statSync(defaultTarPath).size;
        const highSize = fs.statSync(highTarPath).size;
        const lowSize = fs.statSync(lowTarPath).size;
        
        // Default should match high compression (original behavior)
        // In mutated code, default compression is undefined, which differs from high (9)
        expect(defaultSize).toBe(highSize);
        
        // Cleanup
        fs.rmSync(tmpDir, { recursive: true });
    });
});