import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('should write multiple values to disk in a single flush when callbacks are provided', (done) => {
    const file = 'test.dirty';
    try {
      fs.unlinkSync(file);
    } catch (err) {}
    const db = new Dirty(file);
    let count = 0;
    db.set('key1', 'value1', () => {
      count++;
    });
    db.set('key2', 'value2', () => {
      count++;
    });
    db.set('key3', 'value3', () => {
      count++;
    });
    db.on('drain', () => {
      expect(count).toBe(3);
      const contents = fs.readFileSync(file, 'utf-8');
      const lines = contents.split('\n');
      expect(lines.length).toBe(4); // 3 values + 1 empty line
      expect(lines[0]).toBe(`{"key":"key1","val":"value1"}`);
      expect(lines[1]).toBe(`{"key":"key2","val":"value2"}`);
      expect(lines[2]).toBe(`{"key":"key3","val":"value3"}`);
      try {
        fs.unlinkSync(file);
      } catch (err) {}
      done();
    });
  });
});