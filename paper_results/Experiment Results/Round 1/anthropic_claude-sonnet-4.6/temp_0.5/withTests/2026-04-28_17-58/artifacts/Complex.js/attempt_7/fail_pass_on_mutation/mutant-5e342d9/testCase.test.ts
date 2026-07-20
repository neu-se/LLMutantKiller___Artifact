import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js hypot large value branch", () => {
  it("abs result for large values matches scaled result from small values", () => {
    // If mutation changes a=b to b=x*y (placeholder), then a stays as Math.abs(x)
    // instead of being reassigned to Math.abs(y) (the smaller value)
    // For (5000, 3000): 
    //   Original (a=b): a=3000, b=5000/3000=5/3, result=3000*sqrt(1+25/9)=3000*(sqrt(34)/3)=1000*sqrt(34)≈5831
    //   Mutated (b=x*y): a=5000, b=5000/3000=5/3, result=5000*sqrt(34/9)≈9718
    //   Small path: sqrt(5000^2+3000^2)=sqrt(34000000)≈5831
    const large = new Complex(5000, 3000);
    const small = new Complex(500, 300); // same ratio, below 3000 threshold
    // small.abs() uses direct sqrt, large.abs() uses hypot large-value branch
    // They should be proportional by factor of 10
    expect(large.abs()).toBeCloseTo(small.abs() * 10, 3);
  });
});