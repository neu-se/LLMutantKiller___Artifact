import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function behavior', () => {
  it('should handle function with length !== 1 correctly', () => {
    const funcWithLength2 = (a, b) => b;
    const mockSink = { sink: jest.fn(), source: jest.fn() };

    // In original code, this should NOT create partial application
    // because funcWithLength2.length === 2
    // In mutated code, it would incorrectly enter partial application
    // because the condition becomes "if (true && a.length === 1)"
    const result = pull(funcWithLength2, mockSink);

    // Original behavior: processes normally
    expect(typeof result).not.toBe('function');
    expect(mockSink.sink).toHaveBeenCalledWith(funcWithLength2);
  });
});