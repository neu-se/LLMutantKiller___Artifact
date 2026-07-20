import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('test data chunk processing', () => {
  const testFile = path.join(__dirname, 'test-chunk.dirty');
  const testData = '{"key":"test","val":"data"}';

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should process incomplete line chunks correctly', (done) => {
    const db = new Dirty(testFile);
    let loadFired = false;

    db.on('load', (length) => {
      loadFired = true;
      expect(length).toBe(1);
      expect(db.get('test')).toBe('data');
      done();
    });

    // Create a file with data that doesn't end with newline
    fs.writeFileSync(testFile, testData, 'utf-8');

    // Simulate a data event with chunk that doesn't contain newline
    // This should trigger the placeholder condition in the original code
    db._readStream.emit('data', testData);
    db._readStream.emit('end');
  });
});