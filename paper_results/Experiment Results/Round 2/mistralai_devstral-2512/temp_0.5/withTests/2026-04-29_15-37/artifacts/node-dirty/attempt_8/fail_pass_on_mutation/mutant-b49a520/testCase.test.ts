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

  it('should correctly handle empty data chunks during loading', (done) => {
    // Create an empty file
    fs.writeFileSync(testFile, '');

    const db = new Dirty(testFile);
    db.on('load', (size) => {
      expect(size).toBe(0);
      done();
    });
  });
});