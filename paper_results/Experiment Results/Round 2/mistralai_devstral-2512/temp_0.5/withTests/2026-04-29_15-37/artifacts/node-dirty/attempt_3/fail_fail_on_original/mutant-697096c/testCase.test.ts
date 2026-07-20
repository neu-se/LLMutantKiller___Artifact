import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Empty line handling in database file', () => {
  const testFile = path.join(__dirname, 'tmp', 'empty-line-test.dirty');
  const testDir = path.dirname(testFile);

  beforeAll(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterAll(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('should handle empty lines in database file without error', (done) => {
    // Create a test file with an empty line
    const testData = '{"key":"test","val":"value"}\n\n{"key":"test2","val":"value2"}\n';
    fs.writeFileSync(testFile, testData, 'utf-8');

    const db = new Dirty(testFile);

    db.on('load', (length) => {
      try {
        // Verify that the database loaded correctly despite the empty line
        expect(db.get('test')).toBe('value');
        expect(db.get('test2')).toBe('value2');
        expect(length).toBe(2);
        done();
      } catch (error) {
        done(error);
      }
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});