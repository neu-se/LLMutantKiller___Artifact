import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("detects mutation by verifying acosh result re component changes correctly in else branch", () => {
    // Find input where acos returns im > 0 by trying z = -0.5 - 0.5i
    const testInputs = [
      new Complex(-0.5, -0.5),
      new Complex(0.5, -0.5),
      new Complex(-1, -1),
      new Complex(1, -1),
    ];
    
    let foundElseBranch = false;
    for (const z of testInputs) {
      const acosRes = z.acos();
      if (acosRes.im > 0) {
        foundElseBranch = true;
        const acoshRes = z.acosh();
        // Original: re = old_im_acos, im = -old_re_acos
        // Mutated:  re = old_re_acos,  im = -old_re_acos
        // They differ when old_re_acos != old_im_acos
        expect(acoshRes.re).toBeCloseTo(acosRes.im, 8);
        break;
      }
    }
    
    expect(foundElseBranch).toBe(true);
  });
});