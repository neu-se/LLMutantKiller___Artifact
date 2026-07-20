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

  it('should correctly handle chunks without newlines during streaming', (done) => {
    // Create empty file first
    fs.writeFileSync(dbPath, '');

    const db = new Dirty(dbPath);
    let loadEventFired = false;

    db.on('load', (size) => {
      if (loadEventFired) return;
      loadEventFired = true;

      // Now simulate streaming data without newline
      const testChunk = '{"key":"testKey","val":{"value":"testValue"}}';
      db._readStream.emit('data', testChunk);

      // In original code, this chunk won't be processed (no newline)
      // In mutated code, it will be incorrectly processed (empty string check)
      setTimeout(() => {
        expect(db.get('testKey')).toBeUndefined();
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