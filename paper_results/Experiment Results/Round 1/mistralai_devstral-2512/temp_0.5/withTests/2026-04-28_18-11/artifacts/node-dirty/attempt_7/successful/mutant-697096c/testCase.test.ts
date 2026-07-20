import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('database empty line handling', () => {
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

  it('should emit error when encountering empty lines in database file', (done) => {
    // Create a database file with an empty line
    const dbContent = '{"key":"test","val":"value"}\n\n{"key":"test2","val":"value2"}\n';
    fs.writeFileSync(testFile, dbContent, 'utf-8');

    const db = new Dirty(testFile);
    let errorCount = 0;

    db.on('error', (error) => {
      errorCount++;
      if (errorCount === 1) {
        expect(error.message).toBe('Empty lines never appear in a healthy database');
      }
    });

    db.on('load', (length) => {
      try {
        // In original code, we should get an error before load
        expect(errorCount).toBeGreaterThan(0);
        done();
      } catch (error) {
        done(error);
      }
    });

    // Set a timeout to fail the test if neither event fires
    setTimeout(() => {
      try {
        expect(errorCount).toBeGreaterThan(0);
        done();
      } catch (error) {
        done(error);
      }
    }, 100);
  });
});