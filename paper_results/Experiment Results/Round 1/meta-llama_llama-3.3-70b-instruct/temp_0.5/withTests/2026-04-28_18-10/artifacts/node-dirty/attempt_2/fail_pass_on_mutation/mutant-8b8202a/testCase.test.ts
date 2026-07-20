import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty db', () => {
  it('should trigger drain event only when all writes are complete', (done) => {
    const file = 'test.dirty';
    fs.unlinkSync(file);
    const db = new Dirty(file);

    let drainCount = 0;
    db.on('drain', () => {
      drainCount++;
      if (drainCount === 1) {
        db.set('key2', 'value2');
      } else if (drainCount === 2) {
        db.close();
        fs.readFile(file, 'utf8', (err, data) => {
          if (err) throw err;
          const lines = data.split('\n');
          expect(lines.length).toBe(3); // 2 data lines + 1 empty line at the end
          done();
        });
      }
    });

    db.set('key1', 'value1');
  });
});