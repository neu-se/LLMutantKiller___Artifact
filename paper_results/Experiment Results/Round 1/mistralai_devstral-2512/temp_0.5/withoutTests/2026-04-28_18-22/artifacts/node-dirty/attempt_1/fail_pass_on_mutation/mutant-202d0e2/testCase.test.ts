import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event', () => {
  const testDbPath = path.join(__dirname, 'test-db.txt');
  const dirty = new Dirty(testDbPath);

  beforeAll((done) => {
    dirty.on('load', () => {
      done();
    });
  });

  afterAll((done) => {
    dirty.close();
    rimraf(testDbPath, done);
  });

  it('should emit drain event after write stream drains and queue is empty', (done) => {
    const testKey = 'test-key';
    const testValue = { data: 'test' };

    dirty.on('drain', () => {
      done();
    });

    // Set a value to trigger a write
    dirty.set(testKey, testValue, () => {
      // The drain event should be emitted after the write completes
    });
  });
});