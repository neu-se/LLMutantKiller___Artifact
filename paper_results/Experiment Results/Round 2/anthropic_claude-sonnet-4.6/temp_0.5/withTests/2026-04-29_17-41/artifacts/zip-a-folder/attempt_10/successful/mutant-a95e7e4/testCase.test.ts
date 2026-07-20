import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

// Mock archiver before importing ZipAFolder
const mockArchiver = jest.fn();
const mockInstance = {
    pipe: jest.fn(),
    glob: jest.fn(),
    directory: jest.fn(),
    finalize: jest.fn(),
    on: jest.fn(),
};

jest.mock('archiver', () => {
    const fn = jest.fn().mockImplementation(() => mockInstance);
    return fn;
});

import { COMPRESSION_LEVEL, ZipAFolder } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZIP uncompressed uses store option', () => {
    it('should call archiver with store:true when compression is uncompressed', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-mock-test-'));
        const tmpZip = path.join(os.tmpdir(), 'test_mock.zip');

        // Setup mock instance to simulate archiver behavior
        const outputListeners: Record<string, Function> = {};
        const mockOutput = {
            on: jest.fn().mockImplementation((event: string, cb: Function) => {
                outputListeners[event] = cb;
            }),
        };

        // Override fs.createWriteStream to return our mock
        const originalCreateWriteStream = fs.createWriteStream;
        (fs as any).createWriteStream = jest.fn().mockReturnValue(mockOutput);

        // Make finalize trigger the close event
        mockInstance.finalize.mockImplementation(() => {
            setTimeout(() => outputListeners['close']?.(), 0);
        });

        const archiverModule = require('archiver') as jest.Mock;
        archiverModule.mockClear();

        try {
            fs.writeFileSync(path.join(tmpDir, 'test.txt'), 'hello');

            await ZipAFolder.zip(tmpDir, tmpZip, {
                compression: COMPRESSION_LEVEL.uncompressed,
            });

            expect(archiverModule).toHaveBeenCalledWith('zip', expect.objectContaining({ store: true }));
        } finally {
            (fs as any).createWriteStream = originalCreateWriteStream;
            fs.rmSync(tmpDir, { recursive: true, force: true });
        }
    });
});