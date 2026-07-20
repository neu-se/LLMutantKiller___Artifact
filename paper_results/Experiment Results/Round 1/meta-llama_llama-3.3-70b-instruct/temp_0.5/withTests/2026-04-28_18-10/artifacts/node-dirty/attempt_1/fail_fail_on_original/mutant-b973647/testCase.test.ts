import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { fs } from 'fs';
import { assert } from 'assert';

describe('Dirty', () => {
  it('should emit an error event with a valid error message when the read stream encounters an error', (done) => {
    const db = new Dirty('test.dirty');
    const errorMessage = 'Test error message';

    // Create a mock error event
    const errorEvent = new Error(errorMessage);

    // Mock the read stream to emit an error event
    db._readStream.emit('error', errorEvent);

    db.on('error', (err) => {
      assert.strictEqual(err.message, errorMessage);
      done();
    });
  });
});