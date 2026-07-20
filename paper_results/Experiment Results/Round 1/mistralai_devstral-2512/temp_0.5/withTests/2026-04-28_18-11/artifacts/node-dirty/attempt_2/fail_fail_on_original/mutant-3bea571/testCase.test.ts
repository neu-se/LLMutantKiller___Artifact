import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('error event emission', () => {
  const testFile = path.join(__dirname, 'test-empty-line.dirty');
  let db: any;

  beforeEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  afterEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  it('should emit error event with correct event name when empty line is encountered', (done) => {
    fs.writeFileSync(testFile, '\n{"key":"test","val":"value"}\n', 'utf-8');

    db = new Dirty(testFile);

    let errorEmitted = false;
    let loadEmitted = false;

    db.on('error', (err: Error) => {
      errorEmitted = true;
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe('Empty lines never appear in a healthy database');
    });

    db.on('load', () => {
      loadEmitted = true;
    });

    setTimeout(() => {
      try {
        expect(errorEmitted).toBe(true);
        expect(loadEmitted).toBe(false);
        done();
      } catch (e) {
        done(e);
      }
    }, 100);
  });
});