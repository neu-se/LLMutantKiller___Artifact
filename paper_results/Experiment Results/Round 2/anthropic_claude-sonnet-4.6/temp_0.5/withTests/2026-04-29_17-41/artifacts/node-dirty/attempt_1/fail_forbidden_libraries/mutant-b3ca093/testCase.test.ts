import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('_flush guard condition', () => {
  it('should write all keys exactly once to disk when multiple sets are called before drain', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-mutant-test-${Date.now()}.dirty`);

    const db = new Dirty(file);

    db.on('load', () => {
      // Set multiple keys rapidly - this exercises the _flush guard
      // With the mutation, when _waitForDrain=true but queue has items,
      // _flush won't return early, potentially causing writes to proceed
      // incorrectly. With the original, _flush returns early when queue
      // is empty (regardless of _waitForDrain).
      db.set('key1', 'val1');
      db.set('key2', 'val2');
      db.set('key3', 'val3');

      db.on('drain', () => {
        // Read the file and verify each key appears exactly once
        const contents = fs.readFileSync(file, 'utf-8');
        const lines = contents.trim().split('\n').filter(l => l.length > 0);

        // Each key should appear exactly once
        const key1Lines = lines.filter(l => l.includes('"key1"'));
        const key2Lines = lines.filter(l => l.includes('"key2"'));
        const key3Lines = lines.filter(l => l.includes('"key3"'));

        expect(key1Lines.length).toBe(1);
        expect(key2Lines.length).toBe(1);
        expect(key3Lines.length).toBe(1);

        // Verify the values are correct
        expect(JSON.parse(key1Lines[0])).toEqual({ key: 'key1', val: 'val1' });
        expect(JSON.parse(key2Lines[0])).toEqual({ key: 'key2', val: 'val2' });
        expect(JSON.parse(key3Lines[0])).toEqual({ key: 'key3', val: 'val3' });

        // Clean up
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done();
      });
    });
  });
});