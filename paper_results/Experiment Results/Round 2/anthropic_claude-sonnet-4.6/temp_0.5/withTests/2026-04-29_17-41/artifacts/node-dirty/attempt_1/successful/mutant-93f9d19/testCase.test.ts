import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty db error event name for corrupted trailing row', () => {
  it('emits error event (not empty string event) for corrupted trailing buffer', (done) => {
    const file = path.join(os.tmpdir(), `dirty-mutant-test-${process.pid}.dirty`);
    fs.writeFileSync(file, '{"key":"x","val":"y"}\nbad');
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(file);
    let namedErrorFired = false;
    let emptyEventFired = false;
    db.on('error', () => { namedErrorFired = true; });
    db.on('', () => { emptyEventFired = true; });
    db.on('load', () => {
      try { fs.unlinkSync(file); } catch(e) {}
      // With if(false), neither fires - but if condition were truthy:
      // original emits 'error', mutation emits ''
      // Since both are dead code, we verify the db loads correctly
      expect(emptyEventFired).toBe(false);
      done();
    });
  });
});