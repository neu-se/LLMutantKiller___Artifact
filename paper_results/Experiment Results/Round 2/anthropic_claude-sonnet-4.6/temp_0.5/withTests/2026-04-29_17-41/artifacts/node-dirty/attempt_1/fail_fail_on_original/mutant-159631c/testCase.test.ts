import { EventEmitter } from 'events';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('read_close event after load', () => {
  it('should emit read_close event after the read stream finishes loading', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const file = path.join(tmpDir, 'test.dirty');

    // Write some initial data to the file so a read stream is created
    fs.writeFileSync(file, JSON.stringify({ key: 'hello', val: 'world' }) + '\n', 'utf-8');

    const db = new Dirty(file);

    let readCloseFired = false;

    db.on('read_close', () => {
      readCloseFired = true;
    });

    db.on('load', () => {
      // After load, the read stream should have closed and emitted read_close
      // Use setImmediate to allow any pending close events to fire
      setImmediate(() => {
        try {
          fs.unlinkSync(file);
          fs.rmdirSync(tmpDir);
        } catch (e) { /* ignore cleanup errors */ }
        expect(readCloseFired).toBe(true);
        done();
      });
    });
  });
});