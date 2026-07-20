import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database error handling', () => {
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

  it('should emit error event when encountering corrupted data during load', (done) => {
    // Create a corrupted database file with invalid JSON
    fs.writeFileSync(dbPath, '{"key":"test","val":"value"\n{"invalid":json\n');

    const db = new Dirty(dbPath);
    let errorEmitted = false;

    db.on('error', (err) => {
      if (errorEmitted) return;
      errorEmitted = true;
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toContain('Could not load corrupted row');
      done();
    });

    db.on('load', () => {
      if (!errorEmitted) {
        fail('Should emit error event when encountering corrupted data');
        done();
      }
    });
  });
});