import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('encoding mutation test', () => {
  const testFile = path.join(__dirname, 'test-encoding.dirty');

  beforeEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // File doesn't exist, ignore error
    }
  });

  afterEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // File doesn't exist, ignore error
    }
  });

  it('should correctly handle UTF-8 encoded data', (done) => {
    const db = new Dirty(testFile);
    db.on('load', () => {
      db.set('test', 'café', () => {
        setTimeout(() => {
          const content = fs.readFileSync(testFile, 'utf-8');
          const lines = content.trim().split('\n');
          expect(lines.length).toBe(1);
          const parsed = JSON.parse(lines[0]);
          expect(parsed.key).toBe('test');
          expect(parsed.val).toBe('café');
          done();
        }, 100);
      });
    });
  }, 10000);
});