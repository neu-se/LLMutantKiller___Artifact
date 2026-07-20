import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as archiver from 'archiver';
import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZIP uncompressed uses store option', () => {
    it('should call archiver with store:true when compression is uncompressed', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-spy-test-'));
        const tmpZip = path.join(os.tmpdir(), 'test_spy.zip');

        const originalArchiver = archiver as any;
        const calls: any[] = [];
        const archiverSpy = jest.spyOn(originalArchiver, 'default').mockImplementation((format: any, options: any) => {
            calls.push({ format, options });
            return originalArchiver.default.wrappedMethod
                ? originalArchiver.default.wrappedMethod(format, options)
                : (archiver as any)(format, options);
        });

        try {
            fs.writeFileSync(path.join(tmpDir, 'test.txt'), 'hello');

            await ZipAFolder.zip(tmpDir, tmpZip, {
                compression: COMPRESSION_LEVEL.uncompressed,
            });

            expect(calls.length).toBeGreaterThan(0);
            expect(calls[0].options).toHaveProperty('store', true);
        } finally {
            archiverSpy.mockRestore();
            fs.rmSync(tmpDir, { recursive: true, force: true });
            if (fs.existsSync(tmpZip)) fs.unlinkSync(tmpZip);
        }
    });
});