import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should load data from file with incomplete JSON', (done) => {
    const tmpPath = path.join(__dirname, 'tmp');
    const filePath = path.join(tmpPath, 'test.dirty');
    fs.mkdirSync(tmpPath);

    const db = new Dirty(filePath);
    db.set('key1', 'value1');
    db.on('drain', () => {
      db.close();
      const data = `{"key":"key1","val":"value1"`; // missing closing bracket
      fs.writeFileSync(filePath, data);
      const db2 = new Dirty(filePath);
      db2.on('error', (err) => {
        expect(err.message).toBe(`Could not load corrupted row: {"key":"key1","val":"value1"`);
        fs.unlinkSync(filePath);
        fs.rmdirSync(tmpPath);
        done();
      });
    });
  });
});