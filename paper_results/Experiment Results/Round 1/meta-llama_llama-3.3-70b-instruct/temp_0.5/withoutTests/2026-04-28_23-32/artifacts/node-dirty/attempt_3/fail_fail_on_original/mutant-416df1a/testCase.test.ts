import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import { join } from 'path';

describe('Dirty', () => {
  it('should emit error when there are callbacks and an error occurs', (done) => {
    const dbPath = join(__dirname, 'test.db');
    const dirty = new Dirty(dbPath);

    dirty._writeStream = {
      write: () => {
        return false;
      },
      emit: (event, err) => {
        if (event === 'error') {
          expect(err).toBeNull();
          done();
        }
      }
    };

    dirty.set('key', 'value', () => {
      dirty._writeStream.emit('error', new Error('Test error'));
    });
  });
});