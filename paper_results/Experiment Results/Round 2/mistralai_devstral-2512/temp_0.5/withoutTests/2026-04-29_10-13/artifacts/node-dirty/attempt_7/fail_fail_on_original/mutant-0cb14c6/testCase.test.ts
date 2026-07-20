import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database drain event boundary test', () => {
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

  it('should emit drain when inFlightWrites transitions from 1 to 0', (done) => {
    const db = new Dirty(dbPath);
    let writeCompleted = false;
    let drainEmitted = false;

    db.on('drain', () => {
      drainEmitted = true;
      expect(writeCompleted).toBe(true);
      expect(db.get('key')).toBe('value');
      db.close();
      done();
    });

    // Perform a single write that will make _inFlightWrites go from 1 to 0
    db.set('key', 'value', () => {
      writeCompleted = true;
      // At this point _inFlightWrites should be 0
      // Original code will emit drain (<= 0)
      // Mutated code won't emit drain (< 0)
    });

    // Safety timeout
    setTimeout(() => {
      if (!drainEmitted) {
        fail('drain event was not emitted when inFlightWrites reached 0');
        db.close();
        done();
      }
    }, 2000);
  });
});