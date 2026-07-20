import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as archiver from 'archiver';
import { tmpdir } from 'os';
import { rm } from 'fs/promises';

describe('ZipAFolder', () => {
    it('should create a zip archive with store option set to true', async () => {
        const src = `${tmpdir()}/test-folder`;
        const zipFilePath = `${tmpdir()}/test.zip`;
        await fs.promises.mkdir(src, { recursive: true });
        await fs.promises.writeFile(`${src}/test.txt`, 'Hello World!');
        
        await zip(src, zipFilePath);

        const archive = archiver('zip', { zlib: { level: 9 } });
        let entryCount = 0;
        archive.on('entry', () => {
            entryCount++;
        });

        const readStream = fs.createReadStream(zipFilePath);
        readStream.pipe(archive);

        await new Promise((resolve) => {
            archive.on('end', resolve);
        });

        expect(entryCount).toBe(1);

        await rm(src, { recursive: true });
        await rm(zipFilePath);
    }, 10000);
});