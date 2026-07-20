import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with source stream', () => {
  it('should handle streams with source function correctly', () => {
    const source = {
      source: true,
      someData: 'test'
    };

    const result = pull(source);

    expect(result).toBe(source);
  });
});