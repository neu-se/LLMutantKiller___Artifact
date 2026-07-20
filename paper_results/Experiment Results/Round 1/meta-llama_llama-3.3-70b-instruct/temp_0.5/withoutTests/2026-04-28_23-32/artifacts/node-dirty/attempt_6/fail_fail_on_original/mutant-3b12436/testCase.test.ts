import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty', () => {
  it('should throw an error when loading a corrupted row without a key', (done) => {
    const tempDir = fs.mkdtempSync(path.join(__dirname, 'dirty-'));
    const dbPath = path.join(tempDir, 'test.db');
    const dirty = new Dirty(dbPath);

    const corruptedRow = '{"val": "test"}\n';
    fs.writeFileSync(dbPath, corruptedRow);

    dirty.on('error', (err) => {
      expect(err.message).toBe(`Could not load corrupted row: ${corruptedRow.trim()}`);
      fs.rmdirSync(tempDir, { recursive: true });
      done();
    });

    dirty.on('load', () => {
      expect.fail('Corrupted row was loaded successfully');
    });
  });
});