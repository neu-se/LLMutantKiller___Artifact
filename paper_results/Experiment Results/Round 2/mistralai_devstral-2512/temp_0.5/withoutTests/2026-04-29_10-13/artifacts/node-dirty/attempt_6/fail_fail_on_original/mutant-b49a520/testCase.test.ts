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

  it('should correctly process chunks with newlines and ignore chunks without newlines', (done) => {
    // Create a test file with a complete line followed by incomplete line
    const testData = '{"key":"testKey1","val":{"value":"testValue1"}}\n{"key":"testKey2","val":{"value":"testValue2"}}';
    fs.writeFileSync(dbPath, testData);

    const db = new Dirty(dbPath);
    let loadEventFired = false;

    db.on('load', (size) => {
      if (loadEventFired) return;
      loadEventFired = true;

      // Original code should only process the first complete line (with newline)
      // Mutated code will process both lines (empty string check passes)
      expect(size).toBe(1);
      expect(db.get('testKey1')).toEqual({ value: 'testValue1' });
      expect(db.get('testKey2')).toBeUndefined();

      db.close();
      done();
    });

    db.on('error', (err) => {
      if (!loadEventFired) {
        done(err);
      }
    });
  });
});