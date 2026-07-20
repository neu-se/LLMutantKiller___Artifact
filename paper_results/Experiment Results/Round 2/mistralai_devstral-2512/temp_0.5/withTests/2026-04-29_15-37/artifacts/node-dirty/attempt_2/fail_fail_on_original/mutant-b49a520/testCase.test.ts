import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('mutant-b49a520 test', () => {
  const testFile = path.join(__dirname, 'test-mutant.dirty');

  beforeEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  afterEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  it('should handle data chunks without newlines correctly', (done) => {
    const db = new Dirty(testFile);
    db.on('load', () => {
      db.set('key1', 'value1', () => {
        db.set('key2', 'value2', () => {
          db.on('drain', () => {
            fs.readFile(testFile, 'utf-8', (err, data) => {
              if (err) return done(err);
              const lines = data.split('\n').filter(line => line.trim() !== '');
              expect(lines.length).toBe(2);
              done();
            });
          });
        });
      });
    });
  });
});