import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should flush queue when not waiting for drain', () => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);
    dirty.set('key', 'value');
    dirty.set('key2', 'value2');
    expect(dirty._queue.size).toBe(2);
    dirty._flush();
    expect(dirty._queue.size).toBe(0);
  });
});