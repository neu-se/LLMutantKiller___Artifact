import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('encoding mutation test', () => {
  const testFile = path.join(__dirname, 'test-encoding.dirty');
  const testData = { key: 'test', val: 'café' };

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should correctly handle UTF-8 encoded data', (done) => {
    const db = new Dirty(testFile);
    db.on('load', () => {
      db.set(testData.key, testData.val, () => {
        db.on('drain', () => {
          const content = fs.readFileSync(testFile, 'utf-8');
          const lines = content.trim().split('\n');
          expect(lines.length).toBe(1);
          const parsed = JSON.parse(lines[0]);
          expect(parsed).toEqual(testData);
          done();
        });
      });
    });
  });
});