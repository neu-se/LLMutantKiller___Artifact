import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('file read stream encoding test', () => {
  const testDir = path.join(__dirname, 'tmp');
  const testFile = path.join(testDir, 'encoding-test.dirty');

  beforeAll(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterAll(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir);
    }
  });

  it('should fail to read file with non-UTF8 encoding when encoding is not specified', (done) => {
    // Create a file with ISO-8859-1 encoding
    const testData = Buffer.from('{"key":"test","val":"café"}', 'latin1');
    fs.writeFileSync(testFile, testData);

    const db = new Dirty(testFile);
    let hasError = false;

    db.on('error', (err) => {
      hasError = true;
      try {
        expect(err).toBeDefined();
        done();
      } catch (error) {
        done(error);
      }
    });

    db.on('load', () => {
      if (!hasError) {
        done(new Error('Expected error event for non-UTF8 encoding but got load event'));
      }
    });
  });
});