import infinite from "../../../../../../../../../../../subject_repositories/pull-stream/sources/infinite.js";

describe('infinite source', () => {
  it('should call callback with end error when end is truthy', (done) => {
    const mockGenerate = jest.fn(() => 42);
    const source = infinite(mockGenerate);
    const mockEnd = new Error('test error');

    source(mockEnd, (err, data) => {
      expect(err).toBe(mockEnd);
      expect(data).toBeUndefined();
      done();
    });
  });
});