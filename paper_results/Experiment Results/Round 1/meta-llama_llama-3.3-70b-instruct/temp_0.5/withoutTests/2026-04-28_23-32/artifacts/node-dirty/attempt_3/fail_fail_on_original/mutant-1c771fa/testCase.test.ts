import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';

describe('Dirty', () => {
  it('should emit an error when loading a corrupted row', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      dirty.on('error', (err) => {
        expect(err.message).toBe('Could not load corrupted row: {"key":"test","val":null}');
        fs.unlinkSync(dbPath);
        done();
      });

      fs.appendFileSync(dbPath, '{"key":"test","val":null}\n');
      dirty._readStream.destroy();
    });
  });
});