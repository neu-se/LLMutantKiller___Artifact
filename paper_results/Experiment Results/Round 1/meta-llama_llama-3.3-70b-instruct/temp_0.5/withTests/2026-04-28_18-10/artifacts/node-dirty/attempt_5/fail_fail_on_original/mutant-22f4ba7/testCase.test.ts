import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should wait for pending writes to complete before closing streams and emitting write_close event', (done) => {
    const filePath = 'test.dirty';
    fs.writeFileSync(filePath, '');
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.set('key', 'value', () => {
        db.set('key2', 'value2', () => {
          db.on('drain', () => {
            db.close();
          });
        });
      });
    });

    db.on('write_close', () => {
      try {
        const stats = fs.statSync(filePath);
        if (stats.size < 50) {
          done.fail('File size is too small, indicating that not all writes were flushed');
        }
        fs.unlinkSync(filePath);
        done();
      } catch (err) {
        done.fail('Error occurred while checking file size');
      }
    });
  });
});