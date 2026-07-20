import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty write stream encoding', () => {
  it('write stream writableEncoding should differ between utf-8 and empty string options', () => {
    const f1 = path.join(os.tmpdir(), `ws-utf8-${Date.now()}.txt`);
    const f2 = path.join(os.tmpdir(), `ws-empty-${Date.now()}.txt`);

    const ws1 = fs.createWriteStream(f1, { encoding: 'utf-8' as BufferEncoding });
    const ws2 = fs.createWriteStream(f2, { encoding: '' as BufferEncoding });

    const enc1 = (ws1 as any).writableEncoding ?? (ws1 as any)._writableState?.defaultEncoding;
    const enc2 = (ws2 as any).writableEncoding ?? (ws2 as any)._writableState?.defaultEncoding;

    ws1.destroy();
    ws2.destroy();
    try { fs.unlinkSync(f1); } catch (_) {}
    try { fs.unlinkSync(f2); } catch (_) {}

    // If these are the same, the mutation is equivalent and undetectable
    // If different, we can use this to detect the mutation
    expect(enc1).not.toBe(enc2);
  });
});