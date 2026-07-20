import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('error event emission', () => {
  const testFile = path.join(__dirname, 'test-empty-line.dirty');
  let db: Dirty;

  beforeEach(() => {
    // Clean up any existing test file
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  afterEach(() => {
    // Clean up test file
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  it('should emit error event with correct event name when empty line is encountered', (done) => {
    // Create a test file with an empty line
    fs.writeFileSync(testFile, '\n{"key":"test","val":"value"}\n', 'utf-8');

    db = new Dirty(testFile);

    // Listen for error event with specific event name
    db.on('error', (err) => {
      try {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('Empty lines never appear in a healthy database');
        done();
      } catch (e) {
        done(e);
      }
    });

    // Also listen for load event to ensure we don't get there
    db.on('load', () => {
      done(new Error('Should not emit load event when error occurs'));
    });
  });
});