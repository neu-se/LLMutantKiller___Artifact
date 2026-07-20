import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with partial sink', () => {
  it('should throw TypeError when partial sink is called more than once', () => {
    const partialSink = pull((read) => read);
    expect(() => {
      partialSink(null);
      partialSink(null);
    }).toThrow(TypeError);
  });
});