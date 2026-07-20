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

  it('should handle chunks without newlines correctly', (done) => {
    const testData = { key: 'testKey', val: 'testValue' };
    fs.writeFileSync(dbPath, JSON.stringify(testData), 'utf-8');

    const db = new Dirty(dbPath);
    let loadCalled = false;
    let errorCalled = false;

    db.on('load', () => {
      loadCalled = true;
      if (errorCalled) {
        done(new Error('Both load and error events were emitted'));
      }
    });

    db.on('error', (err) => {
      errorCalled = true;
      if (loadCalled) {
        done(new Error('Both load and error events were emitted'));
      } else {
        done(err);
      }
    });

    // Set a timeout to ensure the test completes
    setTimeout(() => {
      if (!loadCalled && !errorCalled) {
        done(new Error('Neither load nor error event was emitted'));
      } else if (loadCalled && !errorCalled) {
        done();
      }
    }, 100);
  });
});