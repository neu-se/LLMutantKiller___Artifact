import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import fs from 'fs';
import assert from 'assert';

describe('Dirty', () => {
  it('should emit error event when a corrupted row is encountered', (done) => {
    const filePath = 'test.dirty';
    fs.writeFileSync(filePath, '{"key":"test","val":"test"}\n{"key":"test2"}\n');

    const db = new Dirty(filePath);
    let errorEmitted = false;
    let loadEmitted = false;

    db.on('error', (err) => {
      assert.ok(err instanceof Error);
      assert.strictEqual(err.message, 'Could not load corrupted row: {"key":"test2"}');
      errorEmitted = true;
      if (loadEmitted) {
        fs.unlinkSync(filePath);
        done();
      }
    });

    db.on('load', () => {
      loadEmitted = true;
      if (errorEmitted) {
        fs.unlinkSync(filePath);
        done();
      } else {
        assert.fail('Error event was not emitted before load event');
        fs.unlinkSync(filePath);
        done();
      }
    });
  });
});