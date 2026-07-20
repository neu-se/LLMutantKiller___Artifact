import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('database file validation', () => {
  const testFile = path.join(__dirname, 'tmp', 'validation-test.dirty');
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

  it('should skip empty lines without error', (done) => {
    // Create a database file with an empty line
    const dbContent = '{"key":"test","val":"value"}\n\n{"key":"test2","val":"value2"}\n';
    fs.writeFileSync(testFile, dbContent, 'utf-8');

    const db = new Dirty(testFile);
    let hasError = false;

    db.on('error', (error) => {
      hasError = true;
      done(new Error(`Unexpected error: ${error.message}`));
    });

    db.on('load', (length) => {
      try {
        expect(hasError).toBe(false);
        expect(db.size()).toBe(2);
        expect(db.get('test')).toBe('value');
        expect(db.get('test2')).toBe('value2');
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});