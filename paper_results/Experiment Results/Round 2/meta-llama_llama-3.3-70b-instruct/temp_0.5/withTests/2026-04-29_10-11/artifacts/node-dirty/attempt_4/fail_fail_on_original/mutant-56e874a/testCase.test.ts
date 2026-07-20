import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should not call callback when queue is empty or waiting for drain', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.set('key', undefined);
        let callbackCalled = false;
        db.set('key', 'value', () => {
          callbackCalled = true;
        });
        db._queue.clear();
        db._waitForDrain = true;
        db._flush();
        setTimeout(() => {
          // If the mutation is present, the callback should be called
          // because the _flush method will call the callback even when the queue is empty or waiting for drain
          if (callbackCalled) {
            done(new Error('Callback was called unexpectedly'));
          } else {
            done();
          }
        }, 100);
      });
    });
  });
});