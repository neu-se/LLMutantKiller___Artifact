import { Complex } from '../complex';

describe('Complex', () => {
  it('should throw an error when sech is called with invalid this[""]', () => {
    const complex = new Complex(1, 0);
    const originalThisRe = complex['re'];
    complex['re'] = undefined;
    expect(() => complex.sech()).toThrowError();
    complex['re'] = originalThisRe;
  });
});