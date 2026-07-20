import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import { EventEmitter } from 'events';

describe('Dirty error handling for non-ENOENT read errors', () => {
  it('should emit error (not load) for non-ENOENT filesystem errors', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'testdb');

    // Create the file so write stream succeeds
    fs.writeFileSync(dbPath, '');

    // Fake read stream that will emit a non-ENOENT error
    const fakeReadStream = new EventEmitter() as any;
    fakeReadStream.destroy = () => {};

    // Override createReadStream using Object.defineProperty
    const fsModule = require('fs');
    const originalCreateReadStream = fsModule.createReadStream;

    Object.defineProperty(fsModule, 'createReadStream', {
      configurable: true,
      writable: true,
      value: (p: string, opts: any) => {
        if (p === dbPath) {
          // Restore immediately so write stream uses real fs
          Object.defineProperty(fsModule, 'createReadStream', {
            configurable: true,
            writable: true,
            value: originalCreateReadStream,
          });
          process.nextTick(() => {
            const err: any = new Error('Permission denied');
            err.code = 'EACCES';
            fakeReadStream.emit('error', err);
          });
          return fakeReadStream;
        }
        return originalCreateReadStream(p, opts);
      },
    });

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

    const db = new Dirty(dbPath);

    db.on('error', (err: Error) => {
      // Original code: emits error for non-ENOENT (EACCES)
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done();
    });

    db.on('load', (count: number) => {
      // Mutated code: emits load(0) for ALL errors
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(new Error(`Mutation detected: load(${count}) emitted for EACCES instead of error event`));
    });
  });
});