import { AttributeMap } from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('diff function should handle the case where b is not an object', () => {
    const a = { bold: true, color: 'red' };
    const b = 'not an object';
    expect(() => AttributeMap.diff(a, b)).toThrowError(
      'b must be an object or undefined',
    );
  });
});