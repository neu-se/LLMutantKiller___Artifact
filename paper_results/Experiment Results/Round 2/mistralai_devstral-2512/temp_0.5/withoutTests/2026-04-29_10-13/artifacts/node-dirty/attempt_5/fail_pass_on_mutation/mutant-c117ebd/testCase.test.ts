import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty encoding mutation test', () => {
  it('should fail when reading multi-byte UTF-8 characters with incorrect encoding', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');

    // Pre-create a file with multi-byte UTF-8 characters
    const testData = '{"key":"testKey","val":{"data":"日本語"}}';
    fs.writeFileSync(dbPath, testData + '\n', 'utf-8');

    const db = new Dirty(dbPath);
    db.on('load', () => {
      const retrievedValue = db.get('testKey');
      expect(retrievedValue).toEqual({ data: '日本語' });

      // Clean up
      db.close();
      fs.unlinkSync(dbPath);
      fs.rmdirSync(testDir);
      done();
    });
  });
});