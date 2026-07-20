import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Readable } from 'stream';

describe('Dirty error event emission on read stream error', () => {
  it('should emit "error" event for non-ENOENT read stream errors', (done) => {
    const tmpDir = os.tmpdir();
    const testFile = path.join(tmpDir, `dirty-spy-test-${Date.now()}.dirty`);

    // Create the file so both read and write streams can open
    fs.writeFileSync(testFile, '', 'utf-8');

    // Spy on createReadStream to return a stream that emits a non-ENOENT error
    const originalCreateReadStream = fs.createReadStream;
    let fakeStream: Readable | null = null;

    jest.spyOn(fs, 'createReadStream').mockImplementationOnce((...args: any[]) => {
      fakeStream = new Readable({ read() {} });
      (fakeStream as any).destroy = function(err?: Error) {
        this.emit('close');
      };
      return fakeStream as unknown as fs.ReadStream;
    });

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

    const db = new Dirty(testFile);

    let errorEventFired = false;
    let emptyEventFired = false;

    db.on('error', (err: Error) => {
      errorEventFired = true;
    });

    db.on('', () => {
      emptyEventFired = true;
    });

    // Emit a non-ENOENT error from the fake read stream
    setImmediate(() => {
      if (fakeStream) {
        const err = Object.assign(new Error('EIO: i/o error'), { code: 'EIO' });
        fakeStream.emit('error', err);
      }
    });

    setTimeout(() => {
      jest.restoreAllMocks();
      try { fs.unlinkSync(testFile); } catch (e) { /* ignore */ }

      // Original: emits 'error' -> errorEventFired = true
      // Mutant: emits '' -> errorEventFired = false, emptyEventFired = true
      expect(errorEventFired).toBe(true);
      expect(emptyEventFired).toBe(false);
      done();
    }, 500);
  });
});