import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain event when queue is empty and writes complete', (done) => {
    const db = new Dirty(dbPath);
    let drainEmitted = false;

    db.on('load', () => {
      db.set('key1', { value: 'data1' }, () => {
        // Wait for the write to complete
        setImmediate(() => {
          if (drainEmitted) {
            done();
          } else {
            done(new Error('drain event was not emitted when expected'));
          }
        });
      });

      db.on('drain', () => {
        drainEmitted = true;
      });
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});