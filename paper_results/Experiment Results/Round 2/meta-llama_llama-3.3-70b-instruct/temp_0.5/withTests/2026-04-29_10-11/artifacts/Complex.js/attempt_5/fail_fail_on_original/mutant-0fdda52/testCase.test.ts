import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate the magnitude of a complex number correctly for large numbers', () => {
    const largeNumber = 3001;
    const complexNumber = new Complex(largeNumber, largeNumber);
    const magnitude = complexNumber.abs();
    const manualCalculation = Math.sqrt(Math.pow(largeNumber, 2) + Math.pow(largeNumber, 2));
    expect(magnitude).toBeCloseTo(manualCalculation);
  });
});