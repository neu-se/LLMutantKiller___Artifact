import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should emit an error event with the correct event name when an error occurs while reading the file', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);
    fs.writeFileSync(filePath, 'invalid json');
    let eventName;
    db.on('error', (err) => {
      expect(eventName).toBe('error');
      done();
    });
    db.on('load', () => {
      db._readStream.emit('error', new Error());
    });
    db.on('error', (err) => {
      eventName = 'error';
    });
  });
});