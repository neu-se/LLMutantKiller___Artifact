import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database encoding validation', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should fail to load database with non-UTF-8 encoded content when encoding is not specified', (done) => {
    // Create a file with binary content that isn't valid UTF-8
    const binaryData = Buffer.from([0x80, 0x81, 0x82, 0x0A]); // Invalid UTF-8 sequence
    fs.writeFileSync(dbPath, binaryData);

    const db = new Dirty(dbPath);
    db.on('load', () => {
      done(new Error('Should not have loaded successfully'));
    });

    db.on('error', (err) => {
      expect(err).toBeDefined();
      db.close();
      done();
    });
  });
});