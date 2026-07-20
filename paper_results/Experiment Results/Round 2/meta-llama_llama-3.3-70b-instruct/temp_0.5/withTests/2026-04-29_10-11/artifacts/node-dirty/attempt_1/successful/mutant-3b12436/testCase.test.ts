import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty', () => {
  it('should throw an error when loading a row without a key', (done) => {
    const filePath = path.join(__dirname, 'test.dirty');
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        fs.writeFileSync(filePath, '{"val":"value"}\n');
        const db2 = new Dirty(filePath);
        db2.on('error', (err) => {
          expect(err.message).toBe('Could not load corrupted row: {"val":"value"}');
          done();
        });
      });
    });
  });
});