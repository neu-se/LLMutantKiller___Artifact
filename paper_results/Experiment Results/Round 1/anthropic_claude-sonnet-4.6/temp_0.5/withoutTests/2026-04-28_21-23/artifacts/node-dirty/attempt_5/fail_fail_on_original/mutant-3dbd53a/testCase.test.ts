import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

describe('Dirty write stream encoding', () => {
  it('fs.createWriteStream with encoding utf-8 should have utf-8 as defaultEncoding', () => {
    const tmpFile = path.join(os.tmpdir(), 'dirty-enc-test.txt');
    
    // Test what encoding: 'utf-8' produces
    const streamWithUtf8 = fs.createWriteStream(tmpFile, { encoding: 'utf-8' as BufferEncoding, flags: 'a' });
    const utf8DefaultEnc = (streamWithUtf8 as any)._writableState?.defaultEncoding;
    streamWithUtf8.destroy();
    
    // Test what encoding: '' produces  
    const streamWithEmpty = fs.createWriteStream(tmpFile, { encoding: '' as BufferEncoding, flags: 'a' });
    const emptyDefaultEnc = (streamWithEmpty as any)._writableState?.defaultEncoding;
    streamWithEmpty.destroy();
    
    try { fs.unlinkSync(tmpFile); } catch (_) {}
    
    // They should be different - utf-8 explicitly sets it, '' does not
    expect(utf8DefaultEnc).not.toBe(emptyDefaultEnc);
  });
});