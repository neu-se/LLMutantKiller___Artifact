import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('empty line handling in database', () => {
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

  it('should handle empty lines in database file', (done) => {
    // Create a database file with an empty line
    const dbContent = '{"key":"test","val":"value"}\n\n{"key":"test2","val":"value2"}\n';
    fs.writeFileSync(testFile, dbContent, 'utf-8');

    const db = new Dirty(testFile);

    db.on('load', (length) => {
      try {
        // The original code should skip empty lines and load successfully
        expect(db.size()).toBe(2);
        expect(db.get('test')).toBe('value');
        expect(db.get('test2')).toBe('value2');
        done();
      } catch (error) {
        done(error);
      }
    });

    db.on('error', (error) => {
      done(error);
    });
  });
});