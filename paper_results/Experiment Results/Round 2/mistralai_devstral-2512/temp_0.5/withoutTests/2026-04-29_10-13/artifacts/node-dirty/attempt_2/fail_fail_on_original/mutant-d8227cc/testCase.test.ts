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

  it('should process data chunk without newline correctly', (done) => {
    const db = new Dirty(dbPath);
    const testData = { key: 'testKey', val: 'testValue' };

    db.on('load', () => {
      // Write data without newline to trigger the chunk processing
      fs.writeFileSync(dbPath, JSON.stringify(testData), 'utf-8');

      // Create new instance to process the file
      const db2 = new Dirty(dbPath);
      db2.on('load', () => {
        // The database should process the chunk and not emit error
        // The original code will process it correctly, mutated code will fail
        done();
      });

      db2.on('error', (err) => {
        done(err);
      });
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});