import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should call the source function when read.source is a function', () => {
    const sourceMock = jest.fn();
    const read = {
      source: sourceMock,
    };
    pull(read, function(read) {
      return read;
    });
    expect(sourceMock).toHaveBeenCalledTimes(1);
  });
});