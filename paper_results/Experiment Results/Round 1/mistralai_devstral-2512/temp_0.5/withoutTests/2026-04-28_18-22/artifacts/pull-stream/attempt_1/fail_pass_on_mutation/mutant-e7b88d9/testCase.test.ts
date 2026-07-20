import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take mutation test', () => {
  it('should handle end signal correctly when ended is already true', (done) => {
    const testFn = () => true;
    const takeStream = take(testFn);
    const mockRead = jest.fn((end, cb) => {
      if (end) {
        cb(true);
      } else {
        cb(null, 'data');
      }
    });

    const stream = takeStream(mockRead);

    // First call to simulate normal operation
    stream(false, (end, data) => {
      expect(end).toBeFalsy();
      expect(data).toBe('data');

      // Second call with end=true to trigger the mutation
      stream(true, (endResult) => {
        expect(endResult).toBe(true);
        done();
      });
    });
  });
});