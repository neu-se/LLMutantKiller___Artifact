import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should correctly handle the mutation in the invert method', () => {
    const delta = new Delta().retain({ embed: 1 });
    const base = new Delta().insert({ embed: 1 });
    expect(() => delta.invert(base)).toThrowError('no handlers for embed type "embed"');
  });
});