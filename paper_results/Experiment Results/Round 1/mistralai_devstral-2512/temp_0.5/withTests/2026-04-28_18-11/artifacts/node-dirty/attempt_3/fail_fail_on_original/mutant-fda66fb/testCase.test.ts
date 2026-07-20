import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event emission', () => {
  const testFile = path.join(__dirname, 'test-drain-emission.dirty');
  let db: any;

  beforeEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  afterEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  it('should emit drain when queue becomes empty during flush', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Set a value to populate the queue
      db.set('key1', 'value1');

      // Clear the queue manually to simulate the condition
      db._queue.clear();

      // Force a flush operation
      db._flush();

      // The drain event should be emitted when queue is empty
      db.on('drain', () => {
        done();
      });

      // Fail test if drain isn't emitted within reasonable time
      setTimeout(() => {
        done(new Error('drain event was not emitted'));
      }, 100);
    });
  });
});