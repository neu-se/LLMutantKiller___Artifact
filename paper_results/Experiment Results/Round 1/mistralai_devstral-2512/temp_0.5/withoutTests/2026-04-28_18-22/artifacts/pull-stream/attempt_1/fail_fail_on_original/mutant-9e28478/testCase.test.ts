import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with two arguments', () => {
  it('should correctly handle partial application with two arguments', () => {
    const mockRead = jest.fn();
    const mockSink1 = jest.fn().mockReturnValue('sink1');
    const mockSink2 = jest.fn().mockReturnValue('sink2');

    const partial = pull(mockSink1, mockSink2);
    const result = partial(mockRead);

    expect(mockRead).toHaveBeenCalledTimes(1);
    expect(result).toBe('sink2');
  });
});