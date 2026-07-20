import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import { tmpdir } from 'os';
import { rm } from 'fs/promises';

describe('ZipAFolder', () => {
    it('should create a zip archive with store option set to true', async () => {
        const src = `${tmpdir()}/test-folder`;
        const zipFilePath = `${tmpdir()}/test.zip`;
        await fs.promises.mkdir(src, { recursive: true });
        await fs.promises.writeFile(`${src}/test.txt`, 'Hello World!');
        
        await zip(src, zipFilePath);

        const stats = await fs.promises.stat(`${src}/test.txt`);
        const statsZip = await fs.promises.stat(zipFilePath);

        expect(stats.size).toBeCloseTo(statsZip.size, 1000);

        await rm(src, { recursive: true });
        await rm(zipFilePath);
    });
});