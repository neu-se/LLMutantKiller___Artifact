import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database', () => {
  it('should report correct size matching load count after loading file with corrupted rows', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Manually craft a db with valid JSON but missing 'key' property (triggers catch+return path)
    // followed by a valid row
    const lines = [
      JSON.stringify({ key: 'first', val: 'hello' }),
      JSON.stringify({ notkey: 'bad', val: 'world' }), // missing 'key' -> error path
      JSON.stringify({ key: 'second', val: 'there' }),
    ].join('\n') + '\n';

    fs.writeFileSync(dbPath, lines, 'utf-8');

    const db = new Dirty(dbPath);
    const errors: Error[] = [];

    db.on('error', (err: Error) => errors.push(err));

    db.on('load', (count: number) => {
      try {
        expect(count).toBe(2);
        expect(db.size()).toBe(2);
        expect(db.get('first')).toBe('hello');
        expect(db.get('second')).toBe('there');
        expect(errors).toHaveLength(1);
      } catch (e) {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done(e);
        return;
      }
      db.close();
      db.once('write_close', () => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done();
      });
    });
  }, 10000);
});