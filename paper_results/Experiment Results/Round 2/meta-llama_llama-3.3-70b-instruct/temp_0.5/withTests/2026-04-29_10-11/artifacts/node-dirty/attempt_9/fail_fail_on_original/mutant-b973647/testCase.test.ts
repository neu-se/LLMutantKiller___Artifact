import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should emit an error event when an error occurs while reading the file', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);
    let errorEmitted = false;
    let eventName;
    db.on('newListener', (event) => {
      if (event === '') {
        throw new Error('Unexpected event name');
      }
      eventName = event;
    });
    db.on('error', () => {
      errorEmitted = true;
    });
    db.on('load', () => {
      expect(errorEmitted).toBe(true);
      expect(eventName).toBe('error');
      done();
    });
    fs.writeFileSync(filePath, 'invalid json');
  });
});