import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database encoding validation', () => {
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

  it('should fail when reading database with non-UTF-8 encoding', (done) => {
    // Create a file with UTF-8 content
    const testData = { key: 'test', val: { message: 'café' } };
    const fileContent = `${JSON.stringify(testData)}\n`;
    fs.writeFileSync(dbPath, fileContent, 'utf-8');

    // Create a proxy to simulate the mutant behavior
    const originalCreateReadStream = fs.createReadStream;
    fs.createReadStream = function(path: fs.PathLike, options?: fs.ReadStreamOptions) {
      if (path.toString() === dbPath) {
        // Simulate the mutant by not specifying encoding
        return originalCreateReadStream.call(this, path, {});
      }
      return originalCreateReadStream.call(this, path, options);
    };

    const db = new Dirty(dbPath);
    db.on('load', () => {
      // Restore original implementation
      fs.createReadStream = originalCreateReadStream;
      done(new Error('Should not have loaded successfully without UTF-8 encoding'));
    });

    db.on('error', (err) => {
      // Restore original implementation
      fs.createReadStream = originalCreateReadStream;
      expect(err).toBeDefined();
      db.close();
      done();
    });
  });
});