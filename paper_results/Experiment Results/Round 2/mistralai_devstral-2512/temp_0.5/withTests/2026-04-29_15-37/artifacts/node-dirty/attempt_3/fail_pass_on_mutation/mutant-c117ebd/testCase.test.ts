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

  it('should write data with UTF-8 encoding', (done) => {
    const db = new Dirty(testFile);
    db.on('load', () => {
      db.set('test', 'value', () => {
        setTimeout(() => {
          const content = fs.readFileSync(testFile, 'utf-8');
          expect(content).toBe(expectedLine);
          done();
        }, 100);
      });
    });
  }, 10000);
});