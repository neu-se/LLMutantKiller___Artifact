import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('close method behavior with in-flight writes', () => {
  const testFile = path.join(__dirname, 'test-close.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should delay close until in-flight writes complete', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Trigger multiple writes to create in-flight writes
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.set('key3', 'value3');

      // Immediately call close while writes are in flight
      db.close();

      // The close should be delayed until drain event
      db.on('write_close', () => {
        // Verify the file was properly written
        const content = fs.readFileSync(testFile, 'utf-8');
        const lines = content.trim().split('\n');
        expect(lines.length).toBe(3);

        // Verify all writes completed
        const db2 = new Dirty(testFile);
        db2.on('load', (size) => {
          expect(size).toBe(3);
          expect(db2.get('key1')).toBe('value1');
          expect(db2.get('key2')).toBe('value2');
          expect(db2.get('key3')).toBe('value3');
          db2.close();
          done();
        });
      });
    });
  });
});