```typescript
import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('mutant test for _flush break condition', () => {
  const testFile = path.join(__dirname, 'test-flush-mutant.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should break flush loop when waitForDrain is true', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      // Force _waitForDrain to be true by filling the write buffer
      const largeValue = 'x'.repeat(100000); // Large enough to potentially fill buffer
      const keys = ['key1', 'key2', 'key3'];

      // Set first key to fill buffer
      db.set(keys[0], largeValue, (err) => {
        if (err) return done(err);

        // Now set additional keys while buffer is potentially full
        // This should trigger the break condition when _waitForDrain is true
        db.set(keys[1], largeValue);
        db.set(keys[2], largeValue);

        //