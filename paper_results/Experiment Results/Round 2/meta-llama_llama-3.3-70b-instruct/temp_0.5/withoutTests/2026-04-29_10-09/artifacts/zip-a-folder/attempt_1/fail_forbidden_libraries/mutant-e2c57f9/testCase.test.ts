import { zip } from '../../../lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import { tmpdir } from 'os';
import { rm } from 'fs/promises';
import { expect } from 'jest-extended';

describe('ZipAFolder', () => {
    it('should create a zip archive with store option set to true', async () => {
        const src = `${tmpdir()}/test-folder`;
        const zipFilePath = `${tmpdir()}/test.zip`;
        await fs.promises.mkdir(src);
        await fs.promises.writeFile(`${src}/test.txt`, 'Hello World!');
        
        await zip(src, zipFilePath);

        const zipBuffer = await fs.promises.readFile(zipFilePath);
        const zipEntries = await getZipEntries(zipBuffer);

        expect(zipEntries).toContain('test.txt');

        await rm(src, { recursive: true });
        await rm(zipFilePath);
    });
});

async function getZipEntries(zipBuffer: Buffer): Promise<string[]> {
    const zipEntries: string[] = [];
    const zip = require('adm-zip');
    const zipFile = new zip(zipBuffer);
    const entries = zipFile.getEntries();

    for (const entry of entries) {
        zipEntries.push(entry.entryName);
    }

    return zipEntries;
}