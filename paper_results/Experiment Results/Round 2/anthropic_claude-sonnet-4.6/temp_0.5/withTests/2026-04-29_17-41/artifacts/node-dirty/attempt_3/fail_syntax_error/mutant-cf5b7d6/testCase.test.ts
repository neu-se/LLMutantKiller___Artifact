import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty data event handling', () => {
  it('should process rows correctly when data arrives in chunks larger than one line', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-chunk-test-${process.pid}.dirty`);
    // Write enough data to ensure the chunk contains a newline and triggers the split logic
    const rows = Array.from({length: 100}, (_, i) => JSON.stringify({key: `key${i}`, val: `val${i}`)}).join('\n') + '\n';
    fs.writeFileSync(tmpFile, rows);
    const db = new Dirty(tmpFile);
    db.on('load', (size: number) => {
      expect(size).toBe(100);
      for (let i = 0; i < 100; i++) {
        expect(db.get(`key${i}`)).toBe(`val${i}`);
      }
      try { fs.unlinkSync(tmpFile); } catch (_) {}
      done();
    });
  });
});