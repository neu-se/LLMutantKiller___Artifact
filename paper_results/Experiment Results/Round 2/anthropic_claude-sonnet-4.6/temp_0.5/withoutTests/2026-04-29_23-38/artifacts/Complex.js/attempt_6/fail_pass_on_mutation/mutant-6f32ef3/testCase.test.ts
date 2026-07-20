import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex toString', () => {
  it('should format 3 + 0i correctly without trailing space', () => {
    // When a != 0 and b is zeroed to 0, early return gives "3" not "3 -0i"
    // The inner if(b <= 0) in original would trigger for b=0, adding " -"
    // but early return prevents reaching it
    const c = new Complex(3, 1e-16); // b gets zeroed to 0
    expect(c.toString()).toBe('3');
  });
});