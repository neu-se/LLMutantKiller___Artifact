import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('encoding mutation test', () => {
  const testFile = path.join(__dirname, 'test-encoding.dirty');
  const testData = { key: 'test', val: 'tëst' }; // Using non-ASCII character
  const expectedLine = `${JSON.stringify(testData)}\n`;

  beforeEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // Ignore error if file doesn't exist
    }
  });

  afterEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // Ignore error if file doesn't exist
    }
  });

  it('should write UTF-8 encoded data correctly', (done) => {
    const db = new Dirty(testFile);
    db.on('load', () => {
      db.set('test', 'tëst', () => {
        setTimeout(() => {
          const buffer = fs.readFileSync(testFile);
          // Verify the file is actually UTF-8 encoded by checking byte length
          const expectedByteLength = Buffer.byteLength(expectedLine, 'utf-8');
          expect(buffer.length).toBe(expectedByteLength);
          // Also verify content matches when read as UTF-8
          expect(buffer.toString('utf-8')).toBe(expectedLine);
          done();
        }, 100);
      });
    });
  }, 10000);
});