import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty database loading', () => {
  it('should load records without errors from a valid database file', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const content = JSON.stringify({ key: 'testKey', val: 'testVal' }) + '\n';
    fs.writeFileSync(dbPath, content, 'utf-8');

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(dbPath);
    const errors: Error[] = [];

    db.on('error', (err: Error) => { errors.push(err); });
    db.on('load', (count: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(count).toBe(1);
        expect(db.get('testKey')).toBe('testVal');
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done();
      } catch (e) {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done(e);
      }
    });
  });
});