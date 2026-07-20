import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { EventEmitter } from 'events';

describe('Dirty error handling for non-ENOENT read errors', () => {
  it('should emit error (not load) for non-ENOENT filesystem errors', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'testdb');
    // Create a real file so writeStream succeeds
    fs.writeFileSync(dbPath, '');

    // Mock fs.createReadStream to emit a non-ENOENT error
    const originalCreateReadStream = fs.createReadStream;
    const fakeReadStream = new EventEmitter() as any;
    fakeReadStream.destroy = () => {};

    (fs as any).createReadStream = (p: string, opts: any) => {
      if (p === dbPath) {
        // Emit EACCES error asynchronously
        process.nextTick(() => {
          const err: any = new Error('Permission denied');
          err.code = 'EACCES';
          fakeReadStream.emit('error', err);
        });
        return fakeReadStream;
      }
      return originalCreateReadStream(p, opts);
    };

    const { Dirty } = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

    const db = new Dirty(dbPath);

    db.on('error', (err: Error) => {
      // Original code: emits error for non-ENOENT (EACCES)
      (fs as any).createReadStream = originalCreateReadStream;
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done();
    });

    db.on('load', (count: number) => {
      // Mutated code: emits load(0) for ALL errors
      (fs as any).createReadStream = originalCreateReadStream;
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(new Error(`Mutation detected: load(${count}) emitted for EACCES instead of error event`));
    });
  });
});