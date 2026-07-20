import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { rimraf } from 'rimraf';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event after backpressure', () => {
  it('should emit drain event after write stream drains when queue is empty and no in-flight writes', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Monkey-patch the write stream to simulate backpressure
      const originalWrite = db._writeStream.write.bind(db._writeStream);
      let firstWrite = true;
      
      db._writeStream.write = function(data, cb) {
        const result = originalWrite(data, cb);
        if (firstWrite) {
          firstWrite = false;
          // Force backpressure by returning false
          return false;
        }
        return result;
      };

      db.on('drain', () => {
        rimraf(tmpDir).then(() => done()).catch(done);
      });

      db.set('key1', { value: 'test' });
    });

    db.on('error', done);
  });
});