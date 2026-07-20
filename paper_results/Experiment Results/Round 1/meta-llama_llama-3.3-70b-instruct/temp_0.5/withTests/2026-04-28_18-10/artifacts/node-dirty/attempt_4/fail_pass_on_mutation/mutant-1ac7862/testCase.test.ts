import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('Dirty', () => {
  it('should write all pending values to disk when multiple values are set before the first drain event', (done) => {
    const file = 'test.dirty';
    rimraf.sync(file);
    const db = new Dirty(file);
    db.set('key1', 'value1');
    db.set('key2', 'value2');
    db.set('key3', 'value3');
    db.set('key4', 'value4');
    db.set('key5', 'value5');
    db.on('load', () => {
      db.set('key6', 'value6');
      db.set('key7', 'value7');
      db.set('key8', 'value8');
    });
    db.on('drain', () => {
      const contents = fs.readFileSync(file, 'utf-8');
      const lines = contents.split('\n');
      expect(lines.length).toBe(9); // 8 values + 1 empty line
      expect(lines[0]).toBe(`{"key":"key1","val":"value1"}`);
      expect(lines[1]).toBe(`{"key":"key2","val":"value2"}`);
      expect(lines[2]).toBe(`{"key":"key3","val":"value3"}`);
      expect(lines[3]).toBe(`{"key":"key4","val":"value4"}`);
      expect(lines[4]).toBe(`{"key":"key5","val":"value5"}`);
      expect(lines[5]).toBe(`{"key":"key6","val":"value6"}`);
      expect(lines[6]).toBe(`{"key":"key7","val":"value7"}`);
      expect(lines[7]).toBe(`{"key":"key8","val":"value8"}`);
      rimraf.sync(file);
      done();
    });
  });
});