import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

// Use require to avoid TypeScript issues with the JS module
const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('Dirty drain event after backpressure', () => {
  it('should emit drain event when write stream drains with empty queue and no in-flight writes', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      const ws: any = db._writeStream;
      
      // Patch write to simulate backpressure (return false)
      const origWrite = ws.write.bind(ws);
      ws.write = (data: any, cb: any) => {
        // Call original but return false to simulate backpressure
        origWrite(data, cb);
        return false;
      };

      db.once('drain', () => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done();
      });

      db.set('testKey', 'testValue');
    });

    db.on('error', (err: Error) => {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(err);
    });
  }, 10000);
});