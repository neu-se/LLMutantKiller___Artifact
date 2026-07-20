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

  it('should correctly handle binary data in file', (done) => {
    // Create a file with binary data that would fail without proper encoding
    const binaryData = Buffer.from([0x80, 0x81, 0x82, 0x83]);
    fs.writeFileSync(testFile, binaryData);

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
      done(new Error('Expected error event for binary data but got load event'));
    });
  });
});