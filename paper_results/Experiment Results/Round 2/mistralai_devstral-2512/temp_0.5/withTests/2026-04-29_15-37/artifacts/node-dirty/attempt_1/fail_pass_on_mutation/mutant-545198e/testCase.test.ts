import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('mutant-545198e', () => {
  const testFile = path.join(__dirname, 'test-mutant.dirty');
  afterAll(() => {
    try { rimraf.sync(testFile); } catch (e) {}
  });

  it('should handle data chunks without newlines correctly', (done) => {
    const db = new Dirty(testFile);
    db.on('load', () => {
      db.set('test', 'value', () => {
        fs.readFile(testFile, 'utf-8', (err, data) => {
          if (err) return done(err);
          const lines = data.split('\n').filter(line => line.trim() !== '');
          expect(lines.length).toBeGreaterThan(0);
          done();
        });
      });
    });

    // Simulate a chunk without newline to trigger the mutant behavior
    db._readStream.emit('data', '{"key":"test","val":"value"}');
  });
});