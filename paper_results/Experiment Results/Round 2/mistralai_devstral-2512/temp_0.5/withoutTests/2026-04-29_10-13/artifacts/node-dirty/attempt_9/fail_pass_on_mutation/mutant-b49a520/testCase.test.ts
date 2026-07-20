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
    // Create a test file with multiple complete lines
    const testData = '{"key":"testKey1","val":{"value":"testValue1"}}\n{"key":"testKey2","val":{"value":"testValue2"}}\n';
    fs.writeFileSync(dbPath, testData);

    const db = new Dirty(dbPath);
    let loadEventFired = false;

    db.on('load', (size) => {
      if (loadEventFired) return;
      loadEventFired = true;

      // Both original and mutated code should process these complete lines
      expect(size).toBe(2);
      expect(db.get('testKey1')).toEqual({ value: 'testValue1' });
      expect(db.get('testKey2')).toEqual({ value: 'testValue2' });

      // Now test the actual mutation by simulating a chunk without newline
      const testChunk = '{"key":"testKey3","val":{"value":"testValue3"}}';
      db._readStream.emit('data', testChunk);

      // In original code, this chunk won't be processed (no newline)
      // In mutated code, it will be incorrectly processed (empty string check)
      setTimeout(() => {
        expect(db.get('testKey3')).toBeUndefined();
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