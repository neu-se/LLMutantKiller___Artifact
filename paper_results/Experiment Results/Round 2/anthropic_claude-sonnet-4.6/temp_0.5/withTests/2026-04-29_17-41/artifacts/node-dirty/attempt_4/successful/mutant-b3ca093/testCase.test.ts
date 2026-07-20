import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty _flush guard', () => {
  it('should not write to stream when _waitForDrain is true', (done) => {
    const file = path.join(os.tmpdir(), `dirty-flush-${Date.now()}.dirty`);
    const db = new (Dirty as any)(file);

    db.on('load', () => {
      // Spy on the write stream's write method
      const ws = db._writeStream;
      const originalWrite = ws.write.bind(ws);
      let writeCount = 0;
      
      ws.write = function(...args: any[]) {
        writeCount++;
        return originalWrite(...args);
      };

      // Write large data to trigger backpressure
      db.set('key0', 'x'.repeat(65536));
      // At this point, _waitForDrain should be true
      // Set key1 - with original, should NOT call write yet
      // With mutation, WILL call write immediately
      db.set('key1', 'value1');

      // writeCount should be 1 (only key0) with original
      // writeCount should be 2 (key0 and key1) with mutation
      // But we need to check synchronously before any I/O
      // Actually, write is called synchronously in _flush()
      expect(writeCount).toBe(1);
      
      db.on('drain', () => {
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done();
      });
    });
  });
});