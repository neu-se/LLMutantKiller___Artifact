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

  it('should detect and handle empty lines in database file', (done) => {
    // Create a database file with an empty line
    const dbContent = '{"key":"test","val":"value"}\n\n{"key":"test2","val":"value2"}\n';
    fs.writeFileSync(testFile, dbContent, 'utf-8');

    const db = new Dirty(testFile);
    let errorReceived = false;
    let loadReceived = false;

    db.on('error', (error) => {
      errorReceived = true;
      expect(error.message).toBe('Empty lines never appear in a healthy database');
      // Don't call done here - we need to verify load doesn't happen
    });

    db.on('load', (length) => {
      loadReceived = true;
      // If we get here, the mutation is present (empty lines are not detected)
      try {
        expect(errorReceived).toBe(true);
        expect(loadReceived).toBe(false);
        done();
      } catch (error) {
        done(error);
      }
    });

    // Set a timeout to fail the test if neither event fires
    setTimeout(() => {
      try {
        expect(errorReceived).toBe(true);
        expect(loadReceived).toBe(false);
        done();
      } catch (error) {
        done(error);
      }
    }, 100);
  });
});