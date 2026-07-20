import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should load data from file with chunked data', (done) => {
    const tmpPath = path.join(__dirname, 'tmp');
    const filePath = path.join(tmpPath, 'test.dirty');
    fs.mkdirSync(tmpPath);

    const db = new Dirty(filePath);
    db.set('key1', 'value1');
    db.set('key2', 'value2');
    db.on('drain', () => {
      db.close();
      const data = `{"key":"key1","val":"value1"}\n{"key":"key2"`;
      fs.writeFileSync(filePath, data);
      const db2 = new Dirty(filePath);
      db2.on('load', (length) => {
        expect(length).toBe(1);
        expect(db2.get('key1')).toBe('value1');
        expect(db2.get('key2')).toBeUndefined();
        fs.unlinkSync(filePath);
        fs.rmdirSync(tmpPath);
        done();
      });
    });
  });
});