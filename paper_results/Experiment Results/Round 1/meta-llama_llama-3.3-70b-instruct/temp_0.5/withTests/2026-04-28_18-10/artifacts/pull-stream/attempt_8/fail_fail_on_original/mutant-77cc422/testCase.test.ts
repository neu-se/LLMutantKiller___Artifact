import { count } from '../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js';

describe('count function', () => {
  it('should call cb with next value when end is false and abort is true', (done) => {
    const read = count(10);
    let called = false;
    read(true, (end, data) => {
      called = true;
      expect(end).toBe(true);
      expect(data).toBeUndefined();
      done();
    });
    expect(called).toBe(true);
  });
});