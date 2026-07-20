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
    // Create a file with ISO-8859-1 encoding that contains invalid UTF-8 sequences
    const testData = Buffer.from('{"key":"test","val":"caf\xE9"}', 'binary');
    fs.writeFileSync(testFile, testData);

    const db = new Dirty(testFile);
    let loadCalled = false;

    db.on('load', () => {
      loadCalled = true;
    });

    db.on('error', (err) => {
      try {
        expect(err).toBeDefined();
        expect(loadCalled).toBe(false);
        done();
      } catch (error) {
        done(error);
      }
    });

    // Set timeout to fail test if neither event fires
    setTimeout(() => {
      if (!loadCalled) {
        done(new Error('Test timed out waiting for events'));
      }
    }, 1000);
  });
});