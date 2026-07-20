import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should throw a TypeError with a specific message when called as a partial sink', () => {
    const partialSink = pull(function () { });
    expect(() => partialSink(function () { })).toThrowError('partial sink should only be called once!');
  });
});