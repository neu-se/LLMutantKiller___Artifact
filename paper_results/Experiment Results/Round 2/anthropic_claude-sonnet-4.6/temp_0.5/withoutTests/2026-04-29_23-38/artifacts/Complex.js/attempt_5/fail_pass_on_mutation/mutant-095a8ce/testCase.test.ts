import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc zero input special case", () => {
  it("acsc(0+0i).re should equal PI/2", () => {
    const z = new Complex(0, 0);
    const result = (z as any).acsc();
    // In original: special case returns Complex(PI/2, Infinity), so re = PI/2 ≈ 1.5707...
    // In mutated: if(false) skips special case; d=0, a=0, b=0 -> asin(0,0) -> re=0
    const piOver2 = Math.PI / 2;
    expect(Math.abs(result.re - piOver2)).toBeLessThan(1e-10);
  });
});