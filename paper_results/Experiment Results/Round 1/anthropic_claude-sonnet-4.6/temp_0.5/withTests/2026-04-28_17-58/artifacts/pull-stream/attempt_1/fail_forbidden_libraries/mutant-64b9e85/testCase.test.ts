import { describe, it, expect } from '@jest/globals';
import pull from '../../../../../../../../../../../subject_repositories/pull-stream/index.js';

describe('find - end of stream behavior', () => {
  it('should call callback with null error when item is not found in stream', (done) => {
    pull(
      pull.values([1, 2, 3, 4, 5]),
      pull.find(function (d: number) {
        return d === 99; // will never match
      }, function (err: any, found: any) {
        expect(err).toBeNull();
        expect(found).toBeNull();
        done();
      })
    );
  });
});