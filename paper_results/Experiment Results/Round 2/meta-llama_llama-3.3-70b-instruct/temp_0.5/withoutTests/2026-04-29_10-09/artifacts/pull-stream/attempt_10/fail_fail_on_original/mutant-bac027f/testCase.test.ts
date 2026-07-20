import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should call the source function when provided', () => {
    let sourceCalled = false;
    const source = () => {
      sourceCalled = true;
    };
    const read = { source: source };
    pull(read, () => {
      throw new Error("Should not be called");
    });
    expect(sourceCalled).toBe(true);
  });
});