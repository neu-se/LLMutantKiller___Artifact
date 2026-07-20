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

  it('should correctly read UTF-8 encoded data with multibyte characters', (done) => {
    // Write test data with UTF-8 encoding including multibyte characters
    const testData = '{"key":"test","val":"日本語"}';
    fs.writeFileSync(testFile, testData + '\n', 'utf-8');

    const db = new Dirty(testFile);
    db.on('load', (size) => {
      try {
        expect(size).toBe(1);
        expect(db.get('test')).toBe('日本語');
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});