import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database key validation', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('should emit error when loading data without key field', (done) => {
    // Create a database file with a row missing the 'key' field
    const invalidData = JSON.stringify({ val: "test value" }) + '\n';
    fs.writeFileSync(dbPath, invalidData);

    const db = new Dirty(dbPath);
    let errorEmitted = false;

    db.on('error', (err) => {
      errorEmitted = true;
      expect(err).toBeInstanceOf(Error);
      done();
    });

    db.on('load', () => {
      if (!errorEmitted) {
        done(new Error('Expected error event but got load event instead'));
      }
    });
  });
});