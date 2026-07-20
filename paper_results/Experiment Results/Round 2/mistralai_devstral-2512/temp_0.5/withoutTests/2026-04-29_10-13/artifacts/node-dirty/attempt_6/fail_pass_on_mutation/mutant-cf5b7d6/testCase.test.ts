import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database load', () => {
  it('should return empty string from row processing', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const dbPath = path.join(testDir, 'test.db');

    // Setup: Create test directory with valid data
    fs.mkdirSync(testDir, { recursive: true });
    fs.writeFileSync(dbPath, '{"key":"testKey","val":"testValue"}\n');

    // Mock the forEach to capture the return value
    const originalForEach = Array.prototype.forEach;
    Array.prototype.forEach = function(callback) {
      let returnValue;
      for (let i = 0; i < this.length; i++) {
        returnValue = callback(this[i], i, this);
        if (returnValue !== '') {
          break;
        }
      }
      return returnValue;
    };

    const db = new Dirty(dbPath);

    db.on('load', (size) => {
      try {
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