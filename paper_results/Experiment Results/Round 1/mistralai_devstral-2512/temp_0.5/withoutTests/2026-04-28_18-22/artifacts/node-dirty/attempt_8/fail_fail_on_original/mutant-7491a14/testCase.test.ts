import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database encoding behavior', () => {
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

  it('should fail to read database when encoding is not specified and file contains multi-byte characters', (done) => {
    // Create a file with multi-byte UTF-8 characters
    const testData = { key: 'test', val: { message: 'café' } };
    const fileContent = `${JSON.stringify(testData)}\n`;
    fs.writeFileSync(dbPath, fileContent, 'utf-8');

    // Force the mutant behavior by temporarily removing encoding option
    const originalCreateReadStream = fs.createReadStream;
    fs.createReadStream = function(path: string, options?: any) {
      if (path === dbPath) {
        return originalCreateReadStream.call(this, path, {});
      }
      return originalCreateReadStream.call(this, path, options);
    };

    const db = new Dirty(dbPath);
    db.on('load', () => {
      // Restore original implementation
      fs.createReadStream = originalCreateReadStream;
      done(new Error('Should not have loaded successfully without encoding'));
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