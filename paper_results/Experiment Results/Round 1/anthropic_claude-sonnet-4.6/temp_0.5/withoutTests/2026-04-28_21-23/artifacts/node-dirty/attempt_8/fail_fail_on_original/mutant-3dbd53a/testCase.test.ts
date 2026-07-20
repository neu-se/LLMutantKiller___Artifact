import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

describe('Dirty write stream encoding', () => {
  it('should show difference between utf-8 and empty encoding streams', () => {
    const f = path.join(os.tmpdir(), 'test.txt');
    
    const s1 = fs.createWriteStream(f, { encoding: 'utf-8' as BufferEncoding, flags: 'a' });
    const s2 = fs.createWriteStream(f, { encoding: '' as BufferEncoding, flags: 'a' });
    
    // Get all own property names and their values
    const getProps = (obj: any): Record<string, any> => {
      const result: Record<string, any> = {};
      let proto = obj;
      while (proto && proto !== Object.prototype) {
        for (const key of Object.getOwnPropertyNames(proto)) {
          if (!(key in result) && key !== 'constructor') {
            try {
              const val = obj[key];
              if (typeof val !== 'function') {
                result[key] = val;
              }
            } catch (_) {}
          }
        }
        proto = Object.getPrototypeOf(proto);
      }
      return result;
    };
    
    const props1 = getProps(s1);
    const props2 = getProps(s2);
    
    s1.destroy();
    s2.destroy();
    try { fs.unlinkSync(f); } catch (_) {}
    
    // Find differences
    const diffs: string[] = [];
    const allKeys = new Set([...Object.keys(props1), ...Object.keys(props2)]);
    for (const key of allKeys) {
      if (JSON.stringify(props1[key]) !== JSON.stringify(props2[key])) {
        diffs.push(`${key}: ${JSON.stringify(props1[key])} vs ${JSON.stringify(props2[key])}`);
      }
    }
    
    console.log('Differences:', diffs);
    expect(diffs.length).toBeGreaterThan(0); // Will fail if no differences, showing us what differs
  });
});