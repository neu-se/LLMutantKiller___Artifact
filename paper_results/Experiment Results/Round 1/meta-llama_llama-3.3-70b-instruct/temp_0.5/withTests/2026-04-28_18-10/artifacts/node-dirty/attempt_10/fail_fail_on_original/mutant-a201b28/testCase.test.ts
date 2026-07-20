import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('dirty db', () => {
  it('should emit error event with a message when a corrupted row is encountered', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);

    let eventName = '';
    db.on('error', () => {
      eventName = 'error';
    });
    db.on('', () => {
      eventName = 'empty';
    });

    db.on('load', () => {
      db.close();
      const corruptedRow = '{"key":"test","val":';
      fs.appendFileSync(filePath, corruptedRow);
      const db2 = new Dirty(filePath);
      db2.on('load', () => {
        db2.on('error', () => {
          expect(eventName).toBe('error');
          fs.unlinkSync(filePath);
          done();
        });
        db2.on('', () => {
          expect(eventName).not.toBe('error');
          fs.unlinkSync(filePath);
          done();
        });
      });
    });
  });
});