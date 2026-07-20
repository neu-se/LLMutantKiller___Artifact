import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acot mutation detection', () => {
  it('detects mutation: re passed to atan should be Infinity not 0 when d=0', () => {
    const tiny = Number.MIN_VALUE;
    const reValues: number[] = [];
    
    // Direct prototype replacement (not jest.spyOn)
    const proto = Object.getPrototypeOf(new (Complex as any)());
    const origAtan = proto['atan'];
    proto['atan'] = function(this: any) {
      reValues.push(this['re']);
      return origAtan.call(this);
    };
    
    try {
      new (Complex as any)(tiny, tiny).acot();
    } finally {
      proto['atan'] = origAtan;
    }
    
    expect(reValues.length).toBeGreaterThan(0);
    expect(reValues[0]).toBe(Infinity);
  });
});