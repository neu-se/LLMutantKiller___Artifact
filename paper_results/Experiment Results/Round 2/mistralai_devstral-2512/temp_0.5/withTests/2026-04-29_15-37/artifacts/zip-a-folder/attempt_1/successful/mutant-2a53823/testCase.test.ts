import * as fs from 'fs';
import * as path from 'path';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder tar with uncompressed compression', () => {
    it('should create a tar file with uncompressed compression when specified', async () => {
        const testFolder = path.resolve(__dirname, 'test-data');
        const outputTar = path.resolve(__dirname, 'test-uncompressed.tar');

        // Ensure test folder exists and has content
        if (!fs.existsSync(testFolder)) {
            fs.mkdirSync(testFolder, { recursive: true });
            fs.writeFileSync(path.join(testFolder, 'test-file.txt'), 'test content');
        }

        await ZipAFolder.tar(testFolder, outputTar, {
            compression: COMPRESSION_LEVEL.uncompressed
        });

        expect(fs.existsSync(outputTar)).toBe(true);

        // Verify the file is actually a tar file by checking magic bytes
        const fileContent = fs.readFileSync(outputTar);
        const isValidTar = fileContent.length > 262 &&
                          fileContent[257] === 0x75 &&
                          fileContent[258] === 0x73 &&
                          fileContent[259] === 0x74 &&
                          fileContent[260] === 0x61 &&
                          fileContent[261] === 0x72;
        expect(isValidTar).toBe(true);

        // Clean up
        fs.unlinkSync(outputTar);
    });
});