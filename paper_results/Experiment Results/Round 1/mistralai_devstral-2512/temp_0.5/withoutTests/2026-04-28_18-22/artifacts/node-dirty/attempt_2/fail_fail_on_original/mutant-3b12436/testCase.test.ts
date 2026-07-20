import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database key validation', () => {
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

  it('should emit error when loading corrupted data without key field', (done) => {
    // Create a corrupted database file with a row missing the 'key' field
    const corruptedData = JSON.stringify({ val: "some value" }) + '\n';
    fs.writeFileSync(dbPath, corruptedData);

    const db = new Dirty(dbPath);

    db.on('error', (err) => {
      expect(err).toBeInstanceOf(Error);
      done();
    });

    db.on('load', () => {
      // This should not be reached if error is properly emitted
      done(new Error('Expected error event but got load event instead'));
    });
  });
});