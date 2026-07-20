import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('Zip-A-Folder Test', function () {
    it('should create a zip file with compression level 0', async () => {
        const testZip = path.resolve(__dirname, 'test.zip');
        const testFolder = path.resolve(__dirname, '../test/data');
        if (fs.existsSync(testFolder)) {
            try {
                await zip(testFolder, testZip, { compression: 0 });
                const zipStats = fs.statSync(testZip);
                const fileSize = zipStats.size;
                const folderSize = getFolderSize(testFolder);
                expect(fileSize).toBeGreaterThan(0);
                expect(fileSize).toBeCloseTo(folderSize, -2); // Check if the zip file size is close to the folder size
            } finally {
                rimraf.sync(testZip);
            }
        }
    });
});

function getFolderSize(folderPath: string): number {
    let size = 0;
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
        const filePath = path.join(folderPath, file);
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            size += getFolderSize(filePath);
        } else {
            size += stats.size;
        }
    }
    return size;
}