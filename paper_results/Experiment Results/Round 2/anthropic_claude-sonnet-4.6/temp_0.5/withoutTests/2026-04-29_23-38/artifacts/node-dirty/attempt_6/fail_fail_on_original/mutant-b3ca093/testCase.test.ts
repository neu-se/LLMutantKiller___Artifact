import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty _flush backpressure mutation', () => {
  it('should call set callback before drain event when no backpressure occurs', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const cleanup = (err?: unknown) => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
      if (err) done(err); else done();
    };

    // Use a mock write stream to force _waitForDrain=true scenario
    // by making write() return false on first call
    const db = new Dirty(dbPath);
    const events: string[] = [];

    db.on('load', () => {
      // Monkey-patch the write stream to return false (backpressure) on first write
      const ws = (db as any)._writeStream;
      const originalWrite = ws.write.bind(ws);
      let callCount = 0;
      ws.write = function(data: string, cb: Function) {
        callCount++;
        if (callCount === 1) {
          // Simulate backpressure: call original but return false
          const result = originalWrite(data, cb);
          return false; // Force _waitForDrain = true
        }
        return originalWrite(data, cb);
      };

      db.set('key1', 'value1', () => { events.push('cb1'); });
      db.set('key2', 'value2', () => { events.push('cb2'); });

      db.once('drain', () => {
        events.push('drain');
        try {
          // Both callbacks should have fired before drain
          expect(events).toContain('cb1');
          expect(events).toContain('cb2');
          expect(events[events.length - 1]).toBe('drain');
          cleanup();
        } catch (e) {
          cleanup(e);
        }
      });
    });

    db.on('error', cleanup);
  }, 10000);
});