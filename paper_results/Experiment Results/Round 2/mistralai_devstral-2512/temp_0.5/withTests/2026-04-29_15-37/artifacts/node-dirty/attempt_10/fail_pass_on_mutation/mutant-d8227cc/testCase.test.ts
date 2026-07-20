import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('test newline detection in data chunks', () => {
  const testFile = path.join(__dirname, 'test-newline.dirty');

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

  it('should correctly handle chunks with newlines during streaming', (done) => {
    // Create initial file with complete line
    fs.writeFileSync(testFile, '{"key":"test1","val":"data1"}\n', 'utf-8');

    const db = new Dirty(testFile);
    db.on('load', () => {
      // Now append data with newline to test the chunk processing
      const writeStream = fs.createWriteStream(testFile, { flags: 'a', encoding: 'utf-8' });
      writeStream.write('{"key":"test2","val":"data2"}\n', () => {
        writeStream.end();

        // Reopen to trigger the load with our test data
        const db2 = new Dirty(testFile);
        db2.on('load', (size) => {
          // Original code should handle this correctly
          expect(size).toBe(2); // Both complete lines should be loaded
          done();
        });
      });
    });
  });
});