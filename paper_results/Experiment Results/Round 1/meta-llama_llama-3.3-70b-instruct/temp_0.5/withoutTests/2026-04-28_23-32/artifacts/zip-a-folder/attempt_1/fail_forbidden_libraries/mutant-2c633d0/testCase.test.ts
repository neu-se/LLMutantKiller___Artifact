import { ZipAFolder, COMPRESSION_LEVEL } from '../../lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import { rmSync } from 'fs';
import { jest } from '@jest/globals';

describe('ZipAFolder', () => {
    it('should use the default compression level when not provided', async () => {
        const src = 'test';
        const tarFilePath = 'test.tar.gz';
        await ZipAFolder.tar(src, tarFilePath);
        const stats = fs.statSync(tarFilePath);
        expect(stats.size).toBeGreaterThan(0);
        rmSync(tarFilePath);
    });
});