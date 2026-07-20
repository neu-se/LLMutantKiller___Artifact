import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('test flush behavior with multiple writes', () => {
  const testFile = path.join(__dirname, 'test-flush-multiple.dirty');

  beforeEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  afterEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  it('should write all queued items to disk when flush is called', (done) => {
    const db = new Dirty(testFile);

    db.on('load', () => {
      // Set multiple key-value pairs
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.set('key3', 'value3');

      db.on('drain', () => {
        // Verify all items were written to disk
        const contents = fs.readFileSync(testFile, 'utf-8');
        const lines = contents.trim().split('\n');

        // Should have exactly 3 lines (one for each key-value pair)
        expect(lines.length).toBe(3);

        // Verify each line contains the expected key-value pair
        const expectedPairs = [
          { key: 'key1', val: 'value1' },
          { key: 'key2', val: 'value2' },
          { key: 'key3', val: 'value3' }
        ];

        lines.forEach((line, index) => {
          const parsed = JSON.parse(line);
          expect(parsed).toEqual(expectedPairs[index]);
        });

        done();
      });
    });
  });
});