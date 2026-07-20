import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('dirty db', () => {
  it('should emit error event with a message when a corrupted row is encountered', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);

    db.on('load', () => {
      const corruptedRow = '{"key":"test","val":';
      fs.appendFileSync(filePath, corruptedRow);
      db.close();
    });

    db.on('error', (err) => {
      expect(typeof err).toBe('object');
      expect(err instanceof Error).toBe(true);
      fs.unlinkSync(filePath);
      done();
    });
  });
});