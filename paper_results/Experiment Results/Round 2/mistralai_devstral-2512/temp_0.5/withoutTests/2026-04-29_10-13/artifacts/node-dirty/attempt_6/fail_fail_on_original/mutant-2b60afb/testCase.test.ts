import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database drain event condition', () => {
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

  it('should emit drain when queue is empty after writes', (done) => {
    const db = new Dirty(dbPath);
    let drainEmitted = false;
    let writesCompleted = 0;

    db.on('load', () => {
      // Add writes that will complete immediately
      db.set('key1', { value: 'data1' }, () => {
        writesCompleted++;
        checkCompletion();
      });
      db.set('key2', { value: 'data2' }, () => {
        writesCompleted++;
        checkCompletion();
      });

      function checkCompletion() {
        if (writesCompleted === 2 && !drainEmitted) {
          done(new Error('drain should have been emitted by now'));
        }
      }

      db.on('drain', () => {
        drainEmitted = true;
        if (writesCompleted === 2) {
          done();
        }
      });
    });

    db.on('error', (err) => {
      done(err);
    });

    // Timeout to prevent hanging
    setTimeout(() => {
      done(new Error('Test timed out'));
    }, 1000);
  });
});