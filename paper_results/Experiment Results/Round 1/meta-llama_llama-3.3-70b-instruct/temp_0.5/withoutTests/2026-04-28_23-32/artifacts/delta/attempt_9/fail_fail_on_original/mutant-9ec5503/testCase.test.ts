import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly compose deltas when the first operation of the other delta is null', () => {
    const delta1 = new Delta([{ retain: 5 }]);
    const delta2 = new Delta([null, { insert: 'Hello' }]);
    expect(() => delta1.compose(delta2)).toThrowError('no handlers for embed type "undefined"');
  });
});