import { Complex } from './complex.js';

describe('Complex', () => {
  it('should throw an error when creating a complex number with an object that only has one of "re" or "im" properties', () => {
    const parser_exit = jest.fn();
    const originalParserExit = Complex.parser_exit;
    Complex.parser_exit = parser_exit;
    expect(() => new Complex({ re: 1 })).toThrow();
    expect(parser_exit).toHaveBeenCalledTimes(1);
    Complex.parser_exit = originalParserExit;
  });
});