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

  it('should process chunks without newlines correctly', (done) => {
    // Create a file with a chunk that doesn't contain newline
    const chunkWithoutNewline = '{"key":"test","val":"value"}';
    fs.writeFileSync(dbPath, chunkWithoutNewline, 'utf-8');

    const db = new Dirty(dbPath);
    let loadFired = false;
    let errorFired = false;

    db.on('load', (size) => {
      loadFired = true;
      // Original code should complete loading with size 0
      expect(size).toBe(0);
      if (!errorFired) {
        done();
      }
    });

    db.on('error', (err) => {
      errorFired = true;
      // Original code should emit error for incomplete line
      expect(err.message).toContain('Corrupted row at the end of the db');
      if (!loadFired) {
        done();
      }
    });

    // Safety timeout
    setTimeout(() => {
      if (!loadFired && !errorFired) {
        done(new Error('Test timed out'));
      }
    }, 200);
  });
});