import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close()', () => {
  it('emits read_close without emitting load when close() interrupts the read stream', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    
    const rows: string[] = [];
    for (let i = 0; i < 10000; i++) {
      rows.push(JSON.stringify({ key: `key${i}`, val: `value${i}` }));
    }
    fs.writeFileSync(dbPath, rows.join('\n') + '\n');
    
    const db = new Dirty(dbPath);
    
    let loadFired = false;
    let readCloseFired = false;
    
    db.on('load', () => { loadFired = true; });
    db.on('read_close', () => { readCloseFired = true; });
    
    // Call close synchronously before any I/O
    db.close();
    
    setTimeout(() => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
      // In original: read stream is destroyed, so load should NOT fire (stream aborted)
      // and read_close should fire
      // In mutated: read stream is NOT destroyed, so load fires naturally
      if (!loadFired && readCloseFired) {
        done();
      } else if (loadFired) {
        done(new Error(`load fired (${loadFired}) - read stream was not destroyed by close()`));
      } else {
        done(new Error(`read_close did not fire`));
      }
    }, 2000);
  });
});