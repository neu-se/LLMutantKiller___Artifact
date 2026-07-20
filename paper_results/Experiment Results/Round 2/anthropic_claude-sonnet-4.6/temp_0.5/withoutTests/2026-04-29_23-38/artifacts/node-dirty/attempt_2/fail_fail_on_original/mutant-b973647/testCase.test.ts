import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty error event on read stream error', () => {
  it('should emit "error" event with the correct event name when a non-ENOENT read stream error occurs', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-test-${Date.now()}.db`);

    // Write some content to the file first so it exists
    fs.writeFileSync(dbPath, '{"key":"test","val":"value"}\n', 'utf-8');

    const db = new Dirty(dbPath);

    // Track all emitted event names
    const emittedEvents: string[] = [];
    const originalEmit = db.emit.bind(db);
    db.emit = function(event: string, ...args: any[]) {
      emittedEvents.push(event);
      return originalEmit(event, ...args);
    };

    // Listen to 'error' to prevent uncaught exception
    db.on('error', () => {});
    // Listen to '' to prevent uncaught exception in mutated code
    db.on('', () => {});

    db.on('load', () => {
      // After load, simulate triggering the error path by manually
      // invoking what would happen with a non-ENOENT error
      // We do this by directly calling the internal error handler logic
      // Instead, let's check the emit behavior by looking at what events fired during load
      
      try {
        fs.unlinkSync(dbPath);
      } catch (e) {}

      // The mutation changes emit('error', err) to emit('', err)
      // We need to trigger the non-ENOENT error path
      // Let's create a new db instance with a path that causes a non-ENOENT error
      // by making a directory with the same name (so open fails with EISDIR)
      const dirPath = path.join(tmpDir, `dirty-dir-${Date.now()}`);
      fs.mkdirSync(dirPath);

      const emittedEvents2: string[] = [];
      const db2 = new Dirty(dirPath);
      const origEmit2 = db2.emit.bind(db2);
      db2.emit = function(event: string, ...args: any[]) {
        emittedEvents2.push(event);
        return origEmit2(event, ...args);
      };

      // Prevent uncaught exceptions
      db2.on('error', () => {});
      db2.on('', () => {});

      setTimeout(() => {
        try {
          fs.rmdirSync(dirPath);
        } catch (e) {}

        // In original code: 'error' should be emitted
        // In mutated code: '' should be emitted instead
        expect(emittedEvents2).toContain('error');
        expect(emittedEvents2).not.toContain('');
        done();
      }, 500);
    });
  });
});