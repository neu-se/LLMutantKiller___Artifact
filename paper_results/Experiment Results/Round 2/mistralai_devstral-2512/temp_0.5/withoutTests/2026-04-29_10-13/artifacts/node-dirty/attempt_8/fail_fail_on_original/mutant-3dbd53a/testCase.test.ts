import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty database encoding mutation', () => {
  it('should fail when write stream encoding is empty string', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      const testKey = 'test';
      const testValue = { data: 'test' };

      db.set(testKey, testValue, (err: Error | null) => {
        expect(err).toBeNull();

        // Access the internal write stream to check its encoding
        const writeStream = (db as any)._writeStream;
        expect(writeStream).toBeDefined();

        // The mutation changes encoding from 'utf-8' to ''
        // This will cause the stream to use default encoding (buffer)
        // which will fail our UTF-8 validation
        const encoding = writeStream.writableEncoding;
        expect(encoding).toBe('utf-8');

        db.close();

        fs.unlinkSync(dbPath);
        fs.rmdirSync(testDir);
        done();
      });
    });
  });
});