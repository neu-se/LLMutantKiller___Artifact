import { describe, it, expect } from '@jest/globals';
import find from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js';
import values from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';

describe('find sink - end of stream error handling', () => {
  it('should call cb with null error when item is not found and stream ends normally', (done) => {
    const source = values([1, 2, 3, 4, 5]);
    const sink = find(
      (d: number) => d === 99, // never matches
      (err: any, result: any) => {
        expect(err).toBeNull();
        expect(result).toBeNull();
        done();
      }
    );
    sink(source);
  });
});