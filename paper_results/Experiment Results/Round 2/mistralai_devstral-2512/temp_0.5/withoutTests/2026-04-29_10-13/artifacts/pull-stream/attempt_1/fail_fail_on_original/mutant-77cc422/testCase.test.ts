import { count } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe('count source', () => {
  it('should call callback with end when end is truthy', (done) => {
    const source = count(5);
    const mockCallback = jest.fn((end, data) => {
      if (end) {
        expect(end).toBe(true);
        done();
      }
    });

    source(true, mockCallback);
  });
});