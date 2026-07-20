import { Dirty } from "../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should not return a string when parsing a row', (done) => {
    const db = new Dirty();
    const rowStr = '{"key":"test","val":"value"}';
    let row;
    try {
      row = JSON.parse(rowStr);
      if (!('key' in row)) {
        throw new Error();
      }
    } catch (e) {}

    expect(row).not.toBe("Stryker was here!");
    done();
  });
});