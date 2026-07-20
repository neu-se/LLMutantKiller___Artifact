import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/dirty.js";
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

  it('should emit error event when empty line is encountered', (done) => {
    fs.writeFileSync(testFile, '\n{"key":"test","val":"value"}\n', 'utf-8');

    db = new Dirty(testFile);

    let errorEventName: string | null = null;
    let errorMessage: string | null = null;

    db.on('error', (err: Error) => {
      errorEventName = 'error';
      errorMessage = err.message;
    });

    db.on('', (err: Error) => {
      errorEventName = '';
      errorMessage = err.message;
    });

    setTimeout(() => {
      try {
        expect(errorEventName).toBe('error');
        expect(errorMessage).toBe('Empty lines never appear in a healthy database');
        done();
      } catch (e) {
        done(e);
      }
    }, 100);
  });
});