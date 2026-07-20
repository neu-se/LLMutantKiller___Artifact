import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should flush queue when not waiting for drain', (done) => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    dirty.set('key', 'value', () => {
      dirty._waitForDrain = true;
      dirty.set('key2', 'value2', () => {
        expect(dirty._queue.size).toBe(1);
        done();
      });
    });
  });
});