import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with partial application', () => {
  it('should throw TypeError when partial sink is called multiple times', () => {
    const read = () => {};
    const sink = (read) => read;

    const partial = pull(sink);
    const firstCall = partial(read);

    expect(firstCall).toBe(read);

    expect(() => {
      partial(read);
    }).toThrow(TypeError);
  });
});