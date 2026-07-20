import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database empty line handling', () => {
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

  it('should emit error when encountering empty lines in database file', (done) => {
    // Create a database file with an empty line
    fs.writeFileSync(dbPath, '{"key":"test","val":"value"}\n\n{"key":"test2","val":"value2"}\n', 'utf-8');

    const db = new Dirty(dbPath);
    let errorEmitted = false;

    db.on('error', (error) => {
      errorEmitted = true;
      expect(error.message).toBe('Empty lines never appear in a healthy database');
      done();
    });

    db.on('load', () => {
      if (!errorEmitted) {
        done(new Error('Expected error event but got load event instead'));
      }
    });
  });
});