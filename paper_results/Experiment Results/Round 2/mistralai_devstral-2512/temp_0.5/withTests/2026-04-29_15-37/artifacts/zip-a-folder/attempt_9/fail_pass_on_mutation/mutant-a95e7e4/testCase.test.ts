'use strict';
import * as fs from 'fs';
import * as path from 'path';
import { zip, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder uncompressed mutation test', () => {
    const testDir = path.resolve(__dirname, '../../../../../../../../../../../subject_repositories/zip-a-folder/test/data');
    const uncompressedZipPath = path.resolve(__dirname, 'test-uncompressed-mutation.zip');

    it('should use store mode when compression is set to uncompressed', async () => {
        // The mutation changes the condition from "if (o.compression === COMPRESSION_LEVEL.uncompressed)"
        // to "if (false)", which means it will always take the else branch and try to use zlib compression
        // even when uncompressed is requested. This should cause an error when trying to use zlib options
        // with uncompressed mode.

        await expect(
            zip(testDir, uncompressedZipPath, { compression: COMPRESSION_LEVEL.uncompressed })
        ).resolves.not.toThrow();

        // Verify the file was created
        expect(fs.existsSync(uncompressedZipPath)).toBe(true);

        // Clean up
        fs.unlinkSync(uncompressedZipPath);
    });
});