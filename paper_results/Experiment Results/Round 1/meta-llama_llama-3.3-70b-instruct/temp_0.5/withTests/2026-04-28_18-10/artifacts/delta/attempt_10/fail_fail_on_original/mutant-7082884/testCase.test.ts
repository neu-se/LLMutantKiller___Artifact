import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() should return a Delta with ops when the two input Deltas are different', () => {
    const delta1 = new Delta().insert('Hello, World!');
    const delta2 = new Delta().insert('Hello, Universe!');
    const result = delta1.diff(delta2);
    expect(result.ops.length).toBeGreaterThan(0);
    const delta3 = new Delta().insert('Hello, World!');
    const delta4 = new Delta().insert('Hello, Universe!');
    const diffSpy = jest.fn((a, b) => {
      diffSpy.mockImplementation(() => [[0, 'Hello, World!'], [1, 'Hello, Universe!']]);
      return [[0, 'Hello, World!'], [1, 'Hello, Universe!']];
    });
    const diff = require('fast-diff');
    diff.default = diffSpy;
    const result2 = delta3.diff(delta4);
    expect(result2.ops.length).toBeGreaterThan(0);
    expect(diffSpy).toHaveBeenCalledTimes(1);
  });
});