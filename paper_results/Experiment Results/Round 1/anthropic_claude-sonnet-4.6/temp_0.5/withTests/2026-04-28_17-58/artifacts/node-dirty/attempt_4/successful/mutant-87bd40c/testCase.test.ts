import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('Dirty close method', () => {
  it('should destroy read stream synchronously when close is called, emitting read_close before write_close', (done) => {
    const file = path.join(os.tmpdir(), 'dirty-test-order-' + process.pid + '.dirty');

    // Write large data so read stream is still open when we call close()
    const rows = Array.from({ length: 50000 }, (_, i) => JSON.stringify({ key: 'k' + i, val: 'v' + i })).join('\n') + '\n';
    fs.writeFileSync(file, rows);

    const db = new Dirty(file);
    const events: string[] = [];

    db.on('read_close', () => events.push('read_close'));
    db.on('write_close', () => {
      events.push('write_close');
      try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
      // In original: read stream is destroyed immediately, so read_close fires before write_close
      expect(events[0]).toBe('read_close');
      done();
    });

    setImmediate(() => {
      db.close();
    });
  });
});