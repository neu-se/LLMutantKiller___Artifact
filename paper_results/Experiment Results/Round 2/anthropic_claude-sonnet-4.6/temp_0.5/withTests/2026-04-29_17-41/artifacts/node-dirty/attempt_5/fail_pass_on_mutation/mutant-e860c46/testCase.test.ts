import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close waits for in-flight writes', () => {
  it('should call all set callbacks before closing', (done) => {
    const file = path.join(os.tmpdir(), `dirty-cb-${process.pid}.dirty`);
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);
    const callbacksFired: string[] = [];

    db.on('load', () => {
      // Set multiple keys so they get batched in one flush
      // Both callbacks should fire before write_close
      db.set('key1', 'value1', () => { callbacksFired.push('cb1'); });
      db.set('key2', 'value2', () => { callbacksFired.push('cb2'); });

      db.on('drain', () => {
        // Call close right when drain fires - queue is empty
        // but if _inFlightWrites check is broken, close might happen too early
        db.close();
      });
    });

    db.on('write_close', () => {
      try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
      expect(callbacksFired).toContain('cb1');
      expect(callbacksFired).toContain('cb2');
      done();
    });
  });
});