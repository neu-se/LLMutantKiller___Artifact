import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import assert from 'assert';

describe('Dirty', () => {
  it('should emit error event when a corrupted row is encountered', (done) => {
    const filePath = 'test.dirty';
    fs.writeFileSync(filePath, '{"key":"test","val":"test"}\n{"key":"test2"}\n');

    const db = new Dirty(filePath);
    let errorEmitted = false;

    db.on('error', (err) => {
      assert.ok(err instanceof Error);
      assert.strictEqual(err.message, 'Could not load corrupted row: {"key":"test2"}');
      errorEmitted = true;
    });

    db.on('load', () => {
      if (errorEmitted) {
        fs.unlinkSync(filePath);
        done();
      } else {
        // If error event is not emitted, the test should fail
        // This will pass on the original code and fail on the mutated code
        assert.strictEqual(db.listeners('error').length, 1);
        assert.strictEqual(db.listeners('error')[0].name, 'emit');
        fs.unlinkSync(filePath);
        done();
      }
    });
  });
});