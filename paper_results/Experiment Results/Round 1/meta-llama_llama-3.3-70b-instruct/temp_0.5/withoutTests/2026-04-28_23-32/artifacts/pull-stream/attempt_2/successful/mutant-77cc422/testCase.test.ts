import count from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe('count function', () => {
  it('should return the correct count when end is true', (done) => {
    const counter = count(1);
    counter(true, (end, count) => {
      expect(end).toBe(true);
      done();
    });
  });
});