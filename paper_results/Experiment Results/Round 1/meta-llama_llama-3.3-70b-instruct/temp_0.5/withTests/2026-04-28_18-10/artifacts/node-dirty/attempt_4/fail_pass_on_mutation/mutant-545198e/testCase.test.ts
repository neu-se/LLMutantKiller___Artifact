import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should load data from file with partial lines', (done) => {
    const tmpPath = path.join(__dirname, 'tmp');
    const filePath = path.join(tmpPath, 'test.dirty');
    fs.mkdirSync(tmpPath);

    const db = new Dirty(filePath);
    db.set('key1', 'value1');
    db.set('key2', 'value2');
    db.on('drain', () => {
      db.close();
      const data = fs.readFileSync(filePath, 'utf-8');
      fs.writeFileSync(filePath, data.slice(0, -1)); // remove the last newline character
      const db2 = new Dirty(filePath);
      db2.on('error', (err) => {
        expect(err.message).toBe(`Corrupted row at the end of the db: ${JSON.stringify({key: 'key2', val: 'value2'})}`);
        fs.unlinkSync(filePath);
        fs.rmdirSync(tmpPath);
        done();
      });
    });
  });
});