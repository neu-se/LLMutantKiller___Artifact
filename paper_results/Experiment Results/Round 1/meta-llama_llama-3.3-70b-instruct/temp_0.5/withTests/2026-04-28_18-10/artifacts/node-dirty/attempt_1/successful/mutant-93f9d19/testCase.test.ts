import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should emit error event when a corrupted row is found at the end of the db', (done) => {
    const filePath = path.join(__dirname, 'corrupted.dirty');
    fs.writeFileSync(filePath, '{"key":"x","val":"y"}\n{"key":"p","val":"q"}\n{"key":"invalid"');
    const db = new Dirty(filePath);
    db.on('error', (err) => {
      fs.unlinkSync(filePath);
      done();
    });
  });
});