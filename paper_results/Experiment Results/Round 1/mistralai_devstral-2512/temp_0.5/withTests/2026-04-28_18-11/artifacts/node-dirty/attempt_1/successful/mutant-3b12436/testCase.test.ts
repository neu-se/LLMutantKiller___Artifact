import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('test-corrupted-row-without-key', () => {
  const testFile = path.join(__dirname, 'test-corrupted.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
    fs.writeFileSync(testFile, '{"val":"somevalue"}\n');
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should emit error when loading a row without key', (done) => {
    db = new Dirty(testFile);
    db.on('error', (err) => {
      expect(err).toBeInstanceOf(Error);
      done();
    });
  });
});