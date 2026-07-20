import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import { tmpdir } from 'os';
import path from 'path';

describe('Dirty', () => {
  it('emits an error when a corrupted row is found at the end of the db', (done) => {
    const tmpFilePath = path.join(tmpdir(), 'dirty-test.db');
    const dirty = new Dirty(tmpFilePath);

    dirty.on('load', () => {
      const corruptedRow = '{"key": "test", "val": "test"}\n{"key": "test2"';
      fs.writeFileSync(tmpFilePath, corruptedRow);
      dirty._load();
    });

    dirty.on('error', (err) => {
      expect(err.message).toContain('Corrupted row at the end of the db');
      fs.unlinkSync(tmpFilePath);
      done();
    });
  });
});