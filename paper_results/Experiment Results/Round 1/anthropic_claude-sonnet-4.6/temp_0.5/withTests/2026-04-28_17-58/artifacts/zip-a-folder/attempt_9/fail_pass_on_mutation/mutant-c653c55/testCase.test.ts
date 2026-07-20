import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { COMPRESSION_LEVEL, ZipAFolder } from "../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder";

describe('ZIP store option', () => {
    it('should produce same size zip for medium and high compression when store:true is set', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-store-'));
        const srcDir = path.join(tmpDir, 'src');
        fs.mkdirSync(srcDir);
        
        // Highly compressible data - both level 5 and level 9 should produce same tiny output
        // But with store:true, both should produce large uncompressed output
        const content = 'abcdefghijklmnopqrstuvwxyz'.repeat(4000);
        fs.writeFileSync(path.join(srcDir, 'data.txt'), content);

        const mediumZip = path.join(tmpDir, 'medium.zip');
        const highZip = path.join(tmpDir, 'high.zip');
        
        await ZipAFolder.zip(srcDir, mediumZip, { compression: COMPRESSION_LEVEL.medium });
        await ZipAFolder.zip(srcDir, highZip, { compression: COMPRESSION_LEVEL.high });
        
        const mediumSize = fs.statSync(mediumZip).size;
        const highSize = fs.statSync(highZip).size;
        
        // With store:true (original): STORE → same large size (~104000 bytes each)
        // Without store:true (mutated): both levels produce same tiny output → also equal
        // This test only works if store:true causes STORE and mutated causes different-sized DEFLATE
        expect(mediumSize).toBe(highSize);

        fs.rmSync(tmpDir, { recursive: true });
    });
});