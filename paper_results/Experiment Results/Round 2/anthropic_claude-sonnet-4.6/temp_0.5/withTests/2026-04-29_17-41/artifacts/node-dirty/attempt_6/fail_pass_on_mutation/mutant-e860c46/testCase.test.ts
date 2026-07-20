import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close waits for in-flight writes to complete', () => {
  it('should persist data to disk even when close is called synchronously after set', (done) => {
    const file = path.join(os.tmpdir(), `dirty-persist-${process.pid}.dirty`);
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    db.on('load', () => {
      // After set(), _flush() is called synchronously:
      // - queue is cleared (_queue.size === 0)
      // - _inFlightWrites becomes 1
      // - write callback hasn't fired yet
      db.set('key', 'value');

      // Synchronously call close() - queue is empty, _inFlightWrites === 1
      // Original: _inFlightWrites > 0 is true, so defers close until drain
      // Mutated: ignores _inFlightWrites, destroys write stream immediately
      db.close();
    });

    db.on('write_close', () => {
      // Read the file to check if data was actually written
      const contents = fs.readFileSync(file, 'utf-8');
      try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

      // Original: data is written before close, file contains the record
      // Mutated: stream destroyed before write completes, file may be empty
      expect(contents.trim()).not.toBe('');
      expect(contents).toContain('key');
      expect(contents).toContain('value');
      done();
    });
  });
});