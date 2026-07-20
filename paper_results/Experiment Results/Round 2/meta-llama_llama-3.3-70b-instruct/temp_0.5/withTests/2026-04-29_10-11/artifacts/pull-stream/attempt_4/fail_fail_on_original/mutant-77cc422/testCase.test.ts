import { count } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe('count function', () => {
  it('should return the correct count when end is true', (done) => {
    const stream = count(5);
    let counter = 0;
    stream(true, (end, data) => {
      expect(end).toBe(true);
      done();
    });
  });
});