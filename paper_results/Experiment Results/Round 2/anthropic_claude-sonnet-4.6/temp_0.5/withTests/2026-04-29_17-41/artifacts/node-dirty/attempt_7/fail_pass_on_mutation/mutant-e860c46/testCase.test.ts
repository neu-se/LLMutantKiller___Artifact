import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close defers when in-flight writes exist', () => {
  it('should fire set callback before write_close event', (done) => {
    const file = path.join(os.tmpdir(), `dirty-defer-${process.pid}.dirty`);
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);
    let setCbFired = false;

    db.on('load', () => {
      // After set(), queue is empty but _inFlightWrites === 1
      db.set('key', 'value', () => {
        setCbFired = true;
      });

      // Synchronously call close while _inFlightWrites === 1, queue empty
      // Original: defers close until drain (which fires after write cb)
      //           so write cb fires BEFORE write_close
      // Mutated:  closes stream immediately, write_close fires,
      //           then write cb fires AFTER write_close
      db.close();
    });

    db.on('write_close', () => {
      try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
      // In original: set callback fires before write_close (drain fires first)
      // In mutated: write_close fires before set callback
      expect(setCbFired).toBe(true);
      done();
    });
  });
});