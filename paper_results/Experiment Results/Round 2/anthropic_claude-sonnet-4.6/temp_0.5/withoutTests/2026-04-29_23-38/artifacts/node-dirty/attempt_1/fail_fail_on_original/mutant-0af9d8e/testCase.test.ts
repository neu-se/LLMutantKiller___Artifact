import { promises as fsPromises } from 'fs';
import * as path from 'path';
import * as os from 'os';
import { rimraf } from 'rimraf';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event emission', () => {
  it('should emit drain event after writing to the database when write stream drains', async () => {
    const tmpDir = await fsPromises.mkdtemp(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    try {
      await new Promise<void>((resolve, reject) => {
        const db = new Dirty(dbPath);
        
        db.on('error', (err: Error) => {
          reject(err);
        });

        db.on('load', () => {
          // Set up a timeout to detect if drain is never emitted
          const timeout = setTimeout(() => {
            reject(new Error('drain event was never emitted - mutation may be present'));
          }, 5000);

          let drainCount = 0;

          db.on('drain', () => {
            drainCount++;
            clearTimeout(timeout);
            
            // Verify the data was actually written correctly
            const val = db.get('testKey');
            if (val !== 'testValue') {
              reject(new Error(`Expected 'testValue' but got '${val}'`));
              return;
            }
            
            db.close();
          });

          db.on('write_close', () => {
            resolve();
          });

          // Write a value - this should trigger a flush and eventually emit 'drain'
          db.set('testKey', 'testValue');
        });
      });
    } finally {
      await rimraf(tmpDir);
    }
  });
});