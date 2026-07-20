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
    let drainEmitted = false;
    let writeCompleted = false;

    db.on('load', () => {
      db.on('drain', () => {
        drainEmitted = true;
      });

      // First write
      db.set('key1', { value: 'data1' }, () => {
        writeCompleted = true;
      });

      // Check after a short delay to allow the drain event to fire
      setTimeout(() => {
        if (writeCompleted && drainEmitted) {
          done();
        } else {
          done(new Error(`Test failed: writeCompleted=${writeCompleted}, drainEmitted=${drainEmitted}`));
        }
      }, 100);
    });
  });
});