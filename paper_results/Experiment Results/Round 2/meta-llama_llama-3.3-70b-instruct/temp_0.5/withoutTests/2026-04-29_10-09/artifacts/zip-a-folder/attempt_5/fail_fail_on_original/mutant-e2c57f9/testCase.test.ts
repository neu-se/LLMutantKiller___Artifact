import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as zlib from 'zlib';
import { tmpdir } from 'os';
import { rm } from 'fs/promises';

describe('ZipAFolder', () => {
    it('should create a zip archive with store option set to true', async () => {
        const src = `${tmpdir()}/test-folder`;
        const zipFilePath = `${tmpdir()}/test.zip`;
        await fs.promises.mkdir(src, { recursive: true });
        await fs.promises.writeFile(`${src}/test.txt`, 'Hello World!');
        
        await zip(src, zipFilePath);

        const zipBuffer = await fs.promises.readFile(zipFilePath);
        const unzipBuffer = await fs.promises.readFile(`${src}/test.txt`);

        const inflatedBuffer = zlib.gunzipSync(zipBuffer);
        expect(inflatedBuffer.toString()).toContain('Hello World!');

        await rm(src, { recursive: true });
        await rm(zipFilePath);
    });
});