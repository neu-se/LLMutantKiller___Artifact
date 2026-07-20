import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() should not call fast-diff when the two input Deltas are the same', () => {
    const delta1 = new Delta().insert('Hello, World!');
    const delta2 = new Delta().insert('Hello, World!');
    const fastDiffSpy = jest.spyOn(require('fast-diff'), 'default');
    delta1.diff(delta2);
    expect(fastDiffSpy).not.toHaveBeenCalled(); // This line should fail on the mutated code
  });
});