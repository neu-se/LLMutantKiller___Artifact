import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should emit "read_close" event when read stream is closed', (done) => {
    const data = '{"key":"key","val":"value"}\n';
    fs.writeFileSync('test.db', data);
    const dirty = new Dirty('test.db');
    let readCloseEmitted = false;
    dirty.on('read_close', () => {
      readCloseEmitted = true;
    });
    dirty.on('load', () => {
      dirty.close();
      setTimeout(() => {
        if (!readCloseEmitted) {
          done(new Error('read_close event not emitted'));
        } else {
          fs.unlinkSync('test.db');
          done();
        }
      }, 100);
    });
    dirty.on('error', (err) => {
      done(err);
    });
  });
});