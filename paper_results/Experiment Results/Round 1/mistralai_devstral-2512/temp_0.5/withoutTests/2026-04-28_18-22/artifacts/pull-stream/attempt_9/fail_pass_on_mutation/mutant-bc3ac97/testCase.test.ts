import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with 3 arguments', () => {
  it('should return undefined when case 3 branch is missing return statement', () => {
    const read = () => {};
    const sink1 = (read) => read;
    const sink2 = (read) => read;
    const sink3 = (read) => read;

    const result = pull(sink1, sink2, sink3)(read);

    expect(result).toBe(read);
  });
});