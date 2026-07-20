import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('mutant-b49a520 test', () => {
  const testFile = path.join(__dirname, 'test-mutant.dirty');
  const testData = '{"key":"test","val":"data"}\n{"key":"test2","val":"data2"}';

  beforeEach(() => {
    rimraf.sync(testFile);
    fs.writeFileSync(testFile, testData);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should correctly handle chunks without newlines during loading', (done) => {
    const db = new Dirty(testFile);
    db.on('load', (size) => {
      expect(size).toBe(2);
      expect(db.get('test')).toBe('data');
      expect(db.get('test2')).toBe('data2');
      done();
    });
  });
});