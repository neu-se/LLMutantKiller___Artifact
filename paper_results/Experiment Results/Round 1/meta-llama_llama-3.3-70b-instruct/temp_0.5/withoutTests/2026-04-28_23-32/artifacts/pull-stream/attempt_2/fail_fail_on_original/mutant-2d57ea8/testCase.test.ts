import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should throw a TypeError with a specific message when called twice', () => {
    const read = () => {};
    const sink = () => {};
    const partialSink = pull.default(read, sink);
    expect(() => partialSink(read)).toThrowError('partial sink should only be called once!');
  });
});