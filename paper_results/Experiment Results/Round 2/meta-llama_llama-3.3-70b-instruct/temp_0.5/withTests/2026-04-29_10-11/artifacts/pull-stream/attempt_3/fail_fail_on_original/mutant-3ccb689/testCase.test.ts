import { asyncMap } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('async-map', () => {
  it('should abort when aborted', (done) => {
    const read = asyncMap((data: any) => data);
    read(true, (end: any, data: any) => {
      expect(end).toBe(true);
      done();
    });
  });
});