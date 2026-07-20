import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should throw a TypeError with a specific message when called twice', () => {
    const func = () => {};
    const partialSink = pull(func);
    partialSink(() => {});
    expect(() => partialSink(() => {})).toThrowError('partial sink should only be called once!');
  });
});