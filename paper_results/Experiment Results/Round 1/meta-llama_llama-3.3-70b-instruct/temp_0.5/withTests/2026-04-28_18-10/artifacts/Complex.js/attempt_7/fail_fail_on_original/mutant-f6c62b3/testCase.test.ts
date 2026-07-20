const code = `
  Object.defineProperty(Complex, "__esModule", { 'value': true });
  Complex.__esModule === true;
`;

const mutatedCode = `
  Object.defineProperty(Complex, "", { 'value': true });
  Complex[""] === true;
`;

describe('Complex.js', () => {
  it('should not have an empty string property', () => {
    expect(eval(code)).toBe(true);
    expect(eval(mutatedCode)).toBe(true);
  });
});