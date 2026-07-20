import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('file read stream encoding test', () => {
  const testDir = path.join(__dirname, 'tmp');
  const testFile = path.join(testDir, 'encoding-test.dirty');

  beforeAll(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should fail to read file when encoding is not specified', (done) => {
    // Create a test file with UTF-8 content
    const testData = '{"key":"test","val":"value"}';
    fs.writeFileSync(testFile, testData + '\n', 'utf-8');

    const db = new Dirty(testFile);
    db.on('error', (err) => {
      try {
        expect(err).toBeDefined();
        done();
      } catch (error) {
        done(error);
      }
    });

    db.on('load', () => {
      done(new Error('Expected error event but got load event'));
    });
  });
});