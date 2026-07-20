import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() with in-flight writes', () => {
  it('should emit drain before write_close when close is called during in-flight writes', (done) => {
    const file = path.join(os.tmpdir(), `dirty-inflight-test-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);
    const events: string[] = [];

    db.on('drain', () => {
      events.push('drain');
    });

    db.on('write_close', () => {
      events.push('write_close');
      try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

      // In original: drain fires first (close waits for in-flight writes to finish)
      // In mutated: write_close may fire without drain having fired first
      expect(events[0]).toBe('drain');
      expect(events).toContain('write_close');
      done();
    });

    db.on('load', () => {
      // Write a value - flushes queue, increments _inFlightWrites
      db.set('key', 'value');
      // Immediately call close before write callback fires
      // Original: _inFlightWrites > 0, so defers close until drain
      // Mutated: ignores _inFlightWrites, closes immediately
      db.close();
    });
  });
});