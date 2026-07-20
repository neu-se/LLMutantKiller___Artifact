import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate sech correctly and check the type of im', () => {
    const complex = new Complex(1, 2);
    const sech = complex.sech();
    expect(sech.re).not.toBeNaN();
    expect(sech.im).not.toBeNaN();
    const proto = Object.getPrototypeOf(complex);
    const sechMethod = proto.sech;
    const imType = sechMethod.toString().match(/var\s+b\s*=\s*this\.(\w+)/);
    expect(imType).toBeDefined();
    expect(imType[1]).toBe('im');
  });
});