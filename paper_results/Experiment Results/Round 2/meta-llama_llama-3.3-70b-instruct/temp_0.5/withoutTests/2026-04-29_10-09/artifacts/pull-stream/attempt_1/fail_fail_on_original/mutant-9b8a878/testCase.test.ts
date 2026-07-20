import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should throw an error when called with multiple arguments and then called again', () => {
    const read = () => {};
    const sink1 = () => {};
    const sink2 = () => {};

    const partial = pull(read, sink1, sink2);
    expect(() => partial(read)).toThrowError('partial sink should only be called once!');
  });
});