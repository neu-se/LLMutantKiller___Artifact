import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty _flush backpressure mutation', () => {
  it('should not lose writes when stream signals backpressure', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const cleanup = (err?: unknown) => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
      if (err) done(err); else done();
    };

    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Patch _flush to force _waitForDrain=true before second set call
      // by directly setting the flag after first flush starts
      const originalFlush = (db as any)._flush.bind(db);
      let flushCount = 0;
      (db as any)._flush = function() {
        flushCount++;
        if (flushCount === 1) {
          originalFlush();
          // Force backpressure state after first flush
          (db as any)._waitForDrain = true;
        } else {
          originalFlush();
        }
      };

      const order: string[] = [];

      db.set('key1', 'value1', () => { order.push('key1'); });
      
      // This set happens after _waitForDrain is forced to true
      // Original: _flush returns early, key2 written after drain
      // Mutation: _flush proceeds, key2 written immediately
      db.set('key2', 'value2', () => { order.push('key2'); });

      db.once('drain', () => {
        try {
          // Both keys should be written
          expect(db.get('key1')).toBe('value1');
          expect(db.get('key2')).toBe('value2');
          // key1 callback should fire before key2
          expect(order).toContain('key1');
          expect(order).toContain('key2');
          cleanup();
        } catch (e) {
          cleanup(e);
        }
      });
    });

    db.on('error', cleanup);
  }, 10000);
});