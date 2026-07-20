import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should call the source function when read.source is a function', () => {
    const sourceMock = jest.fn(() => ({ source: jest.fn() }));
    const read = {
      source: sourceMock,
    };
    const result = pull(read, (x: any) => x);
    expect(typeof result).toBe('object');
  });
});