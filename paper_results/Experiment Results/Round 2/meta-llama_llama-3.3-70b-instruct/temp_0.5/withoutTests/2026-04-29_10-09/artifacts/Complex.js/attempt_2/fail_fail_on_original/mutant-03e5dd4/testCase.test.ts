import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should parse complex numbers correctly', () => {
    const complex = new Complex('3+4i');
    expect(complex.re).toBe(3);
    expect(complex.im).toBe(4);

    // Test with an empty string
    const parserExit = jest.fn();
    const originalParserExit = Complex.parser_exit;
    Complex.parser_exit = parserExit;
    const complexWithEmptyString = new Complex('');
    expect(parserExit).toHaveBeenCalledTimes(1);
    Complex.parser_exit = originalParserExit;
  });
});