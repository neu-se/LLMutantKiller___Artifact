import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event emission', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain event with correct argument when write stream drains', (done) => {
    const db = new Dirty(dbPath);
    let drainEventReceived = false;

    db.on('load', () => {
      // Set multiple values to ensure we trigger the drain event
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.set('key3', 'value3');
    });

    db.on('drain', (...args) => {
      if (drainEventReceived) return;
      drainEventReceived = true;

      // In original code: emit('drain') is called with no arguments
      // In mutated code: emit('') is called with empty string
      // We can detect this by checking the arguments length
      if (args.length === 0) {
        done();
      } else {
        done(new Error('Drain event was emitted with unexpected arguments'));
      }
    });
  });
});