import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('dirty db', () => {
  it('should emit error event with a message when a corrupted row is encountered', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);

    let errorEmitted = false;
    db.on('error', (err) => {
      errorEmitted = true;
      expect(err).toBeInstanceOf(Error);
    });

    db.on('load', () => {
      db.set('test', 'test');
      db.on('drain', () => {
        const corruptedRow = '{"key":"test","val":';
        fs.appendFileSync(filePath, corruptedRow);
        db.close();
        setTimeout(() => {
          expect(errorEmitted).toBe(true);
          fs.unlinkSync(filePath);
          done();
        }, 100);
      });
    });
  });
});