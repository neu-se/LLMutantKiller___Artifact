import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder.ts';

describe('ZipAFolder.tar with uncompressed level', () => {
    it('should create a tar file when compression level is uncompressed', async () => {
        // Create a temporary directory with some files
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-a-folder-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const outDir = path.join(tmpDir, 'out');
        
        fs.mkdirSync(srcDir);
        fs.mkdirSync(outDir);
        
        // Create a test file in the source directory
        fs.writeFileSync(path.join(srcDir, 'test.txt'), 'Hello, World!');
        
        const tarFilePath = path.join(outDir, 'output.tar.gz');
        
        try {
            // Call tar with uncompressed level - in the original code this should
            // call compress with no archiverOptions (uncompressed path)
            // In the mutated code, the uncompressed branch body is empty, so nothing happens
            await ZipAFolder.tar(srcDir, tarFilePath, { compression: COMPRESSION_LEVEL.uncompressed });
            
            // The tar file should exist after the call
            const fileExists = fs.existsSync(tarFilePath);
            expect(fileExists).toBe(true);
            
            // The file should have some content
            const stats = fs.statSync(tarFilePath);
            expect(stats.size).toBeGreaterThan(0);
        } finally {
            // Cleanup
            fs.rmSync(tmpDir, { recursive: true, force: true });
        }
    });
});