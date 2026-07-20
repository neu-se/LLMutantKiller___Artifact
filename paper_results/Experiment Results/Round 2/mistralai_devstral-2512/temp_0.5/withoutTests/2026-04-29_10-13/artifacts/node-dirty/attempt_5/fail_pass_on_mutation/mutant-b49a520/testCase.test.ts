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
    // Create a test file with a chunk without newline followed by a newline
    const testData = '{"key":"testKey","val":{"value":"testValue"}}\n';
    fs.writeFileSync(dbPath, testData);

    const db = new Dirty(dbPath);
    let loadEventFired = false;

    db.on('load', (size) => {
      if (loadEventFired) return;
      loadEventFired = true;

      // In original code, this chunk will be processed (has newline)
      // In mutated code, it will also be processed (empty string check)
      // But we need to test the actual mutation behavior
      expect(size).toBe(1);
      expect(db.get('testKey')).toEqual({ value: 'testValue' });

      // Now test the actual mutation by simulating a chunk without newline
      const testChunk = '{"key":"testKey2","val":{"value":"testValue2"}}';
      db._readStream.emit('data', testChunk);

      // In original code, this chunk won't be processed (no newline)
      // In mutated code, it will be incorrectly processed (empty string check)
      setTimeout(() => {
        expect(db.get('testKey2')).toBeUndefined();
        db.close();
        done();
      }, 100);
    });

    db.on('error', (err) => {
      if (!loadEventFired) {
        done(err);
      }
    });
  });
});