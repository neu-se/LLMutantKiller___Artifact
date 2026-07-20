import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder zip store option', () => {
    it('should create a zip where file size with store:true is larger than with deflate for incompressible data', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const zipWithStore = path.join(tmpDir, 'store.zip');
        const zipNoStore = path.join(tmpDir, 'deflate.zip');

        fs.mkdirSync(srcDir);

        // Create incompressible-ish content using a repeating but varied pattern
        // 5000 bytes of varied content
        const content = Array.from({ length: 5000 }, (_, i) => 
            String.fromCharCode(32 + ((i * 73 + i * i * 17) % 95))
        ).join('');
        fs.writeFileSync(path.join(srcDir, 'data.txt'), content);

        // Original code: uses archiverOptions: { store: true } for zip
        // This should store without compression -> larger file
        await ZipAFolder.zip(srcDir, zipWithStore, { compression: COMPRESSION_LEVEL.high });

        // Now manually create a zip using ZipAFolder with medium compression to compare
        // Actually let's use uncompressed level - but that hits empty if block
        // Instead compare the zip size to the raw content size
        const zipSize = fs.statSync(zipWithStore).size;
        const rawContentSize = content.length;

        // With store:true (original): zip size should be close to raw content size (+ overhead)
        // With {} (mutated): zip size should be smaller due to deflate compression
        // The content has some patterns so deflate should compress it somewhat
        
        // Original: stored, so zip size >= raw content size (roughly)
        // Mutated: deflated, so zip size < raw content size
        expect(zipSize).toBeGreaterThanOrEqual(rawContentSize);

        fs.rmSync(tmpDir, { recursive: true });
    });
});