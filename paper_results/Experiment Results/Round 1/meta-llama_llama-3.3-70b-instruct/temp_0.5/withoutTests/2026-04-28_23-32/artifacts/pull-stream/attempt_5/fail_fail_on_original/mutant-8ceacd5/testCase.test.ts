import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should throw an error when more than 4 arguments are passed to the partial sink', () => {
    const read = () => {};
    const arg1 = () => {};
    const arg2 = () => {};
    const arg3 = () => {};
    const arg4 = () => {};
    const arg5 = () => {};

    const partialSink = pull(arg1);
    expect(() => partialSink(read, arg2, arg3, arg4, arg5)).toThrowError('partial sink should only be called once!');
  });
});