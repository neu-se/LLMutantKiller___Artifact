import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database drain event', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterEach(() => {
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
    }
    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir);
    }
  });

  it('should emit drain event when writes complete and queue is empty', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;

    db.on('load', () => {
      db.on('drain', () => {
        drainCount++;
      });

      db.set('key1', { value: 'data1' }, () => {
        // After the callback fires, the queue should be empty
        // and inFlightWrites should be 0, triggering drain
        setImmediate(() => {
          if (drainCount > 0) {
            done();
          } else {
            done(new Error('drain event was not emitted when expected'));
          }
        });
      });
    });
  });
});