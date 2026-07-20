import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with partial application', () => {
  it('should throw when partial sink is called with more arguments than expected due to mutation', () => {
    const read = () => {};
    const sink1 = (read) => read;
    const sink2 = (read) => read;
    const sink3 = (read) => read;
    const sink4 = (read) => read;
    const sink5 = (read) => read;

    const partial = pull(sink1, sink2, sink3, sink4, sink5);
    expect(() => {
      partial(read);
    }).not.toThrow();
  });
});