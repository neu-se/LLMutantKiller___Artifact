import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('_flush cork/uncork batching', () => {
  it('should invoke set callbacks for multiple keys set before drain fires', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const file = path.join(tmpDir, 'test.dirty');
    const db = new Dirty(file);

    db.on('load', () => {
      // Set _waitForDrain to true by writing large data, then immediately set another key
      // With mutation: second flush proceeds even when _waitForDrain=true
      // causing _inFlightWrites to go negative or drain to fire prematurely
      const largeVal = 'x'.repeat(1024 * 64);
      
      db.set('key1', largeVal);
      // Immediately set again - with original, _waitForDrain check prevents double flush
      // With mutation, flush proceeds again causing incorrect _inFlightWrites tracking
      db.set('key2', 'small');
      
      let drainFired = false;
      db.on('drain', () => {
        if (drainFired) return;
        drainFired = true;
        // After drain, both keys should be readable
        expect(db.get('key1')).toBe(largeVal);
        expect(db.get('key2')).toBe('small');
        // Verify file has exactly 2 lines
        const contents = fs.readFileSync(file, 'utf-8');
        const lines = contents.trim().split('\n').filter((l: string) => l.length > 0);
        expect(lines.length).toBe(2);
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done();
      });
    });
  });
});