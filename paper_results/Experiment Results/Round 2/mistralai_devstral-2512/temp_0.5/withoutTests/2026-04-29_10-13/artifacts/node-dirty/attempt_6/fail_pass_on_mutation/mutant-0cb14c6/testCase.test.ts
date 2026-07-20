import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database drain event mutation detection', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterAll(() => {
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
    }
    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir);
    }
  });

  it('should emit drain when inFlightWrites reaches exactly 0', (done) => {
    const db = new Dirty(dbPath);
    let drainEmitted = false;

    db.on('drain', () => {
      drainEmitted = true;
      expect(db.get('testKey')).toBe('testValue');
      db.close();
      done();
    });

    // Perform a single write operation
    db.set('testKey', 'testValue', () => {
      // This callback should execute before drain
      expect(db.get('testKey')).toBe('testValue');
      // At this point _inFlightWrites should be 0
      // Original code will emit drain (<= 0)
      // Mutated code won't emit drain (< 0)
    });

    // Add timeout to prevent test hanging
    setTimeout(() => {
      if (!drainEmitted) {
        fail('drain event was not emitted');
        db.close();
        done();
      }
    }, 1000);
  });
});