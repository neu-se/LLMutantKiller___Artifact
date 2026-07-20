import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as archiver from 'archiver';
import { COMPRESSION_LEVEL, ZipAFolder } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";

describe('ZIP store option', () => {
    it('should produce same output as archiver with store:true option', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-store-'));
        const srcDir = path.join(tmpDir, 'src');
        fs.mkdirSync(srcDir);
        fs.writeFileSync(path.join(srcDir, 'data.txt'), 'hello world '.repeat(1000));

        // Create zip using library (with store:true in original)
        const libZip = path.join(tmpDir, 'lib.zip');
        await ZipAFolder.zip(srcDir, libZip, { compression: COMPRESSION_LEVEL.high });

        // Create zip using archiver directly with store:true
        const storeZip = path.join(tmpDir, 'store.zip');
        await new Promise<void>((resolve, reject) => {
            const output = fs.createWriteStream(storeZip);
            const zip = archiver('zip', { store: true, zipOptions: { level: 9 } } as any);
            output.on('close', resolve);
            output.on('error', reject);
            zip.pipe(output);
            zip.directory(srcDir, false);
            zip.finalize();
        });

        // Create zip using archiver directly without store:true
        const noStoreZip = path.join(tmpDir, 'nostore.zip');
        await new Promise<void>((resolve, reject) => {
            const output = fs.createWriteStream(noStoreZip);
            const zip = archiver('zip', { zipOptions: { level: 9 } } as any);
            output.on('close', resolve);
            output.on('error', reject);
            zip.pipe(output);
            zip.directory(srcDir, false);
            zip.finalize();
        });

        const libSize = fs.statSync(libZip).size;
        const storeSize = fs.statSync(storeZip).size;
        const noStoreSize = fs.statSync(noStoreZip).size;

        // Library output should match store:true behavior
        // If store:true and no-store produce different sizes, library should match store:true
        if (storeSize !== noStoreSize) {
            expect(libSize).toBe(storeSize);
        } else {
            // If they're the same, the mutation is equivalent
            expect(libSize).toBe(storeSize);
        }

        fs.rmSync(tmpDir, { recursive: true });
    });
});