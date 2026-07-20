import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('test-load-event-with-corrupted-data', () => {
  const testFile = path.join(__dirname, 'tmp', 'corrupted.dirty');
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

  it('should emit error event when corrupted data exists at end of file', (done) => {
    // Create a file with valid data followed by corrupted data (no newline at end)
    const validData = '{"key":"test","val":"value"}\n';
    const corruptedData = '{"key":"corrupted","val":"data"'; // Missing closing brace and newline
    fs.writeFileSync(testFile, validData + corruptedData, 'utf-8');

    const db = new Dirty(testFile);
    let errorEmitted = false;

    db.on('error', (err) => {
      errorEmitted = true;
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toContain('Corrupted row at the end of the db');
      done();
    });

    // Ensure test fails if error event is not emitted
    setTimeout(() => {
      if (!errorEmitted) {
        done(new Error('Error event was not emitted for corrupted data'));
      }
    }, 1000);
  });
});