import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database chunk processing', () => {
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

  it('should correctly handle chunks without newlines by not processing them', (done) => {
    // Create a file with data that doesn't contain any newlines
    const dataWithoutNewlines = '{"key":"test","val":"data"}';
    fs.writeFileSync(dbPath, dataWithoutNewlines);

    const db = new Dirty(dbPath);
    let loadEventCount = 0;
    let errorEventCount = 0;

    db.on('load', (size) => {
      loadEventCount++;
      // Original code should have size 0 (no complete lines processed)
      // Mutated code will have size 1 (incorrectly processes incomplete line)
      expect(size).toBe(0);
      if (loadEventCount === 1 && errorEventCount === 0) {
        done(new Error('Expected error event for incomplete line'));
      }
    });

    db.on('error', (err) => {
      errorEventCount++;
      // Original code should emit error for corrupted data at end
      expect(err.message).toContain('Corrupted row at the end of the db');
      if (errorEventCount === 1 && loadEventCount === 0) {
        done();
      }
    });

    setTimeout(() => {
      if (loadEventCount === 0 && errorEventCount === 0) {
        done(new Error('Test timed out - no events fired'));
      }
    }, 200);
  });
});