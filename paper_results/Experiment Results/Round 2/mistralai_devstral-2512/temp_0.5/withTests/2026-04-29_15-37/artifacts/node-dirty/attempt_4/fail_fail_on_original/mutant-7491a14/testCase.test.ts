import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('encoding mutation test', () => {
  const testFile = path.join(__dirname, 'test-encoding.dirty');

  beforeEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // File doesn't exist, ignore error
    }
  });

  afterEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // File doesn't exist, ignore error
    }
  });

  it('should fail to read non-UTF8 encoded file when encoding is not specified', (done) => {
    // Create a file with non-UTF8 content
    const nonUtf8Content = Buffer.from([0x80, 0x81, 0x82, 0x0A]); // Invalid UTF-8 sequence
    fs.writeFileSync(testFile, nonUtf8Content);

    const db = new Dirty(testFile);
    db.on('error', (err) => {
      expect(err).toBeDefined();
      done();
    });

    db.on('load', () => {
      fail('Should not load successfully with invalid UTF-8 content');
      done();
    });
  }, 10000);
});