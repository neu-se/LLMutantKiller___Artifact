import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error when calling diff with a condition that is always true', () => {
    const delta1 = new Delta();
    const delta2 = new Delta();
    const originalCodeCondition = delta1 === delta2 ? 'on' : 'with';
    const mutatedCodeCondition = true ? 'on' : 'with';
    if (originalCodeCondition !== mutatedCodeCondition) {
      expect(() => delta1.diff(delta2)).toThrowError();
    } else {
      expect(() => delta1.diff(delta2)).not.toThrowError();
    }
  });
});