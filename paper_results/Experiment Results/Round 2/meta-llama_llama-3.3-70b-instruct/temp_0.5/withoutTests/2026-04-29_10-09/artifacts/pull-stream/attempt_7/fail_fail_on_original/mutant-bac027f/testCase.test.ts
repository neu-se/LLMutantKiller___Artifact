import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should call the source function when provided', () => {
    let sourceCalled = false;
    const read = {
      source: () => {
        sourceCalled = true;
        return {};
      },
    };
    pull(read);
    expect(sourceCalled).toBe(true);
  });
});