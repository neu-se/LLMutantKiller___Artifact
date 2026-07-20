import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty database encoding mutation', () => {
  it('should fail when write stream encoding is empty', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      const testKey = 'test';
      const testValue = { data: 'test' };

      db.set(testKey, testValue, (err) => {
        expect(err).toBeNull();

        // Force flush by checking write stream state
        const writeStream = (db as any)._writeStream;
        expect(writeStream).not.toBeNull();

        // Check the actual encoding used by the write stream
        const actualEncoding = writeStream.writableEncoding;
        expect(actualEncoding).toBe('utf-8');

        db.close();

        fs.unlinkSync(dbPath);
        fs.rmdirSync(testDir);
        done();
      });
    });
  });
});