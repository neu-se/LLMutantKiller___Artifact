import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { EventEmitter } from 'events';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty error event emission on read stream error', () => {
  it('should emit "error" event when a non-ENOENT read stream error occurs', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Write valid content so the file exists and is readable
    fs.writeFileSync(dbPath, '', 'utf-8');

    const db = new Dirty(dbPath);
    const receivedEvents: string[] = [];

    db.on('error', (err: Error) => {
      receivedEvents.push('error');
    });

    db.on('', (err: Error) => {
      receivedEvents.push('empty_string');
    });

    db.on('load', () => {
      // Now manually emit an error on the read stream to simulate a non-ENOENT error
      // We need to trigger the error handler in _load
      // The readStream is set to null after close, but we can simulate via the db itself
      
      // Instead, let's directly test by emitting error on the db and checking behavior
      // Actually let's just verify the db properly re-emits errors from the read stream
      // by triggering the internal _readStream error event
      const readStream = (db as any)._readStream;
      if (readStream) {
        const fakeError = new Error('Simulated read error');
        (fakeError as any).code = 'EIO'; // Not ENOENT
        readStream.emit('error', fakeError);
      }

      setTimeout(() => {
        try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}

        // Original code: 'error' event emitted
        // Mutated code: '' (empty string) event emitted
        expect(receivedEvents).toContain('error');
        expect(receivedEvents).not.toContain('empty_string');
        done();
      }, 200);
    });

    setTimeout(() => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
      done(new Error('Timed out waiting for load event'));
    }, 2000);
  });
});