import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with partial sink', () => {
  it('should execute the partial sink branch when args is null', () => {
    const mockSink = jest.fn();
    const partialSink = (read: any) => {
      const args = null;
      if (args == null) {
        throw new TypeError("partial sink should only be called once!");
      }
      return mockSink;
    };

    expect(() => {
      pull(partialSink);
    }).toThrow(TypeError);
  });
});