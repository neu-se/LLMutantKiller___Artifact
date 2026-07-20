import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty', () => {
  it('should correctly load a record written to disk', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    
    // First, write a record using dirty itself
    const db1 = new Dirty(dbPath);
    db1.on('load', () => {
      db1.set('mykey', 'myvalue', () => {
        db1.close();
        db1.once('write_close', () => {
          // Now reload from disk and verify
          const db2 = new Dirty(dbPath);
          db2.on('load', (count: number) => {
            try {
              expect(count).toBe(1);
              expect(db2.get('mykey')).toBe('myvalue');
              fs.rmSync(tmpDir, { recursive: true, force: true });
              done();
            } catch (e) {
              fs.rmSync(tmpDir, { recursive: true, force: true });
              done(e);
            }
          });
        });
      });
    });
  });
});