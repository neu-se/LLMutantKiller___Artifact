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

  it('should correctly read file with UTF-8 encoding and handle empty lines', (done) => {
    // Write test data with UTF-8 encoding including an empty line
    const testData = '{"key":"test","val":"value"}\n\n{"key":"test2","val":"value2"}';
    fs.writeFileSync(testFile, testData + '\n', 'utf-8');

    const db = new Dirty(testFile);
    db.on('load', (size) => {
      try {
        expect(size).toBe(2);
        expect(db.get('test')).toBe('value');
        expect(db.get('test2')).toBe('value2');
        done();
      } catch (error) {
        done(error);
      }
    });

    db.on('error', (err) => {
      done(new Error(`Unexpected error: ${err.message}`));
    });
  });
});