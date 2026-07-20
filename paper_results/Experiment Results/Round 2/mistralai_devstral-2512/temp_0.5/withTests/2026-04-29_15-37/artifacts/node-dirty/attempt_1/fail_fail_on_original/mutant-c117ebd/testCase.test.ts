import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('encoding mutation test', () => {
  const testFile = path.join(__dirname, 'test-encoding.dirty');
  const testData = { key: 'test', val: 'value' };
  const expectedLine = `${JSON.stringify(testData)}\n`;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should write data with UTF-8 encoding', (done) => {
    const db = new Dirty(testFile);
    db.on('load', () => {
      db.set('test', 'value', () => {
        db.on('drain', () => {
          const content = fs.readFileSync(testFile, 'utf-8');
          expect(content).toBe(expectedLine);
          done();
        });
      });
    });
  });
});