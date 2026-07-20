import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Readable } from 'stream';

describe('Dirty', () => {
  it('should correctly load records when read stream delivers chunks without newlines', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const record = JSON.stringify({ key: 'testkey', val: 'testval' }) + '\n';
    fs.writeFileSync(dbPath, record, 'utf-8');

    // Spy on createReadStream to inject small highWaterMark
    const spy = jest.spyOn(fs, 'createReadStream').mockImplementationOnce((filePath: any, options: any) => {
      spy.mockRestore();
      return fs.createReadStream(filePath, { ...options, highWaterMark: 8 });
    });

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(dbPath);

    const errors: Error[] = [];
    db.on('error', (err: Error) => { errors.push(err); });
    db.on('load', (count: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(count).toBe(1);
        expect(db.get('testkey')).toBe('testval');
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done();
      } catch (e) {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done(e);
      }
    });
  });
});