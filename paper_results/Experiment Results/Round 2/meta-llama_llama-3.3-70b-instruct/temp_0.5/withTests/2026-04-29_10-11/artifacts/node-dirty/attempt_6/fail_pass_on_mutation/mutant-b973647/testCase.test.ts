import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should emit an error event when an error occurs while reading the file', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);
    let errorEmitted = false;
    let eventName;
    db.on('error', () => {
      errorEmitted = true;
      eventName = 'error';
    });
    db.on('', () => {
      errorEmitted = true;
      eventName = '';
    });
    db.on('load', () => {
      if (errorEmitted) {
        expect(eventName).toBe('error');
      }
      done();
    });
    fs.writeFileSync(filePath, 'invalid json');
  });
});