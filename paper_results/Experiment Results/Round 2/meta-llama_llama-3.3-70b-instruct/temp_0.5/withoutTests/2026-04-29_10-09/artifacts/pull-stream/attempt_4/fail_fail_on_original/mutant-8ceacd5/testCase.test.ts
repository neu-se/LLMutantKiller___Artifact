import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle more than 4 arguments correctly', () => {
    const read = () => {};
    const arg1 = () => {};
    const arg2 = () => {};
    const arg3 = () => {};
    const arg4 = () => {};
    const arg5 = () => {};

    const partialSink = pull(arg1, arg2, arg3, arg4, arg5);
    if (typeof partialSink === 'function') {
      expect(() => partialSink(read)).not.toThrow();
    } else {
      throw new Error('Expected partialSink to be a function');
    }
  });
});