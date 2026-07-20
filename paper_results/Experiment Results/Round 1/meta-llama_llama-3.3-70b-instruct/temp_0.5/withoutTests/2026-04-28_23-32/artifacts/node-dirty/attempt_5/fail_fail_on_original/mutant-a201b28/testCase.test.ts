import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import { rmSync, writeFileSync } from 'fs';
import { join } from 'path';

describe('Dirty', () => {
  it('should emit error event with a valid error message when a corrupted row is encountered', (done) => {
    const dbPath = 'test.db';
    writeFileSync(dbPath, '{"key":"test"');
    const dirty = new Dirty(dbPath);
    dirty.on('load', () => {
      dirty.on('error', (err) => {
        expect(err).toBeInstanceOf(Error);
        rmSync(dbPath);
        done();
      });
    });
  });
});