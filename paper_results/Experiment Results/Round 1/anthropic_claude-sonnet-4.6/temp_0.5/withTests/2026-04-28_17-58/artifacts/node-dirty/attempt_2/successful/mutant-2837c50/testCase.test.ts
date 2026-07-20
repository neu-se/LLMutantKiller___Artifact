import * as path from 'path';
import * as fs from 'fs';
import { tmpdir } from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() with pending writes', () => {
  it('should close the database after drain when close() is called while writes are pending', (done) => {
    const tmpFile = path.join(tmpdir(), `dirty-test-close-${process.pid}.dirty`);

    // Clean up any leftover file
    try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }

    const db = new Dirty(tmpFile);

    const timeout = setTimeout(() => {
      try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }
      done(new Error('write_close was never emitted; close() did not complete after drain'));
    }, 3000);

    db.on('write_close', () => {
      clearTimeout(timeout);
      try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }
      done();
    });

    db.on('load', () => {
      // Queue some writes so the queue is non-empty
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      // Call close() while writes are pending; original code reschedules close after drain
      db.close();
    });
  });
});