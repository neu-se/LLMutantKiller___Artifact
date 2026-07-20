import { Dirty } from '../../../lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should emit an error event when a write operation fails', (done) => {
    const file = path.join(__dirname, 'test.dirty');
    const db = new Dirty(file);

    db.on('load', () => {
      db.set('key', 'value', (err: any) => {
        if (err) {
          throw err;
        }
        // Intentionally close the write stream to simulate a write error
        db._writeStream.destroy();
        db.set('key2', 'value2', (err: any) => {
          if (err) {
            db.on('error', (err: any) => {
              done();
            });
          }
        });
      });
    });
  });
});