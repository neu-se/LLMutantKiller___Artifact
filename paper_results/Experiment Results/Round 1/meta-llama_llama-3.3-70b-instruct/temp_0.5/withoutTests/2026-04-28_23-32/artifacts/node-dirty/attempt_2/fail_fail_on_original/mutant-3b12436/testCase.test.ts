import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty', () => {
  it('should throw an error when loading a corrupted row without a key', () => {
    const tempDir = fs.mkdtempSync(path.join(__dirname, 'dirty-'));
    const dbPath = path.join(tempDir, 'test.db');
    const dirty = new Dirty(dbPath);

    const corruptedRow = '{"val": "test"}';
    fs.writeFileSync(dbPath, corruptedRow);

    let errorEmitted = false;
    dirty.on('load', () => {
      // If the load event is emitted, it means the corrupted row was loaded successfully
      throw new Error('Corrupted row was loaded successfully');
    });
    dirty.on('error', (err) => {
      // If an error event is emitted, it means the corrupted row was not loaded
      errorEmitted = true;
    });

    dirty.on('close', () => {
      fs.rmdirSync(tempDir, { recursive: true });
    });

    // Wait for the load or error event to be emitted
    const timeout = 1000;
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      if (errorEmitted) {
        break;
      }
    }

    expect(errorEmitted).toBe(true);
  });
});