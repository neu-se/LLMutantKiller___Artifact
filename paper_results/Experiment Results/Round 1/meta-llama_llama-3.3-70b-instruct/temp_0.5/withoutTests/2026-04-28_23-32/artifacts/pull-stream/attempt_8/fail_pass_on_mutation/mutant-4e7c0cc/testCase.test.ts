import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should handle four arguments correctly', () => {
    const read = () => {};
    const sink1 = () => {};
    const sink2 = () => {};
    const sink3 = () => {};
    const sink4 = () => {};

    const result = pull(read, sink1, sink2, sink3, sink4);
    expect(result).not.toBeNull();
  });
});