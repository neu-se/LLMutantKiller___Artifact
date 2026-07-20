import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { COMPRESSION_LEVEL, ZipAFolder } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";

describe('ZIP store option', () => {
    it('should produce same size zip for medium and high compression when store:true overrides compression level', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-store-'));
        const srcDir = path.join(tmpDir, 'src');
        fs.mkdirSync(srcDir);
        
        // Use moderately compressible data where level 5 vs level 9 produces different sizes
        // Random-ish but structured data
        let content = '';
        for (let i = 0; i < 5000; i++) {
            content += String.fromCharCode(65 + (i * 7 + i * i) % 26);
        }
        fs.writeFileSync(path.join(srcDir, 'data.txt'), content);

        const mediumZip = path.join(tmpDir, 'medium.zip');
        const highZip = path.join(tmpDir, 'high.zip');
        
        await ZipAFolder.zip(srcDir, mediumZip, { compression: COMPRESSION_LEVEL.medium });
        await ZipAFolder.zip(srcDir, highZip, { compression: COMPRESSION_LEVEL.high });
        
        const mediumSize = fs.statSync(mediumZip).size;
        const highSize = fs.statSync(highZip).size;
        
        // With store:true: both use STORE method → same size
        // Without store:true: medium (level=5) > high (level=9) → different sizes
        expect(mediumSize).toBe(highSize);

        fs.rmSync(tmpDir, { recursive: true });
    });
});