import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

describe('close properly releases file descriptor', () => {
  it('should allow reading the file immediately after both read_close and write_close', (done) => {
    const file = path.join(os.tmpdir(), `dirty-fd-test-${process.pid}.dirty`);
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(file);

    db.on('load', () => {
      db.set('hello', 'world');
      db.on('drain', () => db.close());
    });

    let readClosed = false;
    let writeClosed = false;

    const checkBothClosed = () => {
      if (readClosed && writeClosed) {
        // Both streams closed - now verify file is accessible
        try {
          const content = fs.readFileSync(file, 'utf-8');
          expect(content).toContain('"hello"');
          fs.unlinkSync(file);
          done();
        } catch(e) {
          done(e);
        }
      }
    };

    db.on('read_close', () => { readClosed = true; checkBothClosed(); });
    db.on('write_close', () => { writeClosed = true; checkBothClosed(); });
  });
});