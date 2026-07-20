import { Dirty } from "../../../../../../../../../../../lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('test flush behavior with multiple writes', () => {
  const testFile = path.join(__dirname, 'test-flush-multiple.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should handle multiple writes correctly and emit drain', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      // Set multiple keys to trigger multiple writes
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.set('key3', 'value3');

      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // Verify all data was written correctly
          expect(db.get('key1')).toBe('value1');
          expect(db.get('key2')).toBe('value2');
          expect(db.get('key3')).toBe('value3');
          expect(db.size()).toBe(3);

          // Verify file contents
          const contents = fs.readFileSync(testFile, 'utf-8');
          const lines = contents.trim().split('\n');
          expect(lines.length).toBe(3);

          // Verify each line is valid JSON
          lines.forEach(line => {
            const parsed = JSON.parse(line);
            expect(parsed).toHaveProperty('key');
            expect(parsed).toHaveProperty('val');
          });

          done();
        }
      });
    });
  });
});