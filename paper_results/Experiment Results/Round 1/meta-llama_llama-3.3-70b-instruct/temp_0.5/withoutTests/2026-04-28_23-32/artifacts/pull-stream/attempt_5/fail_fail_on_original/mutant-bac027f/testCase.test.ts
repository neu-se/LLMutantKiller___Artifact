import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should call the source function when read.source is a function', () => {
    const sourceMock = jest.fn(() => ({ source: sourceMock }));
    const read = {
      source: sourceMock,
    };
    pull(read);
    expect(sourceMock).toHaveBeenCalledTimes(1);
  });
});