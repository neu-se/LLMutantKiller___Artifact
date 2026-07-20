import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database chunk processing', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('should handle chunks without newlines during streaming', (done) => {
    // Create a file with data that will be read in chunks without newlines
    const chunk1 = '{"key":"test1","val":"value1"}\n{"key":"test2","val":"value2"}';
    fs.writeFileSync(dbPath, chunk1, 'utf-8');

    const db = new Dirty(dbPath);
    let loadCalled = false;
    let errorCalled = false;

    db.on('load', (size) => {
      loadCalled = true;
      // Original code should process the complete line and buffer the incomplete one
      expect(size).toBe(1);
      expect(db.get('test1')).toBe('value1');
      expect(db.get('test2')).toBeUndefined();

      if (!errorCalled) {
        done();
      }
    });

    db.on('error', (err) => {
      errorCalled = true;
      // Original code should emit error for incomplete line at end
      expect(err.message).toContain('Corrupted row at the end of the db');
      if (!loadCalled) {
        done();
      }
    });

    // Safety timeout
    setTimeout(() => {
      if (!loadCalled && !errorCalled) {
        done(new Error('Test timed out'));
      }
    }, 200);
  });
});