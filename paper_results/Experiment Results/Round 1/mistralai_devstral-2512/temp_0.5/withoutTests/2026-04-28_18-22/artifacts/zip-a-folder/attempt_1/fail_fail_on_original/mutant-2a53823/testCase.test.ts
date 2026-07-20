import { ZipAFolder, COMPRESSION_LEVEL } from './lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('ZipAFolder.tar with uncompressed compression', () => {
    const testDir = path.join(__dirname, 'test-tar-uncompressed');
    const srcDir = path.join(testDir, 'src');
    const tarFilePath = path.join(testDir, 'output.tar');

    beforeAll(() => {
        fs.mkdirSync(testDir, { recursive: true });
        fs.mkdirSync(srcDir, { recursive: true });
        fs.writeFileSync(path.join(srcDir, 'test.txt'), 'test content');
    });

    afterAll(() => {
        rimraf.sync(testDir);
    });

    it('should create a tar file with uncompressed compression', async () => {
        await ZipAFolder.tar(srcDir, tarFilePath, {
            compression: COMPRESSION_LEVEL.uncompressed
        });

        const stats = fs.statSync(tarFilePath);
        expect(stats.size).toBeGreaterThan(0);
    });
});