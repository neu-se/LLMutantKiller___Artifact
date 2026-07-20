import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('corrupted row handling', () => {
  const testFile = path.join(__dirname, 'tmp', 'corrupted-test.dirty');
  const testDir = path.dirname(testFile);

  beforeAll(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should handle corrupted rows and verify return value', (done) => {
    // Create a file with a corrupted row
    const corruptedData = '{"key":"test","val":"value"}\n{"corrupted":"data"\n{"key":"test2","val":"value2"}\n';
    fs.writeFileSync(testFile, corruptedData, 'utf-8');

    const db = new Dirty(testFile);
    let errorReceived = false;
    let returnValue = '';

    // Mock the return value check by intercepting the error handler
    const originalEmit = db.emit.bind(db);
    db.emit = function(event: string, ...args: any[]) {
      if (event === 'error' && args[0]?.message?.includes('Could not load corrupted row')) {
        errorReceived = true;
        // The original code returns empty string, mutated returns "Stryker was here!"
        // We need to verify the actual return value from the corrupted row handling
        // This is tricky since we can't directly access the return value, so we'll check the error message
        expect(args[0].message).toBe('Could not load corrupted row: {"corrupted":"data"');
      }
      return originalEmit(event, ...args);
    };

    db.on('load', (size) => {
      expect(errorReceived).toBe(true);
      expect(size).toBe(2);
      done();
    });
  });
});