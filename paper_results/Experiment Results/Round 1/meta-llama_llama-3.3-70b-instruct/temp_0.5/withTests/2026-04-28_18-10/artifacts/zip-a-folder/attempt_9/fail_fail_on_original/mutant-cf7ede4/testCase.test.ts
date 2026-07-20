import * as path from 'path';
import { zip } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('Zip-A-Folder Test', function () {
    const testZIP = path.resolve(__dirname, 'test.zip');

    it('should use the default compression level when no compression level is provided', async () => {
        await expect(zip(path.resolve(__dirname, './data/'), testZIP)).resolves.not.toThrow();
        await expect(zip(path.resolve(__dirname, './data/'), testZIP, {})).resolves.not.toThrow();
    });
});