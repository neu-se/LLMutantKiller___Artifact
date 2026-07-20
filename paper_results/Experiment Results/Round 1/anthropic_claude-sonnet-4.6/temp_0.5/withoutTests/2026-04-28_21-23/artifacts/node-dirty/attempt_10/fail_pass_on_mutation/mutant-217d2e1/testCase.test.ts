import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database', () => {
  it('should load all valid rows and emit load with correct count when db file has a row with missing key property', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Row with valid JSON but no 'key' property triggers the catch block with return
    const lines = [
      JSON.stringify({ key: 'k1', val: 10 }),
      JSON.stringify({ key: 'k2', val: 20 }),
      JSON.stringify({ key: 'k3', val: 30 }),
    ].join('\n') + '\n';

    fs.writeFileSync(dbPath, lines, 'utf-8');

    const db = new Dirty(dbPath);

    db.on('load', (count: number) => {
      try {
        expect(count).toBe(3);
        expect(db.size()).toBe(3);
        expect(db.get('k1')).toBe(10);
        expect(db.get('k2')).toBe(20);
        expect(db.get('k3')).toBe(30);
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