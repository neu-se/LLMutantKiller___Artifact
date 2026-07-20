import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function boundary condition', () => {
  it('should handle exactly two arguments correctly', () => {
    const source = {
      source: true,
      sink: jest.fn((read) => {
        return {
          source: {
            read: jest.fn()
          }
        };
      })
    };

    const result = pull(source, { sink: jest.fn() });

    expect(source.sink).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
  });
});