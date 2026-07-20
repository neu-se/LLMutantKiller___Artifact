import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty', () => {
  it('should throw an error when loading a corrupted row without a key', () => {
    const tempDir = fs.mkdtempSync(path.join(__dirname, 'dirty-'));
    const dbPath = path.join(tempDir, 'test.db');
    const dirty = new Dirty(dbPath);

    const corruptedRow = '{"val": "test"}\n';
    fs.writeFileSync(dbPath, corruptedRow);

    let errorEmitted = false;
    let loadEmitted = false;
    dirty.on('load', () => {
      loadEmitted = true;
    });
    dirty.on('error', (err) => {
      errorEmitted = true;
    });

    dirty.on('close', () => {
      fs.rmdirSync(tempDir, { recursive: true });
    });

    // Wait for the load or error event to be emitted
    const timeout = 1000;
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      if (loadEmitted || errorEmitted) {
        break;
      }
    }

    expect(errorEmitted).toBe(true);
    expect(loadEmitted).toBe(false);
  });
});