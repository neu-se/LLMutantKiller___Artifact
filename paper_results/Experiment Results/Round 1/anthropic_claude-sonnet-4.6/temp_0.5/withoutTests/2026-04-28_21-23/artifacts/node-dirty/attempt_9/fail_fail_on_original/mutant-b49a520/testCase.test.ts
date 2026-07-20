import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

describe('Dirty database', () => {
  it('should load data correctly when chunks do not contain newlines', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Write a row that is longer than the chunk size we'll use
    const row = JSON.stringify({ key: 'testkey', val: 'testval' }) + '\n';
    fs.writeFileSync(dbPath, row, 'utf-8');

    // Monkey-patch createReadStream to use tiny highWaterMark
    // so chunks are split mid-row (no newline in early chunks)
    const origCreateReadStream = fs.createReadStream.bind(fs);
    const patchedFs = Object.create(fs);
    
    // Use jest to spy
    const spy = jest.spyOn(fs, 'createReadStream').mockImplementation((p: any, opts: any) => {
      return origCreateReadStream(p, { ...opts, highWaterMark: 1 });
    });

    delete require.cache[require.resolve('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js')];
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(dbPath);
    const errors: string[] = [];

    db.on('error', (err: Error) => errors.push(err.message));

    db.on('load', (count: number) => {
      spy.mockRestore();
      fs.rmSync(tmpDir, { recursive: true });
      try {
        expect(errors).toHaveLength(0);
        expect(count).toBe(1);
        expect(db.get('testkey')).toBe('testval');
        done();
      } catch (err) {
        done(err);
      }
    });
  });
});