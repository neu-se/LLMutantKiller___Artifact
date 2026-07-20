import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as archiver from 'archiver';
import { ZipAFolder, COMPRESSION_LEVEL } from '../../../../../../../../../../../subject_repositories/zip-a-folder/lib/ZipAFolder';

describe('ZipAFolder.zip with COMPRESSION_LEVEL.uncompressed', () => {
    it('should invoke archiver with store option when compression is uncompressed', async () => {
        const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'zip-test-'));
        const srcDir = path.join(tmpDir, 'src');
        const outDir = path.join(tmpDir, 'out');
        fs.mkdirSync(srcDir);
        fs.mkdirSync(outDir);

        fs.writeFileSync(path.join(srcDir, 'test.txt'), 'Hello World');

        const zipPath = path.join(outDir, 'output.zip');

        // Intercept archiver calls to capture options
        const capturedOptions: any[] = [];
        const realArchiver = archiver as any;
        
        // Wrap the archiver function
        const originalFn = realArchiver.__esModule ? realArchiver.default : realArchiver;
        const archiverKey = Object.keys(realArchiver).find(k => typeof realArchiver[k] === 'function' && k !== '__esModule');
        
        // Use jest.mock approach - spy on the module's callable export
        // archiver is called as archiver(format, options) - it's the module itself that's callable
        // We need to intercept at the module level
        
        // Instead, let's verify behavior by checking if a zip with store:true
        // has the same size as one without - and use that to infer which path was taken
        
        // Create two reference zips to establish baseline sizes
        const zipHighPath = path.join(outDir, 'high.zip');
        await ZipAFolder.zip(srcDir, zipHighPath, { compression: COMPRESSION_LEVEL.high });
        
        await ZipAFolder.zip(srcDir, zipPath, { compression: COMPRESSION_LEVEL.uncompressed });

        // Both zips should be valid and readable
        expect(fs.existsSync(zipPath)).toBe(true);
        expect(fs.statSync(zipPath).size).toBeGreaterThan(0);

        // Read the zip and verify the general purpose bit flag
        // In ZIP format, bit 11 of general purpose bit flag indicates UTF-8 encoding
        // More importantly, check extra field length differences between store and zlib paths
        const buf = fs.readFileSync(zipPath);
        
        // Find local file header
        let localHeaderOffset = -1;
        for (let i = 0; i <= buf.length - 30; i++) {
            if (buf[i] === 0x50 && buf[i+1] === 0x4B && buf[i+2] === 0x03 && buf[i+3] === 0x04) {
                localHeaderOffset = i;
                break;
            }
        }
        expect(localHeaderOffset).toBeGreaterThanOrEqual(0);
        
        const generalPurposeBitFlag = buf.readUInt16LE(localHeaderOffset + 6);
        const compressionMethod = buf.readUInt16LE(localHeaderOffset + 8);
        
        // With store:true, archiver sets compression method to 0 and does NOT set
        // the "data descriptor" bit (bit 3) in general purpose bit flag
        // With zlib:{level:0}, archiver may set bit 3 (data descriptor present)
        const dataDescriptorBit = (generalPurposeBitFlag & 0x0008) !== 0;
        
        // Original (store:true): no data descriptor needed since sizes are known
        // Mutated (zlib:{level:0}): may use data descriptor
        // Both use compression method 0 as we've established
        
        // The key test: with store:true the compressed size in local header should be non-zero
        // With data descriptor (bit 3 set), sizes in local header are 0
        const compressedSizeInHeader = buf.readUInt32LE(localHeaderOffset + 18);
        
        if (dataDescriptorBit) {
            // Mutated path: data descriptor used, size is 0 in header
            expect(compressedSizeInHeader).toBe(0);
        } else {
            // Original path: no data descriptor, size is present in header
            expect(compressedSizeInHeader).toBeGreaterThan(0);
        }
        
        // The definitive test: original should NOT have data descriptor bit set for store:true
        expect(dataDescriptorBit).toBe(false);

        fs.rmSync(tmpDir, { recursive: true, force: true });
    });
});