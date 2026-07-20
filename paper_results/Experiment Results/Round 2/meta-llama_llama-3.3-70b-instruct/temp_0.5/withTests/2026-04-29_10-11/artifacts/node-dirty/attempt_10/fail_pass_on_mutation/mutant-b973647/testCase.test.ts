import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';

describe('Dirty', () => {
  it('should emit an error event when an error occurs while reading the file', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);
    const originalEmit = db.emit;
    db.emit = function(eventName, ...args) {
      if (eventName === '' && args.length > 0 && args[0] instanceof Error) {
        throw new Error('Unexpected event name');
      }
      return originalEmit.call(db, eventName, ...args);
    };
    db.on('error', () => {
      db.emit = originalEmit;
      done();
    });
    fs.writeFileSync(filePath, 'invalid json');
  });
});