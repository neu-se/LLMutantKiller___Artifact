import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty database loading', () => {
  it('should correctly count loaded records when data spans multiple chunks', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Create many records to ensure multiple read chunks
    const rows: string[] = [];
    for (let i = 0; i < 10000; i++) {
      rows.push(JSON.stringify({ key: `key${i}`, val: `value${i}` }));
    }
    fs.writeFileSync(dbPath, rows.join('\n') + '\n', 'utf-8');

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(dbPath);
    const errors: Error[] = [];

    db.on('error', (err: Error) => { errors.push(err); });
    db.on('load', (count: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(count).toBe(10000);
        expect(db.get('key0')).toBe('value0');
        expect(db.get('key9999')).toBe('value9999');
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done();
      } catch (e) {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done(e);
      }
    });
  });
});