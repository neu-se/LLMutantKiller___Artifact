import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with 4 arguments', () => {
  it('should correctly handle 4 arguments in partial application', () => {
    // Create a simple source that returns values
    const source = {
      source: jest.fn().mockReturnValue({
        source: jest.fn().mockReturnValue('final-result')
      })
    };

    // Create 4 sink functions
    const sink1 = jest.fn().mockReturnValue('sink1');
    const sink2 = jest.fn().mockReturnValue('sink2');
    const sink3 = jest.fn().mockReturnValue('sink3');
    const sink4 = jest.fn().mockReturnValue('sink4');

    // Call pull with 4 arguments to create partial application
    const partial = pull(sink1, sink2, sink3, sink4);

    // The partial should be a function
    expect(typeof partial).toBe('function');

    // Call the partial with the source
    const result = partial(source);

    // Verify the result is the expected final value
    expect(result).toBe('final-result');
  });
});