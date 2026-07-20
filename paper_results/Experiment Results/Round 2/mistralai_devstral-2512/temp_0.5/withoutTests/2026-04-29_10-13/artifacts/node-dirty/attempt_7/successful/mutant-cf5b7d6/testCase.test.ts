import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database load', () => {
  it('should correctly process rows and return empty string', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const dbPath = path.join(testDir, 'test.db');

    // Setup: Create test directory with valid data
    fs.mkdirSync(testDir, { recursive: true });
    fs.writeFileSync(dbPath, '{"key":"testKey","val":"testValue"}\n');

    // Override the forEach to check return value
    const originalForEach = Array.prototype.forEach;
    let capturedReturnValue: unknown;
    Array.prototype.forEach = function(callback) {
      for (let i = 0; i < this.length; i++) {
        capturedReturnValue = callback(this[i], i, this);
      }
    };

    const db = new Dirty(dbPath);

    db.on('load', (size) => {
      try {
        // In original code, the return value should be empty string
        // In mutated code, it will be "Stryker was here!"
        expect(capturedReturnValue).toBe('');
        expect(size).toBe(1);
        expect(db.get('testKey')).toBe('testValue');
        db.close();
        fs.rmSync(testDir, { recursive: true, force: true });
        Array.prototype.forEach = originalForEach;
        done();
      } catch (error) {
        db.close();
        fs.rmSync(testDir, { recursive: true, force: true });
        Array.prototype.forEach = originalForEach;
        done(error);
      }
    });

    db.on('error', (err) => {
      db.close();
      fs.rmSync(testDir, { recursive: true, force: true });
      Array.prototype.forEach = originalForEach;
      done(err);
    });
  });
});