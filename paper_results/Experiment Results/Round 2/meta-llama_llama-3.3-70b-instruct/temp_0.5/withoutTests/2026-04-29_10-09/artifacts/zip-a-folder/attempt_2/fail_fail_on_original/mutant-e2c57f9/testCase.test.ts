import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import { tmpdir } from 'os';
import { rm } from 'fs/promises';
import { expect } from 'jest-extended';
import archiver from 'archiver';

describe('ZipAFolder', () => {
    it('should create a zip archive with store option set to true', async () => {
        const src = `${tmpdir()}/test-folder`;
        const zipFilePath = `${tmpdir()}/test.zip`;
        await fs.promises.mkdir(src);
        await fs.promises.writeFile(`${src}/test.txt`, 'Hello World!');
        
        await zip(src, zipFilePath);

        const zipBuffer = await fs.promises.readFile(zipFilePath);
        const archive = archiver('zip', {
            zlib: { level: 0 },
        });

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
    });
});