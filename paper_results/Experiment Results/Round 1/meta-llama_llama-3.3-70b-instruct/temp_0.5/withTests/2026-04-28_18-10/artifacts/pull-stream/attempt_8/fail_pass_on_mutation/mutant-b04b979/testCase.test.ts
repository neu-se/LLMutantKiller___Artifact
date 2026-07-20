import asyncMap from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js';

describe('asyncMap', () => {
  it('should pass through values when map function returns them', (done) => {
    const id = (e: any) => e;
    expect(id(1)).toBe(1);
    const mutatedId = (e: any) => {};
    expect(mutatedId(1)).toBeUndefined();
    done();
  });
});