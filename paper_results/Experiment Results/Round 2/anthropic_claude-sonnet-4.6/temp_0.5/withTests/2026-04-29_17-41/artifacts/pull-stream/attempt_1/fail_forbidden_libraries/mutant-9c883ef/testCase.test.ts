import { describe, it, expect } from '@jest/globals';
import find from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js';
import values from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';

describe('find with single callback argument (no test function)', () => {
  it('should call the callback with the first element when only a callback is provided', (done) => {
    const source = values([10, 20, 30]);
    const sink = find(function(err: any, result: any) {
      expect(err).toBeNull();
      expect(result).toBe(10);
      done();
    });
    sink(source);
  });
});