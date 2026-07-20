import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('mutant-b49a520 test', () => {
  const testFile = path.join(__dirname, 'test-mutant.dirty');

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

  it('should correctly handle partial data chunks during loading', (done) => {
    // Create a file with data that doesn't end with newline
    const testData = '{"key":"test","val":"data"}\n{"key":"test2","val":"data2"}';
    fs.writeFileSync(testFile, testData);

    const db = new Dirty(testFile);
    db.on('load', (size) => {
      expect(size).toBe(2);
      expect(db.get('test')).toBe('data');
      expect(db.get('test2')).toBe('data2');
      done();
    });
  });
});