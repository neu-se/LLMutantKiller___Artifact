import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('encoding mutation test', () => {
  const testFile = path.join(__dirname, 'test-encoding.dirty');
  const testData = { key: 'test', val: 'value' };
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

  it('should fail to write data with empty encoding', (done) => {
    const db = new Dirty(testFile);
    db.on('load', () => {
      db.set('test', 'value', (err) => {
        setTimeout(() => {
          try {
            const content = fs.readFileSync(testFile, 'utf-8');
            // If we get here, the file was written successfully with empty encoding
            // This should not happen with the original code
            done(new Error('File was written with empty encoding - mutation not detected'));
          } catch (e) {
            // Expected behavior: file should not be writable with empty encoding
            done();
          }
        }, 100);
      });
    });
  }, 10000);
});