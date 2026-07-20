import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database chunk processing', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should correctly process chunks without newlines', (done) => {
    const db = new Dirty(dbPath);
    db.on('load', () => {
      db.set('testKey', { value: 'testValue' }, (err) => {
        if (err) return done(err);

        // Read the file and verify it was written correctly
        const data = fs.readFileSync(dbPath, 'utf-8');
        const lines = data.trim().split('\n');
        expect(lines.length).toBe(1);

        const parsed = JSON.parse(lines[0]);
        expect(parsed.key).toBe('testKey');
        expect(parsed.val).toEqual({ value: 'testValue' });

        // Now test reading back a chunk without newline
        const testChunk = '{"key":"testKey2","val":{"value":"testValue2"}}';
        db._readStream.emit('data', testChunk);

        // The original code should not process this chunk (no newline)
        // The mutated code will incorrectly process it (empty string check)
        setImmediate(() => {
          expect(db.get('testKey2')).toBeUndefined();
          db.close();
          done();
        });
      });
    });
  });
});