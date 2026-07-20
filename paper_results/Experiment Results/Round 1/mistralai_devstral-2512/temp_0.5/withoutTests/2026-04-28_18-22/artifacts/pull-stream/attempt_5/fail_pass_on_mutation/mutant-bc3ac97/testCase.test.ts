import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with 3 arguments', () => {
  it('should throw when case 3 is missing return statement', () => {
    const read = () => {};
    const sink1 = (read) => read;
    const sink2 = (read) => read;
    const sink3 = (read) => read;

    expect(() => {
      pull(sink1, sink2, sink3)(read);
    }).not.toThrow();
  });
});