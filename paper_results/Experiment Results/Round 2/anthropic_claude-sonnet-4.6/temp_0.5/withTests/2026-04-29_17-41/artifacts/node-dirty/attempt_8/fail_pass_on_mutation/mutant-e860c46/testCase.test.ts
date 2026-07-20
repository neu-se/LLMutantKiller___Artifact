import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() ordering of drain vs write_close', () => {
  it('drain event should fire before write_close when close called with in-flight writes', (done) => {
    const file = path.join(os.tmpdir(), `dirty-order2-${process.pid}.dirty`);
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);
    const eventOrder: string[] = [];

    // Listen for drain - but only after load, to avoid load-related drains
    db.on('load', () => {
      db.on('drain', () => {
        eventOrder.push('drain');
      });

      db.on('write_close', () => {
        eventOrder.push('write_close');
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

        // Original: drain fires first (from write callback), then close() is called
        //           again via once('drain'), which calls _writeStream.end() -> write_close
        // Mutated:  _writeStream.end() called immediately -> write_close fires,
        //           then write callback fires -> drain fires
        expect(eventOrder[0]).toBe('drain');
        expect(eventOrder[1]).toBe('write_close');
        done();
      });

      // set() flushes synchronously: queue empty, _inFlightWrites=1
      db.set('key', 'value');
      // close() called while _inFlightWrites=1, queue empty
      db.close();
    });
  });
});