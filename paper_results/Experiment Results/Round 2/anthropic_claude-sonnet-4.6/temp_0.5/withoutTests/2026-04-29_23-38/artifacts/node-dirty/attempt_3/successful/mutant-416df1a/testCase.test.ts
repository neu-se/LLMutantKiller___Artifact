import { tmpdir } from 'os';
import { join } from 'path';
import { writeFileSync, unlinkSync, existsSync } from 'fs';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty error emission without callbacks', () => {
  it('should NOT emit error when write fails but a callback is provided', (done) => {
    const tmpPath = join(tmpdir(), `dirty-test-${Date.now()}.db`);
    writeFileSync(tmpPath, '');
    
    const db = new Dirty(tmpPath);
    
    db.on('load', () => {
      const writeStream = (db as any)._writeStream;
      let capturedCallback: Function | null = null;
      
      writeStream.write = (data: any, cb: Function) => {
        capturedCallback = cb;
        return true;
      };
      writeStream.cork = () => {};
      writeStream.uncork = () => {
        if (capturedCallback) {
          const cb = capturedCallback;
          capturedCallback = null;
          setImmediate(() => cb(new Error('write error')));
        }
      };
      
      // Add error listener that should NOT be called (original behavior)
      db.on('error', (err: Error) => {
        // This should NOT be called in original code
        // But WILL be called in mutated code
        expect(err).toBeUndefined(); // This will fail if called
      });
      
      // Call set WITH a callback
      (db as any).set('testKey', 'testValue', (err: Error) => {
        expect(err.message).toBe('write error');
        if (existsSync(tmpPath)) unlinkSync(tmpPath);
        done();
      });
    });
  });
});