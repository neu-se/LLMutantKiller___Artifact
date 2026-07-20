import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty', () => {
  it('should handle chunk without newline correctly', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.set('key', 'value');
      db.set('key2', 'value2');
      db.on('drain', () => {
        const readStream = fs.createReadStream(filePath, {
          encoding: 'utf-8',
          flags: 'r',
        });

        let data = '';
        readStream.on('data', (chunk) => {
          data += chunk;
        });
        readStream.on('end', () => {
          const lines = data.split('\n').filter(line => line!== '');
          let uniqueLines = new Set(lines);
          expect(uniqueLines.size).toBe(2); // exactly 2 unique lines
          done();
        });
      });
    });
  });
});