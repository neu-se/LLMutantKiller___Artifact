import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should emit an error event when an error occurs while reading the file', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);
    let errorEmitted = false;
    db.on('newListener', (eventName) => {
      if (eventName === '') {
        throw new Error('Unexpected event name');
      }
    });
    db.on('error', () => {
      errorEmitted = true;
    });
    db.on('load', () => {
      expect(errorEmitted).toBe(true);
      done();
    });
    fs.writeFileSync(filePath, 'invalid json');
  });
});