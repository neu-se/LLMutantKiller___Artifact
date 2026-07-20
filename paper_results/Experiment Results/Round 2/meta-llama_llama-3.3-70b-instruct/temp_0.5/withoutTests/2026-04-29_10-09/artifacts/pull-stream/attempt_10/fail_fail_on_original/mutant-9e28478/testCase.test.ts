import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull.js', () => {
  it('should handle the case when length is 2', () => {
    const read = () => {};
    const arg1 = () => {};
    const arg2 = () => {};
    const result = pull(read, arg1, arg2);
    if (result === undefined) {
      throw new Error('Expected a function, but got undefined');
    }
    try {
      result();
    } catch (e) {
      throw new Error('Expected a function that can be called, but got an error: ' + e);
    }
  });
});