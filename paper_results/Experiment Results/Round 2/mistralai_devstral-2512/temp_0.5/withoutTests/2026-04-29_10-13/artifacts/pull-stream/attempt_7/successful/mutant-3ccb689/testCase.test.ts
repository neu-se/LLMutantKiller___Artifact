const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe('asyncMap mutation test', () => {
  it('should immediately return when aborted state is set', (done) => {
    let readCallback: (end: any, data?: any) => void;
    const mockRead = jest.fn((abort, cb) => {
      readCallback = cb;
    });

    const mockMap = jest.fn((data, cb) => {
      cb(null, data);
    });

    const mappedRead = asyncMap(mockMap)(mockRead);

    // First call to set aborted state
    const abortError = new Error('aborted');
    mappedRead(abortError, (err: any) => {
      // This callback should be called
      expect(err).toBe(abortError);

      // Now make another call while aborted is true
      // This should immediately return with the aborted error
      mappedRead(null, (end: any, data: any) => {
        expect(end).toBe(abortError);
        done();
      });
    });

    // Trigger the read callback to simulate async completion
    if (readCallback) {
      readCallback!(null, 'data');
    }
  });
});