import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate sech correctly and check the property name of im', () => {
    const complex = new Complex(1, 2);
    const proto = Object.getPrototypeOf(complex);
    const sechMethod = proto.sech;
    const imProperty = sechMethod.toString().match(/var\s+b\s*=\s*this\.(\w+)/);
    expect(imProperty).toBeDefined();
    expect(imProperty[1]).toBe('im');
  });
});