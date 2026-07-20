import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('test-load-event-with-corrupted-data', () => {
  const testFile = path.join(__dirname, 'tmp', 'corrupted.dirty');
  const testDir = path.dirname(testFile);

  beforeAll(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should emit error event when corrupted data exists at end of file', (done) => {
    // Create a file with valid data followed by corrupted data (no newline at end)
    const validData = '{"key":"test","val":"value"}\n';
    const corruptedData = '{"key":"corrupted","val":"data"'; // Missing closing brace and newline
    fs.writeFileSync(testFile, validData + corruptedData, 'utf-8');

    const db = new Dirty(testFile);

    db.on('error', (err) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toContain('Corrupted row at the end of the db');
      done();
    });

    // Ensure test fails if error event is not emitted
    setTimeout(() => {
      done.fail('Error event was not emitted for corrupted data');
    }, 1000);
  });
});