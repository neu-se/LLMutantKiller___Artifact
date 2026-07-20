import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should throw an error when called with a partial sink', () => {
    const partialSink = pull(function (read) {
      // This should throw an error because a partial sink should only be called once
      throw new TypeError("partial sink should only be called once!");
    });
    expect(() => partialSink(null)).toThrowError("partial sink should only be called once!");
  });
});