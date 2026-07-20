import { EventEmitter } from 'events';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('Dirty corrupted row error event', () => {
  it('should emit "error" event (not empty string event) when a corrupted row is encountered', (done) => {
    const tmpDir = os.tmpdir();
    const tmpFile = path.join(tmpDir, `dirty-test-${Date.now()}.dirty`);

    // Write a file with a corrupted row (invalid JSON)
    fs.writeFileSync(tmpFile, 'this is not valid json\n', 'utf-8');

    const db = new Dirty(tmpFile);

    let errorEventFired = false;
    let emptyEventFired = false;

    db.on('error', (err: Error) => {
      errorEventFired = true;
    });

    db.on('', () => {
      emptyEventFired = true;
    });

    db.on('load', () => {
      try {
        fs.unlinkSync(tmpFile);
      } catch (e) { /* ignore */ }

      // In original code: 'error' event is emitted with the corrupted row message
      // In mutated code: '' (empty string) event is emitted instead
      expect(errorEventFired).toBe(true);
      expect(emptyEventFired).toBe(false);
      done();
    });
  });
});