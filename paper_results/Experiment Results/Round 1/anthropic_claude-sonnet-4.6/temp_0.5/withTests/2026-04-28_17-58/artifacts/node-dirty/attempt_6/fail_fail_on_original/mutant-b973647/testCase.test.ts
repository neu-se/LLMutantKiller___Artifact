import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { EventEmitter } from 'events';
import { Readable } from 'stream';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('Dirty error event emission on read stream error', () => {
  it('should emit "error" event for non-ENOENT read stream errors', (done) => {
    const tmpDir = os.tmpdir();
    const testFile = path.join(tmpDir, `dirty-mock-test-${Date.now()}.dirty`);

    // Create the file so write stream opens fine
    fs.writeFileSync(testFile, '', 'utf-8');

    // Create a fake read stream that emits a non-ENOENT error
    const fakeReadStream = new Readable({ read() {} }) as fs.ReadStream;
    (fakeReadStream as any).destroy = (err?: Error) => { fakeReadStream.emit('close'); };
    (fakeReadStream as any).path = testFile;

    const originalCreateReadStream = fs.createReadStream;
    (fs as any).createReadStream = (filePath: string, opts: any) => {
      if (filePath === testFile) {
        // Restore immediately so write stream works normally
        (fs as any).createReadStream = originalCreateReadStream;
        return fakeReadStream;
      }
      return originalCreateReadStream.call(fs, filePath, opts);
    };

    const db = new Dirty(testFile);

    let errorEventFired = false;
    let emptyEventFired = false;

    db.on('error', (err: Error) => {
      errorEventFired = true;
    });

    db.on('', () => {
      emptyEventFired = true;
    });

    // Emit a non-ENOENT error from the fake read stream after listeners are attached
    setImmediate(() => {
      const err = Object.assign(new Error('EIO: i/o error'), { code: 'EIO' });
      fakeReadStream.emit('error', err);
    });

    setTimeout(() => {
      try { fs.unlinkSync(testFile); } catch (e) { /* ignore */ }

      // Original: emits 'error' -> errorEventFired = true
      // Mutant: emits '' -> errorEventFired = false, emptyEventFired = true
      expect(errorEventFired).toBe(true);
      expect(emptyEventFired).toBe(false);
      done();
    }, 500);
  });
});