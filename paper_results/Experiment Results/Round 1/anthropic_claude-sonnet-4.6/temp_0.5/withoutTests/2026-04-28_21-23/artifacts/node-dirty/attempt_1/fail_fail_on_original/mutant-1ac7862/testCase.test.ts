import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { rimraf } from 'rimraf';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty flush behavior with multiple keys', () => {
  it('should call all callbacks when multiple keys are set simultaneously', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new Dirty(dbPath);
    
    db.on('load', () => {
      const callbackCount = { count: 0 };
      const totalKeys = 5;
      
      const checkDone = (err?: Error) => {
        if (err) {
          rimraf.sync(tmpDir);
          done(err);
          return;
        }
        callbackCount.count++;
        if (callbackCount.count === totalKeys) {
          // All callbacks fired - verify all data is in memory
          for (let i = 0; i < totalKeys; i++) {
            const val = db.get(`key${i}`);
            if (val !== `value${i}`) {
              rimraf.sync(tmpDir);
              done(new Error(`Expected value${i} but got ${val} for key${i}`));
              return;
            }
          }
          db.close();
          db.once('write_close', () => {
            rimraf.sync(tmpDir);
            done();
          });
        }
      };
      
      // Set multiple keys - in mutated version, only first key's callback fires per flush
      for (let i = 0; i < totalKeys; i++) {
        db.set(`key${i}`, `value${i}`, checkDone);
      }
    });
    
    db.on('error', (err: Error) => {
      rimraf.sync(tmpDir);
      done(err);
    });
  });
});