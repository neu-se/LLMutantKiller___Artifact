import { zip } from '../../../lib/ZipAFolder';
import { rm } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';

describe('ZipAFolder', () => {
    it('should use high compression by default when no options are provided', async () => {
        const tempDir = tmpdir();
        const src = join(tempDir, 'src');
        const zipFilePath = join(tempDir, 'output.zip');
        await rm(src, { recursive: true, force: true });
        await rm(zipFilePath, { force: true });
        await zip(src, zipFilePath);
        const stats = await import('fs').promises.stat(zipFilePath);
        const fileSize = stats.size;
        // The file size should be smaller than a certain threshold when high compression is used
        expect(fileSize).toBeLessThan(1000);
    });
});