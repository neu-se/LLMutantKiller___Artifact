import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe('take mutation test', () => {
  it('should call callback with ended value when ended is true and end is false', (done) => {
    const testFn = () => true;
    const takeStream = take(testFn);
    let callCount = 0;

    const mockRead = jest.fn((end, cb) => {
      if (end) {
        cb(true);
      } else {
        callCount++;
        if (callCount === 1) {
          // First call returns data
          cb(null, 'data');
        } else {
          // Second call simulates ended state
          cb(null, 'more data');
        }
      }
    });

    const stream = takeStream(mockRead);

    // First call to get into ended state
    stream(false, (end, data) => {
      expect(end).toBeFalsy();
      expect(data).toBe('data');

      // Force ended to be true by calling with end=true
      stream(true, (endResult) => {
        // Now call with end=false to trigger the mutation
        stream(false, (endResult2, data2) => {
          expect(endResult2).toBe(true);
          done();
        });
      });
    });
  });
});