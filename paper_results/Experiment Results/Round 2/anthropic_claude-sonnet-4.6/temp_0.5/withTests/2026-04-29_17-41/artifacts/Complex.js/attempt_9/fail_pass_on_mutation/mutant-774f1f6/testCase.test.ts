import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should set re from first arg when second arg is null", () => {
    // If condition is (b === null), original gives re=0, mutated gives re=0 too
    // If condition is (a === null), original gives re=5, im=null (from b!==undefined branch)
    const c = new Complex(5, null as any);
    // What should this be? If null branch doesn't fire for b=null,
    // then b!==undefined branch fires: re=5, im=null
    expect(c.re).toBe(5);
  });
});