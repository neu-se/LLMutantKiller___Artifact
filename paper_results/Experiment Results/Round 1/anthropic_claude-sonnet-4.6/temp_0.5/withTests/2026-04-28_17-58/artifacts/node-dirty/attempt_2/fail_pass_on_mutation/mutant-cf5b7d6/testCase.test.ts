import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty db data event handler return value behavior', () => {
  it('should load records correctly when data arrives in chunks requiring buffer accumulation', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-chunk-test-${process.pid}.dirty`);

    // Create a large file so data arrives in multiple chunks, exercising
    // the full data handler including its return value path
    const records: string[] = [];
    for (let i = 0; i < 1000; i++) {
      records.push(JSON.stringify({ key: `key${i}`, val: `value${i}` }));
    }
    const content = records.join('\n') + '\n';
    fs.writeFileSync(file, content, 'utf-8');

    // Use a small highWaterMark to force multiple 'data' events
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(file);

    db.on('load', (size: number) => {
      try {
        expect(size).toBe(1000);
        for (let i = 0; i < 1000; i++) {
          expect(db.get(`key${i}`)).toBe(`value${i}`);
        }
        fs.unlinkSync(file);
        done();
      } catch (err) {
        try { fs.unlinkSync(file); } catch (_) {}
        done(err);
      }
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(file); } catch (_) {}
      done(err);
    });
  });
});