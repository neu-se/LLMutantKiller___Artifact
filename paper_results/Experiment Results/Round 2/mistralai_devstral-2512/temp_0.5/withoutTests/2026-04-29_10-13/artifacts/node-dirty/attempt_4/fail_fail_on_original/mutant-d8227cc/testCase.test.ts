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

  it('should process incomplete line at end of file correctly', (done) => {
    const testData = { key: 'testKey', val: 'testValue' };
    // Write data without trailing newline to create incomplete line
    fs.writeFileSync(dbPath, JSON.stringify(testData), 'utf-8');

    const db = new Dirty(dbPath);
    let errorEmitted = false;

    db.on('error', (err) => {
      errorEmitted = true;
      // Original code should not emit error for incomplete line
      // Mutated code will emit error due to incorrect newline check
      done(new Error(`Unexpected error: ${err.message}`));
    });

    db.on('load', (size) => {
      // Original code should complete loading without error
      // Mutated code will either not reach here or reach with error
      if (!errorEmitted) {
        done();
      }
    });

    // Safety timeout
    setTimeout(() => {
      if (!errorEmitted) {
        done(new Error('Test timed out - neither error nor load event'));
      }
    }, 200);
  });
});