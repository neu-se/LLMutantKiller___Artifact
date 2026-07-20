import { Dirty } from '../../lib/dirty/dirty.js';
import fs from 'fs';
import path from 'path';

describe('Dirty', () => {
  it('should close the read stream when closing the database', (done) => {
    const tmpPath = path.join(__dirname, 'tmp.dirty');
    const db = new Dirty(tmpPath);

    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.close();
        setTimeout(() => {
          try {
            fs.readFileSync(tmpPath);
            done(new Error('Read stream was not closed'));
          } catch (err) {
            if (err.code === 'EIO') {
              done();
            } else {
              done(err);
            }
          }
        }, 100);
      });
    });
  });
});