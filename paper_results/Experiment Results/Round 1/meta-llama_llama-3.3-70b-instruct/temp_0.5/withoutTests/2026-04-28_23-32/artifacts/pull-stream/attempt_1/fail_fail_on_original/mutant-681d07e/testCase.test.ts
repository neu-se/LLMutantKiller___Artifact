import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should throw an error when called multiple times', () => {
    const read = () => {};
    const sink = () => {};
    const partialSink = pull(sink);
    expect(() => partialSink(read)).toThrowError('partial sink should only be called once!');
  });
});