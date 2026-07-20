import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database chunk processing', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('should only process complete lines when chunk contains no newlines', (done) => {
    // Create a file with a complete line followed by incomplete data without newline
    const data = '{"key":"complete","val":"value"}\n{"key":"incomplete","val":"data';
    fs.writeFileSync(dbPath, data);

    const db = new Dirty(dbPath);

    db.on('load', (size) => {
      // Original code should only process the complete line (size = 1)
      // Mutated code will process both lines (size = 2)
      expect(size).toBe(1);
      expect(db.get('complete')).toBe('value');
      expect(db.get('incomplete')).toBeUndefined();
      done();
    });

    db.on('error', (err) => {
      done(new Error(`Unexpected error: ${err.message}`));
    });
  });
});