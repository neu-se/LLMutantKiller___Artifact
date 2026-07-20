import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database chunk processing', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('should handle data chunks without newlines during streaming', (done) => {
    const testData = { key: 'testKey', val: 'testValue' };
    const chunkWithoutNewline = JSON.stringify(testData);

    // Create a readable stream that emits a chunk without newline
    const testStream = new fs.ReadStream(dbPath);
    testStream.destroy(); // Close immediately

    // Write the chunk without newline
    fs.writeFileSync(dbPath, chunkWithoutNewline, 'utf-8');

    const db = new Dirty(dbPath);
    let loadEventFired = false;
    let errorEventFired = false;

    db.on('load', () => {
      loadEventFired = true;
      // In original code, this should fire without error
      // In mutated code, this might not fire or fire with error
      if (!errorEventFired) {
        done();
      }
    });

    db.on('error', (err) => {
      errorEventFired = true;
      // This should not happen in original code
      // But will happen in mutated code due to incorrect newline check
      done(new Error(`Unexpected error: ${err.message}`));
    });

    // Safety timeout
    setTimeout(() => {
      if (!loadEventFired && !errorEventFired) {
        done(new Error('Test timed out'));
      }
    }, 200);
  });
});