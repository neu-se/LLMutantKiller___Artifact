import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty db loading', () => {
  it('should load all records from a database file with many rows', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-test-${process.pid}.dirty`);
    const rows: string[] = [];
    for (let i = 0; i < 100; i++) {
      rows.push(JSON.stringify({key: `key${i}`, val: `val${i}`}));
    }
    fs.writeFileSync(tmpFile, rows.join('\n') + '\n');
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