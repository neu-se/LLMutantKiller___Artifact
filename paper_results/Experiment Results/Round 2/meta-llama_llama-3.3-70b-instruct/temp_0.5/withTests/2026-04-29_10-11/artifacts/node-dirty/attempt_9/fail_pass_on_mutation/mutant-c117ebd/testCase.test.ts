import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should write to disk with correct encoding', (done) => {
    const filePath = path.join(__dirname, 'test.dirty');
    const db = new Dirty(filePath);

    db.set('key', '\ud800');
    db.on('drain', () => {
      const contents = fs.readFileSync(filePath);
      const decoder = new TextDecoder('utf-8', { fatal: true });
      expect(() => decoder.decode(contents)).not.toThrow();
      fs.unlinkSync(filePath);
      done();
    });
  });
});