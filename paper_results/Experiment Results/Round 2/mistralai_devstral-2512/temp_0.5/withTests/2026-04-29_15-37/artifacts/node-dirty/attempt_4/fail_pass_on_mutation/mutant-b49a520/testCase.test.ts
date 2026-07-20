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
    // Create a file with data that doesn't end with newline
    const testData = '{"key":"test","val":"data"}';
    fs.writeFileSync(testFile, testData);

    const db = new Dirty(testFile);
    db.on('error', (err) => {
      expect(err.message).toContain('Corrupted row at the end of the db');
      done();
    });
  });
});