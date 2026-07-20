import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('diff() should optimize when the two input Deltas are the same', () => {
    const delta1 = new Delta().insert('Hello, World!');
    const delta2 = new Delta().insert('Hello, World!');
    const result = delta1.diff(delta2);
    const strings = [delta1, delta2].map((delta) => {
      return delta
       .map((op) => {
          if (op.insert!= null) {
            return typeof op.insert === 'string'? op.insert : '\0';
          }
          throw new Error('diff() called on non-document');
        })
       .join('');
    });
    expect(strings[0]).toBe('Hello, World!');
    expect(strings[1]).toBe('Hello, World!');
    expect(result.ops.length).toBe(0);
    const diffSpy = jest.fn((a, b) => {
      diffSpy.mockImplementation(() => [[0, 'Hello, World!'], [1, 'Hello, World!']]);
      return [[0, 'Hello, World!'], [1, 'Hello, World!']];
    });
    const diff = require('fast-diff');
    diff.default = diffSpy;
    const result2 = delta1.diff(delta2);
    expect(diffSpy).not.toHaveBeenCalled();
  });
});