import { asyncMap } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';
import { test, expect } from '@jest/globals';

describe('asyncMap', () => {
  it('should abort when map errors', (done) => {
    const ERR = new Error('abort');
    const read = asyncMap((data, cb) => {
      cb(ERR);
    });
    read(null, (end, data) => {
      if (end) {
        expect(end).toBe(ERR);
        done();
      }
    });
  });
});