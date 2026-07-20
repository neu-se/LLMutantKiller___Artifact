import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate the hypot function correctly for large numbers', () => {
    const largeNumber = 3001;
    const complexNumber = new Complex(largeNumber, largeNumber);
    const magnitude = complexNumber.abs();
    const manualCalculation = Math.sqrt(Math.pow(largeNumber, 2) + Math.pow(largeNumber, 2));
    expect(magnitude).toBeCloseTo(manualCalculation);
    const a = Math.abs(largeNumber);
    const b = Math.abs(largeNumber);
    if (a < b) {
      expect(complexNumber.abs()).toBeCloseTo(b * Math.sqrt(1 + Math.pow(a / b, 2)));
    } else {
      expect(complexNumber.abs()).toBeCloseTo(a * Math.sqrt(1 + Math.pow(b / a, 2)));
    }
  });
});