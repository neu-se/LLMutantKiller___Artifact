import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database loading with encoding', () => {
  it('should correctly load data from an existing database file with UTF-8 content', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-test-${Date.now()}.db`);
    
    // Write a database file with UTF-8 encoded content including non-ASCII characters
    const row1 = JSON.stringify({ key: 'hello', val: 'wörld' }) + '\n';
    const row2 = JSON.stringify({ key: 'foo', val: { bar: 'bàz' } }) + '\n';
    fs.writeFileSync(dbPath, row1 + row2, 'utf-8');
    
    const db = new Dirty(dbPath);
    db.on('load', (count) => {
      try {
        expect(count).toBe(2);
        expect(db.get('hello')).toBe('wörld');
        expect(db.get('foo')).toEqual({ bar: 'bàz' });
        fs.unlinkSync(dbPath);
        done();
      } catch (e) {
        fs.unlinkSync(dbPath);
        done(e);
      }
    });
    db.on('error', (err) => {
      try {
        fs.unlinkSync(dbPath);
      } catch {}
      done(err);
    });
  });
});