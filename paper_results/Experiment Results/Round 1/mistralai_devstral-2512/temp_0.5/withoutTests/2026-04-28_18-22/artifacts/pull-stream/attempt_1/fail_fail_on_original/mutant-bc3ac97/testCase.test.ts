import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with 3 arguments', () => {
  it('should correctly handle the case with 3 arguments', () => {
    const read = () => {};
    const sink1 = () => {};
    const sink2 = () => {};
    const sink3 = () => {};

    const result = pull(sink1, sink2, sink3)(read);

    expect(result).toBeDefined();
  });
});