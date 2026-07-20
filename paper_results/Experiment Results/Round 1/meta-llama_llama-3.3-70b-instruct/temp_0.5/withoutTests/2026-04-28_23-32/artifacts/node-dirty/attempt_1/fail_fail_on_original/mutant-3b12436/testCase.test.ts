import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty', () => {
  it('should throw an error when loading a corrupted row without a key', () => {
    const tempDir = fs.mkdtempSync(path.join(__dirname, 'dirty-'));
    const dbPath = path.join(tempDir, 'test.db');
    const dirty = new Dirty(dbPath);

    const corruptedRow = 'null';
    fs.writeFileSync(dbPath, corruptedRow);

    expect(() => {
      dirty.on('load', () => {
        // If the load event is emitted, it means the corrupted row was loaded successfully
        throw new Error('Corrupted row was loaded successfully');
      });
      dirty.on('error', (err) => {
        // If an error event is emitted, it means the corrupted row was not loaded
        expect(err.message).toBe('Empty lines never appear in a healthy database');
      });
    }).not.toThrow();

    dirty.on('load', () => {
      dirty.close();
    });

    dirty.on('close', () => {
      fs.rmdirSync(tempDir, { recursive: true });
    });
  });
});