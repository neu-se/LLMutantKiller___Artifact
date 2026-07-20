import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { COMPRESSION_LEVEL, ZipAFolder } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";

describe('ZIP store option', () => {
    it('medium compression should produce larger zip than high compression without store:true', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-store-'));
        const srcDir = path.join(tmpDir, 'src');
        fs.mkdirSync(srcDir);
        
        // Data that shows clear difference between compression levels 5 and 9
        // Large file with repeated patterns at different scales
        const chunk = Buffer.alloc(1000);
        for (let i = 0; i < chunk.length; i++) {
            chunk[i] = Math.floor(Math.sin(i) * 64 + 64);
        }
        const buf = Buffer.concat(Array(200).fill(chunk));
        fs.writeFileSync(path.join(srcDir, 'data.bin'), buf);

        const mediumZip = path.join(tmpDir, 'medium.zip');
        const highZip = path.join(tmpDir, 'high.zip');
        
        await ZipAFolder.zip(srcDir, mediumZip, { compression: COMPRESSION_LEVEL.medium });
        await ZipAFolder.zip(srcDir, highZip, { compression: COMPRESSION_LEVEL.high });
        
        const mediumSize = fs.statSync(mediumZip).size;
        const highSize = fs.statSync(highZip).size;
        
        // With store:true (original): both use STORE method → same size (large, ~200000 bytes)
        // Without store:true (mutated): level 5 vs level 9 → medium > high
        expect(mediumSize).toBe(highSize);

        fs.rmSync(tmpDir, { recursive: true });
    });
});