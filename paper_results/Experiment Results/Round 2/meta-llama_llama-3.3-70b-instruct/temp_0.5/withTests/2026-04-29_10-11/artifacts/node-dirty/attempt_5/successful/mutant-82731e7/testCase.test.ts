import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as assert from 'assert';

describe('Dirty', () => {
  it('should not throw an error when closing without a write stream', () => {
    const db = new Dirty();
    expect(() => db.close()).not.toThrow();
  });
});