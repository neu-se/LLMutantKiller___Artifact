import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should emit write_close event after closing streams', (done) => {
    const filePath = 'test.dirty';
    fs.writeFileSync(filePath, '');
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.set('key', 'value', () => {
        db.set('key2', 'value2', () => {
          db.close();
        });
      });
    });

    let writeCloseEmitted = false;
    db.on('write_close', () => {
      writeCloseEmitted = true;
      try {
        fs.unlinkSync(filePath);
        done();
      } catch (err) {
        done.fail('Error occurred while checking file');
      }
    });

    setTimeout(() => {
      if (!writeCloseEmitted) {
        done.fail('write_close event not emitted');
      }
    }, 1000);
  });
});