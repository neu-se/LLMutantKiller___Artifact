import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import { EventEmitter } from 'events';

describe('Dirty error handling for non-ENOENT read errors', () => {
  it('should emit error (not load) for non-ENOENT filesystem errors', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'testdb');

    const fsModule = require('fs');
    const originalCreateReadStream = fsModule.createReadStream;
    const originalCreateWriteStream = fsModule.createWriteStream;

    // Fake read stream that emits a non-ENOENT error
    const fakeReadStream = new EventEmitter() as any;
    fakeReadStream.destroy = () => {};

    // Fake write stream that works silently
    const fakeWriteStream = new EventEmitter() as any;
    fakeWriteStream.write = (_data: any, cb?: (err?: Error) => void) => { if (cb) cb(); return true; };
    fakeWriteStream.end = (cb?: () => void) => { if (cb) cb(); };
    fakeWriteStream.destroy = () => {};
    fakeWriteStream.cork = () => {};
    fakeWriteStream.uncork = () => {};

    Object.defineProperty(fsModule, 'createReadStream', {
      configurable: true, writable: true,
      value: (p: string, opts: any) => {
        if (p === dbPath) {
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

    Object.defineProperty(fsModule, 'createWriteStream', {
      configurable: true, writable: true,
      value: (p: string, opts: any) => {
        if (p === dbPath) return fakeWriteStream;
        return originalCreateWriteStream(p, opts);
      },
    });

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(dbPath);

    const restore = () => {
      Object.defineProperty(fsModule, 'createReadStream', { configurable: true, writable: true, value: originalCreateReadStream });
      Object.defineProperty(fsModule, 'createWriteStream', { configurable: true, writable: true, value: originalCreateWriteStream });
      fs.rmSync(tmpDir, { recursive: true, force: true });
    };

    db.on('error', () => {
      restore();
      done();
    });

    db.on('load', (count: number) => {
      restore();
      done(new Error(`Mutation detected: load(${count}) emitted for EACCES instead of error event`));
    });
  });
});