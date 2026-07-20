import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database read stream encoding', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should fail to read database when encoding is not specified and file contains non-ASCII characters', (done) => {
    // Create a database file with non-ASCII characters
    const testData = { key: 'test', val: { message: 'café' } };
    fs.writeFileSync(dbPath, `${JSON.stringify(testData)}\n`, 'utf-8');

    // Temporarily modify the file to remove encoding option
    const originalFs = require('fs');
    const originalCreateReadStream = originalFs.createReadStream;
    originalFs.createReadStream = function(path, options) {
      if (path === dbPath) {
        return originalCreateReadStream.call(this, path, {});
      }
      return originalCreateReadStream.call(this, path, options);
    };

    const db = new Dirty(dbPath);
    db.on('load', () => {
      done(new Error('Should not have loaded successfully without encoding'));
    });

    db.on('error', (err) => {
      expect(err).toBeDefined();
      db.close();
      // Restore original implementation
      originalFs.createReadStream = originalCreateReadStream;
      done();
    });
  });
});