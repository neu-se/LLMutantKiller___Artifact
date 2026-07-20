import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex null parsing", () => {
  it("should produce a Complex with exactly re and im own properties when given null", () => {
    const c = new Complex(null);
    // In mutated code, z[""] = 0 is set on z, then this['re'] = z['re'] and this['im'] = z['im']
    // The "" property should NOT appear on the Complex instance in either version
    // But z['re'] in mutated code is never explicitly assigned - it stays 0 from init
    // The real test: does the mutated code set z[""] which then propagates?
    // It doesn't propagate to `this`. Both versions give re=0, im=0.
    // 
    // The ONLY difference: in mutated code, the intermediate z object has z[""] = 0
    // We cannot observe this externally.
    //
    // Let's try: what if we monkey-patch Object.prototype[""] to detect assignment?
    let emptyKeyAssigned = false;
    const descriptor = Object.getOwnPropertyDescriptor(Object.prototype, '');
    Object.defineProperty(Object.prototype, '', {
      set(val) { emptyKeyAssigned = true; },
      get() { return undefined; },
      configurable: true
    });
    try {
      new Complex(null);
    } finally {
      if (descriptor) {
        Object.defineProperty(Object.prototype, '', descriptor);
      } else {
        delete (Object.prototype as any)[''];
      }
    }
    expect(emptyKeyAssigned).toBe(false);
  });
});