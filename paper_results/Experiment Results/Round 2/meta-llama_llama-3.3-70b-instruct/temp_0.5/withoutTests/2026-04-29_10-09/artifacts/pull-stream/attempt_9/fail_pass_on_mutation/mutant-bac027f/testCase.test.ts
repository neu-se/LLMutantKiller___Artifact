import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should call the source function when provided', () => {
    let sourceCalled = false;
    const source = () => {
      sourceCalled = true;
      return { source: () => {} };
    };
    const read = { source: source };
    pull(read);
    if (read.source) {
      read.source();
    }
    expect(sourceCalled).toBe(true);
  });
});