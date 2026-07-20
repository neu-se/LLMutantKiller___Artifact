import infinite from "../../../../../../../../../../../subject_repositories/pull-stream/sources/infinite.js";

describe('infinite source', () => {
  it('should call callback with end error when end is provided', (done) => {
    const mockGenerate = jest.fn(() => 42);
    const source = infinite(mockGenerate);
    const endError = new Error('test error');

    source(endError, (err, data) => {
      expect(err).toBe(endError);
      expect(data).toBeUndefined();
      done();
    });
  });
});