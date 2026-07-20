import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty', () => {
  it('should load record correctly when chunk boundary falls mid-line', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Default highWaterMark for fs.createReadStream is 64KB (65536 bytes)
    // Create a value that makes the JSON line longer than 65536 bytes
    // so the first chunk won't contain a newline
    const chunkSize = 65536;
    // Pad the value so the full JSON line is > chunkSize
    const padding = 'x'.repeat(chunkSize);
    const content = JSON.stringify({ key: 'k', val: padding }) + '\n';
    fs.writeFileSync(dbPath, content, 'utf-8');

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(dbPath);
    const errors: Error[] = [];

    db.on('error', (err: Error) => { errors.push(err); });
    db.on('load', (count: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(count).toBe(1);
        expect(db.get('k')).toBe(padding);
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done();
      } catch (e) {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done(e);
      }
    });
  });
});