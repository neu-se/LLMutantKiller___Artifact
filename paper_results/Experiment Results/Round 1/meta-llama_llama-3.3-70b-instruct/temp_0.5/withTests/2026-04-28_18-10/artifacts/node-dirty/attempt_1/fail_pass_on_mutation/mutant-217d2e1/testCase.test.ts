import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should not return a string when loading corrupted rows', (done) => {
    const tmpFile = path.join(__dirname, 'tmp.dirty');
    fs.writeFileSync(tmpFile, '{"key":"x"}\n{"key":"y"}\n{"key":"z"}\n');
    const db = new Dirty(tmpFile);
    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        fs.writeFileSync(tmpFile, '{"key":"x"}\n{"key":"y"}\nStryker was here!\n');
        const db2 = new Dirty(tmpFile);
        db2.on('load', () => {
          try {
            const result = db2.get('key');
            if (typeof result === 'string' && result === 'Stryker was here!') {
              throw new Error('Expected an error to be emitted');
            }
          } catch (err) {
            done();
          }
        });
        db2.on('error', () => {
          done();
        });
      });
    });
  });
});