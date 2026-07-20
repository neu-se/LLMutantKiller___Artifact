import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('_flush guard behavior', () => {
  it('should not emit drain prematurely when _waitForDrain causes early break in write loop', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const file = path.join(tmpDir, 'test.dirty');
    const db = new Dirty(file);

    db.on('load', () => {
      const callbacks: string[] = [];
      
      // Write enough large values to trigger backpressure (_waitForDrain = true)
      // then write more - the second flush should be blocked by _waitForDrain guard
      const largeVal = 'x'.repeat(64 * 1024);
      
      // These writes should trigger backpressure
      for (let i = 0; i < 10; i++) {
        db.set(`big${i}`, largeVal, () => { callbacks.push(`big${i}`); });
      }
      
      // After drain, set more keys - with mutation the guard doesn't work
      // so _inFlightWrites tracking breaks
      db.once('drain', () => {
        callbacks.push('drain1');
        
        // Now set more keys after first drain
        for (let i = 0; i < 5; i++) {
          db.set(`small${i}`, `val${i}`, () => { callbacks.push(`small${i}`); });
        }
        
        db.once('drain', () => {
          callbacks.push('drain2');
          expect(callbacks).toContain('drain1');
          expect(callbacks).toContain('drain2');
          // All big callbacks should have fired before drain1
          for (let i = 0; i < 10; i++) {
            const bigIdx = callbacks.indexOf(`big${i}`);
            const drain1Idx = callbacks.indexOf('drain1');
            expect(bigIdx).toBeLessThan(drain1Idx);
          }
          fs.rmSync(tmpDir, { recursive: true, force: true });
          done();
        });
      });
    });
  });
});