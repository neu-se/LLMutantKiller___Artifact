import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('encoding mutation test', () => {
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

  it('should correctly read UTF-8 encoded data from file', (done) => {
    // Write test data with UTF-8 encoding
    const testData = '{"key":"test","val":"café"}';
    fs.writeFileSync(testFile, testData + '\n', 'utf-8');

    const db = new Dirty(testFile);
    db.on('load', (size) => {
      try {
        expect(size).toBe(1);
        expect(db.get('test')).toBe('café');
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});