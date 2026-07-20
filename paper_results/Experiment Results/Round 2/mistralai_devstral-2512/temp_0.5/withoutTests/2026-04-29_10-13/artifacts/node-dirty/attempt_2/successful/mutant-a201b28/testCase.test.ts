import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty database error handling', () => {
  const testDbPath = path.join(__dirname, 'test-db.txt');
  let dirty: any;

  beforeEach(() => {
    if (fs.existsSync(testDbPath)) {
      fs.unlinkSync(testDbPath);
    }
  });

  afterEach(() => {
    if (fs.existsSync(testDbPath)) {
      fs.unlinkSync(testDbPath);
    }
  });

  it('should emit error event with proper event name when corrupted row is encountered', (done) => {
    const corruptedData = '{"key":"test"}\n{"invalid": json}\n';
    fs.writeFileSync(testDbPath, corruptedData);

    dirty = new (require("../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js"))(testDbPath);

    let errorEventFired = false;
    let emptyEventFired = false;

    dirty.on('error', (err: Error) => {
      errorEventFired = true;
      expect(err.message).toContain('Could not load corrupted row');
    });

    dirty.on('', (err: Error) => {
      emptyEventFired = true;
    });

    setTimeout(() => {
      expect(errorEventFired).toBe(true);
      expect(emptyEventFired).toBe(false);
      done();
    }, 100);
  });
});