import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as archiver from 'archiver';
import { COMPRESSION_LEVEL, ZipAFolder } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";

describe('ZIP store option', () => {
    it('should produce same output as archiver with zlib level 9 (not store)', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-store-'));
        const srcDir = path.join(tmpDir, 'src');
        fs.mkdirSync(srcDir);
        fs.writeFileSync(path.join(srcDir, 'data.txt'), 'hello world '.repeat(1000));

        const libZip = path.join(tmpDir, 'lib.zip');
        await ZipAFolder.zip(srcDir, libZip, { compression: COMPRESSION_LEVEL.high });

        // Direct archiver with zlib level 9 (no store:true)
        const zlibZip = path.join(tmpDir, 'zlib.zip');
        await new Promise<void>((resolve, reject) => {
            const output = fs.createWriteStream(zlibZip);
            const zip = archiver('zip', { zlib: { level: 9 } });
            output.on('close', resolve);
            output.on('error', reject);
            zip.pipe(output);
            zip.directory(srcDir, false);
            zip.finalize();
        });

        const libSize = fs.statSync(libZip).size;
        const zlibSize = fs.statSync(zlibZip).size;

        // Original (store:true + zipOptions.level=9): should NOT match zlib-only output
        // Mutated (zipOptions.level=9 only): should match zlib-only output
        expect(libSize).not.toBe(zlibSize);

        fs.rmSync(tmpDir, { recursive: true });
    });
});