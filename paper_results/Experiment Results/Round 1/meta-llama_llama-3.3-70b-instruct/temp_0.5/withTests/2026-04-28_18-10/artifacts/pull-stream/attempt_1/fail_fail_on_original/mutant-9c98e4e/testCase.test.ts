import { count } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count";

describe('count function', () => {
  it('should return a different result when max is set to 5 with the original code and the mutated code', () => {
    const originalCount = count(5);
    const mutatedCount = count(5);

    // Create a mock implementation for the callback function
    const originalCb = jest.fn();
    const mutatedCb = jest.fn();

    // Call the original count function
    originalCount(null, originalCb);
    originalCount(null, originalCb);
    originalCount(null, originalCb);
    originalCount(null, originalCb);
    originalCount(null, originalCb);
    originalCount(null, originalCb);

    // Call the mutated count function
    mutatedCount(null, mutatedCb);
    mutatedCount(null, mutatedCb);
    mutatedCount(null, mutatedCb);
    mutatedCount(null, mutatedCb);
    mutatedCount(null, mutatedCb);
    mutatedCount(null, mutatedCb);

    // Assert that the original and mutated callbacks were called with different arguments
    expect(originalCb.mock.calls[5][0]).not.toEqual(mutatedCb.mock.calls[5][0]);
  });
});