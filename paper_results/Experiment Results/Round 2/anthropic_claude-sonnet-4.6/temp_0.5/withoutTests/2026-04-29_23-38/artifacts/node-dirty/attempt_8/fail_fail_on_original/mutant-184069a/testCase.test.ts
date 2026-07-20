import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { EventEmitter } from 'events';

describe('Dirty error handling for non-ENOENT read errors', () => {
  it('should emit error (not load) for non-ENOENT filesystem errors', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'testdb');

    // Fake read stream that emits a non-ENOENT error
    const fakeReadStream = new EventEmitter() as any;
    fakeReadStream.destroy = () => {};

    // Fake write stream that works fine
    const fakeWriteStream = new EventEmitter() as any;
    fakeWriteStream.write = () => true;
    fakeWriteStream.end = (cb?: () => void) => { if (cb) cb(); };
    fakeWriteStream.destroy = () => {};
    fakeWriteStream.cork = () => {};
    fakeWriteStream.uncork = () => {};

    const readStreamSpy = jest.spyOn(fs, 'createReadStream').mockReturnValue(fakeReadStream);
    const writeStreamSpy = jest.spyOn(fs, 'createWriteStream').mockReturnValue(fakeWriteStream as any);

    // Emit EACCES error asynchronously after Dirty attaches its listener
    process.nextTick(() => {
      const err: any = new Error('Permission denied');
      err.code = 'EACCES';
      fakeReadStream.emit('error', err);
    });

    const { Dirty } = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

    const db = new Dirty(dbPath);

    db.on('error', (err: Error) => {
      // Original code: emits error for non-ENOENT (EACCES)
      readStreamSpy.mockRestore();
      writeStreamSpy.mockRestore();
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done();
    });

    db.on('load', (count: number) => {
      // Mutated code: emits load(0) for ALL errors
      readStreamSpy.mockRestore();
      writeStreamSpy.mockRestore();
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(new Error(`Mutation detected: load(${count}) emitted for EACCES instead of error event`));
    });
  });
});