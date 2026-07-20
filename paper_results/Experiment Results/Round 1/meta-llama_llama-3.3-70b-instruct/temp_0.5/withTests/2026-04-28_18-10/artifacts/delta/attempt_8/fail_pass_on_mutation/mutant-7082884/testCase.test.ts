import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() should return an empty Delta when the two input Deltas are the same', () => {
    const delta1 = new Delta().insert('Hello, World!');
    const delta2 = new Delta().insert('Hello, World!');
    const result = delta1.diff(delta2);
    expect(result).toEqual(new Delta());
    const diffSpy = jest.fn();
    Delta.prototype.diff = function() {
      diffSpy();
      return new Delta();
    };
    const delta3 = new Delta().insert('Hello, World!');
    const delta4 = new Delta().insert('Hello, World!');
    const result2 = delta3.diff(delta4);
    expect(diffSpy).toHaveBeenCalledTimes(1);
    expect(result2).toEqual(new Delta());
  });
});