import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('Dirty', () => {
  it('should write multiple values to disk', (done) => {
    const file = 'test.dirty';
    rimraf.sync(file);
    const db = new Dirty(file);
    db.set('key1', 'value1');
    db.set('key2', 'value2');
    db.set('key3', 'value3');
    db.on('drain', () => {
      const contents = fs.readFileSync(file, 'utf-8');
      const lines = contents.split('\n');
      expect(lines.length).toBe(4); // 3 values + 1 empty line
      expect(lines[0]).toBe(`{"key":"key1","val":"value1"}`);
      expect(lines[1]).toBe(`{"key":"key2","val":"value2"}`);
      expect(lines[2]).toBe(`{"key":"key3","val":"value3"}`);
      rimraf.sync(file);
      done();
    });
  });
});