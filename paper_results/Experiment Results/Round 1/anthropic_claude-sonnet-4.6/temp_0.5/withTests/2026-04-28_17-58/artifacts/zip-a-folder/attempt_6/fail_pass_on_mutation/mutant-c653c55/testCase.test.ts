import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { COMPRESSION_LEVEL, ZipAFolder } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";

describe('ZIP store option', () => {
    it('should produce same size zip for medium and high compression when store:true overrides compression', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-store-'));
        const srcDir = path.join(tmpDir, 'src');
        fs.mkdirSync(srcDir);
        fs.writeFileSync(path.join(srcDir, 'data.txt'), 'hello world '.repeat(1000));

        const mediumZip = path.join(tmpDir, 'medium.zip');
        const highZip = path.join(tmpDir, 'high.zip');
        
        await ZipAFolder.zip(srcDir, mediumZip, { compression: COMPRESSION_LEVEL.medium });
        await ZipAFolder.zip(srcDir, highZip, { compression: COMPRESSION_LEVEL.high });
        
        const mediumSize = fs.statSync(mediumZip).size;
        const highSize = fs.statSync(highZip).size;
        
        expect(mediumSize).toBe(highSize);

        fs.rmSync(tmpDir, { recursive: true });
    });
});