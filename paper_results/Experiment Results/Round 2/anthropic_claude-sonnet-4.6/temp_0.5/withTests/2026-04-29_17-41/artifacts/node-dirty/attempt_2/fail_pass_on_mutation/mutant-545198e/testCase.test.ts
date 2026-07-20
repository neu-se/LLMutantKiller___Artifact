import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty db loading from persisted file', () => {
  it('should correctly load all records written to a file', (done) => {
    const file = path.join(os.tmpdir(), `dirty-mutant-test-${process.pid}-${Date.now()}.dirty`);

    // Write a file with known records directly
    const records = [
      { key: 'name', val: 'Alice' },
      { key: 'score', val: 99 },
      { key: 'active', val: true },
    ];
    const content = records.map((r) => JSON.stringify(r)).join('\n') + '\n';
    fs.writeFileSync(file, content, 'utf-8');

    const db = new Dirty(file);

    db.on('load', (size: number) => {
      try {
        expect(size).toBe(3);
        expect(db.get('name')).toBe('Alice');
        expect(db.get('score')).toBe(99);
        expect(db.get('active')).toBe(true);
        done();
      } catch (e) {
        done(e);
      } finally {
        try { fs.unlinkSync(file); } catch (_) {}
      }
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(file); } catch (_) {}
      done(err);
    });
  });
});