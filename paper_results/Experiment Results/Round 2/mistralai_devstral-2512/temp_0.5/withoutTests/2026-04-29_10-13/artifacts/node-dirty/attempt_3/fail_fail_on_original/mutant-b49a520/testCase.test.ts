import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database chunk processing', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
  });

  it('should correctly handle chunks without newlines during load', (done) => {
    // Create a test file with a chunk without newline
    const testData = '{"key":"testKey","val":{"value":"testValue"}}';
    fs.writeFileSync(dbPath, testData);

    let loadCalled = false;
    const db = new Dirty(dbPath);

    db.on('load', (size) => {
      if (loadCalled) return;
      loadCalled = true;

      // In original code, this chunk won't be processed (no newline)
      // In mutated code, it will be incorrectly processed (empty string check)
      expect(size).toBe(0);
      expect(db.get('testKey')).toBeUndefined();

      db.close();
      done();
    });

    db.on('error', (err) => {
      if (!loadCalled) {
        done(err);
      }
    });
  });
});