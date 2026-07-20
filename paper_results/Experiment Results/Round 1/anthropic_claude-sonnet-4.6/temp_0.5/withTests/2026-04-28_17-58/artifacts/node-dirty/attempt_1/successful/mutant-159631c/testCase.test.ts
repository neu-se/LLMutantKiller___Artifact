import { EventEmitter } from 'events';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('Dirty read stream close behavior', () => {
  it('should emit read_close event after loading from file', (done) => {
    const tmpDir = os.tmpdir();
    const filePath = path.join(tmpDir, `dirty-test-read-close-${Date.now()}.dirty`);

    // Write initial data to the file
    fs.writeFileSync(filePath, JSON.stringify({ key: 'foo', val: 'bar' }) + '\n', 'utf-8');

    const db = new Dirty(filePath);

    db.on('read_close', () => {
      // Clean up
      try { fs.unlinkSync(filePath); } catch (e) { /* ignore */ }
      done();
    });

    // Timeout to fail the test if read_close is never emitted
    const timeout = setTimeout(() => {
      try { fs.unlinkSync(filePath); } catch (e) { /* ignore */ }
      done(new Error('read_close event was never emitted'));
    }, 3000);

    db.on('read_close', () => {
      clearTimeout(timeout);
    });
  });
});