import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database file loading', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterAll(() => {
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
    }
    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir);
    }
  });

  it('should not process incomplete lines when no newline is present', (done) => {
    // Create a test database file with an incomplete line (no trailing newline)
    const testData = '{"key":"testKey","val":"testValue"}';
    fs.writeFileSync(dbPath, testData);

    const db = new Dirty(dbPath);
    let loadEventFired = false;

    db.on('load', (size) => {
      loadEventFired = true;
      // The original code should not process the incomplete line
      // and should emit load with size 0
      expect(size).toBe(0);
      done();
    });

    db.on('error', (err) => {
      if (!loadEventFired) {
        done.fail(`Unexpected error: ${err.message}`);
      }
    });

    // Add a timeout to prevent hanging
    setTimeout(() => {
      if (!loadEventFired) {
        done.fail('Load event was not fired within expected time');
      }
    }, 1000);
  });
});