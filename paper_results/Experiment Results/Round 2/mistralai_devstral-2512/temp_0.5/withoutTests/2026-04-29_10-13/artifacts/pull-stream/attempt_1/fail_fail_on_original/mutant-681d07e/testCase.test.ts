import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with partial sink', () => {
  it('should throw TypeError when partial sink is called more than once', () => {
    const partialSink = (read) => {
      read(null, 'data');
      read(null, 'data'); // Calling twice should trigger the error
    };

    expect(() => {
      pull(partialSink);
    }).toThrow(TypeError);
  });
});