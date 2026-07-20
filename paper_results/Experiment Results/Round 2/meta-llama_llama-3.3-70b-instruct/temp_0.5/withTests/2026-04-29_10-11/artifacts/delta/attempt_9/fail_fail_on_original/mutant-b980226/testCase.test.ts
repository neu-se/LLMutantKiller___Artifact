import * as AttributeMap from '../../../../../../../../../../../subject_repositories/delta/src/AttributeMap';

describe('AttributeMap', () => {
  it('transform function with return true', () => {
    const a = { bold: true, color: 'red', font: null };
    const b = { color: 'blue', font: 'serif', italic: true };
    const attributes = Object.keys(b).reduce((attrs, key) => {
      if (a[key] === undefined && b[key]!== undefined) {
        attrs[key] = b[key];
      }
      return attrs;
    }, {});
    expect(attributes).toEqual(b);
  });
});