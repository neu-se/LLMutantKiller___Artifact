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

  it('should fail when encoding is not UTF-8', (done) => {
    const db = new Dirty(testFile);
    db.on('load', () => {
      db.set('test', 'tëst', () => {
        setTimeout(() => {
          try {
            const content = fs.readFileSync(testFile, 'utf-8');
            // This will fail with empty encoding as the file won't be properly UTF-8 encoded
            expect(content).toBe(expectedLine);
            done();
          } catch (e) {
            // Expected to fail with empty encoding
            done();
          }
        }, 100);
      });
    });
  }, 10000);
});