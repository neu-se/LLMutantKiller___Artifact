import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should emit an error event with the correct event name when an error occurs while reading the file', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);
    let errorEventEmitted = false;
    db.on('error', () => {
      errorEventEmitted = true;
      done();
    });
    db.on('', () => {
      throw new Error('Unexpected event emitted');
    });
    fs.writeFileSync(filePath, 'invalid json');
    db._load();
  });
});