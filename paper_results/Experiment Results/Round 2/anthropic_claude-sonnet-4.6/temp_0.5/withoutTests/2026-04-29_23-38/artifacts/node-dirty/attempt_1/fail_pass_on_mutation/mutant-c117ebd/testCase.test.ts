import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database file reading with utf-8 encoding', () => {
  it('should correctly load data from an existing database file with utf-8 content', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-test-${Date.now()}-${Math.floor(Math.random() * 10000)}.db`);

    // Write a valid dirty db file with some data
    const row1 = JSON.stringify({ key: 'hello', val: 'world' }) + '\n';
    const row2 = JSON.stringify({ key: 'foo', val: { bar: 42 } }) + '\n';
    const row3 = JSON.stringify({ key: 'unicode', val: 'café résumé' }) + '\n';
    fs.writeFileSync(dbPath, row1 + row2 + row3, 'utf-8');

    const db = new Dirty(dbPath);

    db.on('load', (count: number) => {
      try {
        expect(count).toBe(3);
        expect(db.get('hello')).toBe('world');
        expect(db.get('foo')).toEqual({ bar: 42 });
        expect(db.get('unicode')).toBe('café résumé');
        
        db.close();
        db.on('write_close', () => {
          fs.unlinkSync(dbPath);
          done();
        });
      } catch (err) {
        fs.unlinkSync(dbPath);
        done(err);
      }
    });

    db.on('error', (err: Error) => {
      try {
        fs.unlinkSync(dbPath);
      } catch (e) {
        // ignore cleanup errors
      }
      done(err);
    });
  });
});