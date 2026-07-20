import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should invert a delta with a retain operation on an object', () => {
    const delta = new Delta().retain({ embed: 1 });
    const base = new Delta().insert({ embed: null });
    expect(() => delta.invert(base)).toThrowError('embed types not matched: embed != undefined');
  });
});