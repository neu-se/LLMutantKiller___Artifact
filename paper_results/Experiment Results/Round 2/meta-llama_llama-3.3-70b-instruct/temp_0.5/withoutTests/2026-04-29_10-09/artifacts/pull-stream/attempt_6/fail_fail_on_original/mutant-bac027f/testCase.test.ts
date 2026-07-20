import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should call the source function when provided', () => {
    let sourceCalled = false;
    const source = () => {
      sourceCalled = true;
      return { source: () => {} };
    };
    const read = () => {
      sourceCalled = true;
      return { source: () => {} };
    };
    pull(read);
    expect(sourceCalled).toBe(true);
  });
});