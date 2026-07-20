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

  it('should correctly handle data chunks without newlines during loading', (done) => {
    // Create a file with data that doesn't contain newlines
    const testData = '{"key":"test","val":"data"}{"key":"test2","val":"data2"}';
    fs.writeFileSync(testFile, testData);

    const db = new Dirty(testFile);
    db.on('error', (err) => {
      expect(err.message).toContain('Empty lines never appear in a healthy database');
      done();
    });
  });
});