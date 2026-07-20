import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex cosh fallback', () => {
  it('uses 1-x approximation for small x values in cosh fallback', async () => {
    const originalCosh = Math.cosh;
    (Math as any).cosh = undefined;
    
    jest.resetModules();
    
    const ComplexModule = await import('../../../../../../../../../../../subject_repositories/Complex.js/complex.js');
    const ComplexFresh = (ComplexModule as any).default || ComplexModule;
    
    // b = -5e-10 is a small negative value
    // Original cosh fallback: 1 - b = 1 - (-5e-10) = 1 + 5e-10
    // Mutated cosh fallback: (exp(b) + exp(-b))/2 ≈ 1.000000000000000125
    const b = -5e-10;
    const c = new ComplexFresh(Math.PI / 2, b);
    const result = c.sin();
    
    (Math as any).cosh = originalCosh;
    
    // sin(π/2 + bi) = sin(π/2)*cosh(b) + i*cos(π/2)*sinh(b)
    // ≈ cosh(b) + 0i
    // Original: cosh(b) = 1 - b = 1 + 5e-10
    // Mutated: cosh(b) = (exp(-5e-10) + exp(5e-10))/2 ≈ 1 + 1.25e-19
    
    const originalCoshValue = 1 - b; // = 1 + 5e-10
    expect(result.re).toBeCloseTo(originalCoshValue, 15);
  });
});