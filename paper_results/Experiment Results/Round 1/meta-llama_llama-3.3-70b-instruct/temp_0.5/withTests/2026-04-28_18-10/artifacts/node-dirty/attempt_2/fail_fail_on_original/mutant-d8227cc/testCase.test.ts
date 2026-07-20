import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty', () => {
  it('should handle chunk without newline correctly', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        const chunk = '{"key":"key","val":"value"}';
        const readStream = fs.createReadStream(filePath, {
          encoding: 'utf-8',
          flags: 'r',
        });

        readStream.on('data', (data) => {
          expect(data).toBe(chunk + '\n');
          done();
        });
      });
    });
  });
});