import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database load behavior', () => {
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

  it('should emit error event when database file ends with incomplete row', (done) => {
    // Create a database file with an incomplete row (no newline at end)
    const incompleteData = '{"key":"test","val":"value"}';
    fs.writeFileSync(dbPath, incompleteData);

    const db = new Dirty(dbPath);
    let errorEmitted = false;
    let loadEmitted = false;

    db.on('error', (err) => {
      errorEmitted = true;
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toContain('Corrupted row at the end of the db');
      if (!loadEmitted) {
        done();
      }
    });

    db.on('load', () => {
      loadEmitted = true;
      if (!errorEmitted) {
        done(new Error('Expected error event but got load event instead'));
      }
    });
  });
});