import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain event with no arguments when write stream drains', (done) => {
    const db = new Dirty(dbPath);
    let drainEventArgs: any[] = [];

    db.on('load', () => {
      // Trigger multiple writes to ensure drain is called
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.set('key3', 'value3');
    });

    db.on('drain', (...args) => {
      drainEventArgs = args;
    });

    setTimeout(() => {
      // In original code: drain is emitted with no arguments
      // In mutated code: drain is emitted with empty string
      expect(drainEventArgs.length).toBe(0);
      done();
    }, 100);
  });
});