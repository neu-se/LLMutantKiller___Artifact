import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with partial application', () => {
  it('should correctly handle partial application with exactly 4 arguments', () => {
    const read = () => {};
    const sink1 = (read) => read;
    const sink2 = (read) => read;
    const sink3 = (read) => read;
    const sink4 = (read) => read;

    const partial = pull(sink1, sink2, sink3, sink4);
    const result = partial(read);

    expect(result).toBe(read);
  });
});