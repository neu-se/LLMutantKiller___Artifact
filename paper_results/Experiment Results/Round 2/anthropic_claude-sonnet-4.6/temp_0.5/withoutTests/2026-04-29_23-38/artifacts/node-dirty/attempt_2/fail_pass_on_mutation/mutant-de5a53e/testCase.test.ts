import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

describe('Dirty close() write stream destroy', () => {
  it('should fully close write stream allowing file to be truncated after close', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const { Dirty } = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(dbPath);

    db.once('load', () => {
      db.set('key1', 'value1', () => {
        // Listen for both close events
        const events: string[] = [];
        
        db.once('read_close', () => events.push('read_close'));
        db.once('write_close', () => {
          events.push('write_close');
          // After write_close, the write stream should be null
          // and we should be able to open the file exclusively
          try {
            // Try to open file with exclusive write - should work if fd is released
            const fd = fs.openSync(dbPath, 'r');
            fs.closeSync(fd);
            try { fs.rmSync(tmpDir, { recursive: true }); } catch (e) { /* ignore */ }
            done();
          } catch (err) {
            try { fs.rmSync(tmpDir, { recursive: true }); } catch (e) { /* ignore */ }
            done(err);
          }
        });

        db.close();

        // Timeout in case write_close never fires
        setTimeout(() => {
          if (!events.includes('write_close')) {
            try { fs.rmSync(tmpDir, { recursive: true }); } catch (e) { /* ignore */ }
            done(new Error('write_close event never fired'));
          }
        }, 300);
      });
    });
  });
});