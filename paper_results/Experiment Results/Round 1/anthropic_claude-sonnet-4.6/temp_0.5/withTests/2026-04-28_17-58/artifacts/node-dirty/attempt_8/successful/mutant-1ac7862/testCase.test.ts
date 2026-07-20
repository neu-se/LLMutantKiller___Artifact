import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('dirty flush behavior', () => {
  it('should process all queued keys accumulated during drain wait in a single flush', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-mutant-test-${process.pid}-${Date.now()}.dirty`);
    const db = new (Dirty as any)(tmpFile);

    db.on('load', () => {
      // Write a large value to fill the write stream buffer and trigger _waitForDrain = true
      const largeValue = 'x'.repeat(65536 * 4);
      
      // This should fill the buffer and set _waitForDrain = true
      db.set('large', largeValue);
      
      // These should queue up while _waitForDrain is true
      db.set('beta', 'value2');
      db.set('gamma', 'value3');

      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // After first drain, all queued keys should be written
          expect(db.get('beta')).toBe('value2');
          expect(db.get('gamma')).toBe('value3');
          const contents = fs.readFileSync(tmpFile, 'utf-8');
          expect(contents).toContain('"beta"');
          expect(contents).toContain('"gamma"');
          try { fs.unlinkSync(tmpFile); } catch {}
          done();
        }
      });
    });
  }, 10000);
});