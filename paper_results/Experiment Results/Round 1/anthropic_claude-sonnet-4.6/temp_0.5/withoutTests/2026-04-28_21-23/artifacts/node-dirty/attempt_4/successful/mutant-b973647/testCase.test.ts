import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty error event emission on read stream error', () => {
  it('should emit "error" event (not empty string) when a non-ENOENT read stream error occurs', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    fs.writeFileSync(dbPath, '', 'utf-8');

    const db = new Dirty(dbPath);
    const receivedEvents: string[] = [];

    db.on('error', (err: Error) => {
      receivedEvents.push('error');
    });

    db.on('', (err: Error) => {
      receivedEvents.push('empty_string');
    });

    db.once('load', () => {
      // Simulate a non-ENOENT error on the read stream
      const readStream = (db as any)._readStream;
      if (readStream) {
        const fakeError = new Error('Simulated read error');
        (fakeError as any).code = 'EIO';
        readStream.emit('error', fakeError);
      }

      // Close db to avoid open handles
      db.close();

      setImmediate(() => {
        try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}

        // Original code emits 'error', mutated code emits '' (empty string)
        expect(receivedEvents).toContain('error');
        expect(receivedEvents).not.toContain('empty_string');
        done();
      });
    });
  });
});