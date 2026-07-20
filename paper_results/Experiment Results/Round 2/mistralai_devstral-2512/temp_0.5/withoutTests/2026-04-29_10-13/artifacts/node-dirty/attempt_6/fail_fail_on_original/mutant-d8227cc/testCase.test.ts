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

  it('should process data chunks without newlines correctly', (done) => {
    // Create a file with a complete line followed by incomplete data
    const completeLine = '{"key":"test1","val":"value1"}\n';
    const incompleteLine = '{"key":"test2","val":"value2"}';
    fs.writeFileSync(dbPath, completeLine + incompleteLine, 'utf-8');

    const db = new Dirty(dbPath);
    let errorCount = 0;

    db.on('error', (err) => {
      errorCount++;
      // Original code should emit error for incomplete line at end
      // Mutated code will behave differently due to incorrect newline check
      if (errorCount === 1) {
        expect(err.message).toContain('Corrupted row at the end of the db');
      } else {
        done(new Error(`Unexpected additional error: ${err.message}`));
      }
    });

    db.on('load', (size) => {
      // Should load the complete line
      expect(size).toBe(1);
      expect(db.get('test1')).toBe('value1');
      // Should not have loaded the incomplete line
      expect(db.get('test2')).toBeUndefined();
      done();
    });

    // Safety timeout
    setTimeout(() => {
      done(new Error('Test timed out'));
    }, 200);
  });
});