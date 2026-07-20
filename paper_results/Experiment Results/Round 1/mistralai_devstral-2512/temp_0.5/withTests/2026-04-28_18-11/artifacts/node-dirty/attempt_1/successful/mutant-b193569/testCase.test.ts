import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('test-load-event-with-corrupted-data', () => {
  const testFile = path.join(__dirname, 'test-corrupted.dirty');
  const db = new Dirty(testFile);

  beforeAll(() => {
    // Create a test file with corrupted data (incomplete row at the end)
    fs.writeFileSync(testFile, '{"key":"test","val":"data"}\n{"key":"incomplete');
  });

  afterAll(() => {
    rimraf.sync(testFile);
  });

  it('should emit error event when loading corrupted data', (done) => {
    db.on('error', (err) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toContain('Corrupted row at the end of the db');
      done();
    });
  });
});