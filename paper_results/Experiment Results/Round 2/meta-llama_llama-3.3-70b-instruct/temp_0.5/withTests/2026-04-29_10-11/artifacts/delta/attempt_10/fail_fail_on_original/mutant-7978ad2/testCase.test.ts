import AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('diff() should handle b that is not an object', () => {
    const a = { bold: true, color: 'red' };
    const b = { bold: true, color: 'red' };
    expect(AttributeMap.diff(a, b)).toBeUndefined();
    const c = { bold: true, color: 'blue', font: 'Arial' };
    expect(AttributeMap.diff(a, c)).toEqual({ color: 'blue', font: 'Arial' });
    const d = { bold: true, color: 'blue', font: null };
    expect(AttributeMap.diff(a, d)).toEqual({ color: 'blue', font: null });
    const e = { bold: true, color: 'blue' };
    expect(AttributeMap.diff(a, e)).toEqual({ color: 'blue' });
    const f = {};
    expect(AttributeMap.diff(a, f)).toEqual({ bold: null, color: null });
    const g = 'string';
    expect(() => AttributeMap.diff(a, g)).toThrowError();
  });
});