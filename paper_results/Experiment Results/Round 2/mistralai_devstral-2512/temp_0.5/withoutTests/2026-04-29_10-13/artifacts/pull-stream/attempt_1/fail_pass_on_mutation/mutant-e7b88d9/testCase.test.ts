import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take mutation test', () => {
  it('should handle end signal correctly when ended is true', (done) => {
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

    // First call to set ended to true
    stream(true, (end) => {
      // Second call with end=false but ended=true should trigger the placeholder code
      stream(false, (result) => {
        // In original code, this should call cb(ended) which is cb(true)
        // In mutated code, this does nothing, so result will be undefined
        expect(result).toBe(true);
        done();
      });
    });
  });
});