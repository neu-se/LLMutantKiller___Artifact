import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should emit an error event when an error occurs while reading the file', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);
    let errorEmitted = false;
    db.on('error', (err) => {
      errorEmitted = true;
      expect(err).toBeInstanceOf(Error);
    });
    db.on('load', () => {
      expect(errorEmitted).toBe(true);
      done();
    });
    fs.writeFileSync(filePath, 'invalid json');
  });
});