import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle more than 4 arguments correctly', () => {
    const read = () => {};
    const arg1 = () => 'arg1';
    const arg2 = () => 'arg2';
    const arg3 = () => 'arg3';
    const arg4 = () => 'arg4';
    const arg5 = () => 'arg5';

    const partialSink = pull(arg1, arg2, arg3, arg4, arg5);
    expect(typeof partialSink).toBe('function');
    const result = partialSink(read);
    expect(result).toBe('arg5');
  });
});