import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('test newline detection in data chunks', () => {
  const testFile = path.join(__dirname, 'test-newline.dirty');

  beforeEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  afterEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  it('should correctly process chunks without newlines', (done) => {
    // Create a file with a partial line (no newline at end)
    fs.writeFileSync(testFile, '{"key":"test","val":"data"}', 'utf-8');

    const db = new Dirty(testFile);
    let loadCalled = false;

    db.on('load', (size) => {
      loadCalled = true;
      // Original code should handle this without error
      expect(size).toBe(0); // No complete lines, so nothing loaded
    });

    db.on('error', (err) => {
      // Mutated code will incorrectly process this and emit an error
      if (loadCalled) {
        done.fail('Error should not be emitted after load');
      } else {
        done.fail(`Unexpected error: ${err.message}`);
      }
    });

    // Give time for async operations to complete
    setTimeout(() => {
      if (!loadCalled) {
        done.fail('Load event was not called');
      } else {
        done();
      }
    }, 100);
  });
});