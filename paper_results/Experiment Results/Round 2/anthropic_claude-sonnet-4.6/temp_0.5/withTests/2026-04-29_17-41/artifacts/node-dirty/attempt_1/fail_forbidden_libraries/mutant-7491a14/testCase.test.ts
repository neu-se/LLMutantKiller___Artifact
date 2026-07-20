import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty db file loading with utf-8 encoding', () => {
  it('should correctly load data written to disk when reopening the database', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-encoding-test-${Date.now()}.dirty`);

    // Clean up any existing file
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db1 = new Dirty(file);
    db1.on('load', () => {
      db1.set('hello', 'world', () => {
        db1.set('foo', 'bar', () => {
          // Now close and reopen to test loading
          db1.close();
          db1.on('write_close', () => {
            const db2 = new Dirty(file);
            db2.on('load', (length: number) => {
              try {
                expect(length).toBe(2);
                expect(db2.get('hello')).toBe('world');
                expect(db2.get('foo')).toBe('bar');
                // Clean up
                try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
                done();
              } catch (err) {
                try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
                done(err);
              }
            });
            db2.on('error', (err: Error) => {
              try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
              done(err);
            });
          });
        });
      });
    });
  });
});