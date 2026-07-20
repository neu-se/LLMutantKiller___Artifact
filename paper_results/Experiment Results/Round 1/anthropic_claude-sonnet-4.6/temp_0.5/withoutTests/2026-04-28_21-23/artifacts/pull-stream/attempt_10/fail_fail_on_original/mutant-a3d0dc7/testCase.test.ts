import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

describe("values source", () => {
  it("should expose abortCb behavior and detect mutation", (done) => {
    // Read abort-cb to understand what it does
    const abortCbPath = require.resolve('../../../../../../../../../../../subject_repositories/pull-stream/util/abort-cb.js');
    const source = require('../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js');
    const abortCb = require('../../../../../../../../../../../subject_repositories/pull-stream/util/abort-cb.js');
    
    // Test abortCb with null abort to understand behavior
    const calls: any[] = [];
    const result = abortCb((err: any, val: any) => {
      calls.push({err, val});
    }, null, undefined);
    
    // Now test values with abort=true after reading
    const src = source([1, 2, 3]);
    src(null, (err: any, val: any) => {
      expect(err).toBeNull();
      expect(val).toBe(1);
      // Original: abortCb NOT called on null abort, so calls array should be empty
      // Mutated: abortCb called on null abort
      expect(calls.length).toBe(0);
      done();
    });
  });
});