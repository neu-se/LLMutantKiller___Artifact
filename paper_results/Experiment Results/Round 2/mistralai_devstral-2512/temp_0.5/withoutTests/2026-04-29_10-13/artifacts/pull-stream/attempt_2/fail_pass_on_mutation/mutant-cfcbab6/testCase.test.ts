import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with three arguments', () => {
  it('should process three arguments correctly without errors', () => {
    const source = {
      read: jest.fn(),
      source: true
    };

    const through1 = {
      sink: jest.fn((read) => {
        return {
          source: {
            read: jest.fn()
          }
        };
      }),
      source: true
    };

    const through2 = {
      sink: jest.fn((read) => {
        return {
          source: {
            read: jest.fn()
          }
        };
      }),
      source: true
    };

    expect(() => {
      pull(source, through1, through2);
    }).not.toThrow();

    expect(through1.sink).toHaveBeenCalledTimes(1);
    expect(through2.sink).toHaveBeenCalledTimes(1);
  });
});