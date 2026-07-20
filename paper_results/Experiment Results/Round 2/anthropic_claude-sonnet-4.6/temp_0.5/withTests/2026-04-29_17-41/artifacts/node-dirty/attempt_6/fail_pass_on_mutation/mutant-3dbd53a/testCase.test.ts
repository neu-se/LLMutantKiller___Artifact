import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

describe('write stream encoding comparison', () => {
  it('utf-8 and empty encoding produce streams with different properties', () => {
    const f1 = path.join(os.tmpdir(), `a-${Date.now()}.txt`);
    const f2 = path.join(os.tmpdir(), `b-${Date.now()}.txt`);
    
    const ws1 = fs.createWriteStream(f1, { encoding: 'utf-8' as BufferEncoding });
    const ws2 = fs.createWriteStream(f2, { encoding: '' as BufferEncoding });
    
    // Find any property that differs
    const props = Object.getOwnPropertyNames(ws1).concat(
      Object.getOwnPropertyNames(Object.getPrototypeOf(ws1))
    );
    
    const differences: string[] = [];
    for (const prop of props) {
      try {
        const v1 = (ws1 as any)[prop];
        const v2 = (ws2 as any)[prop];
        if (typeof v1 !== 'function' && JSON.stringify(v1) !== JSON.stringify(v2)) {
          differences.push(`${prop}: ${JSON.stringify(v1)} vs ${JSON.stringify(v2)}`);
        }
      } catch (_) {}
    }
    
    ws1.destroy();
    ws2.destroy();
    try { fs.unlinkSync(f1); } catch (_) {}
    try { fs.unlinkSync(f2); } catch (_) {}
    
    expect(differences.length).toBeGreaterThan(0);
  });
});