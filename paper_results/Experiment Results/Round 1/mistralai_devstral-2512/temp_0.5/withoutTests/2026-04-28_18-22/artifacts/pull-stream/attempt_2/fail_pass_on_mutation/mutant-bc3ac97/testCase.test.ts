import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with 3 arguments', () => {
  it('should correctly chain three sinks and return a function', () => {
    const read = () => {};
    const sink1 = (read) => read;
    const sink2 = (read) => read;
    const sink3 = (read) => read;

    const result = pull(sink1, sink2, sink3);

    expect(typeof result).toBe('function');
    expect(result(read)).toBe(read);
  });
});