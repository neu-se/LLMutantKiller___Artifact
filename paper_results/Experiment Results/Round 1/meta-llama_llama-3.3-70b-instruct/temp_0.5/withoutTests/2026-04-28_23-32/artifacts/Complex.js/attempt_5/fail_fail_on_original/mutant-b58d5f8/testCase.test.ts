import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when parsing null token', () => {
    const complex = new Complex(null);
    expect(complex.re).toBe(0);
    expect(complex.im).toBe(0);
    const tokens = null;
    expect(() => {
      const z = { 're': 0, 'im': 0 };
      var plus = 1;
      var minus = 0;
      for (var i = 0; i < tokens.length; i++) {
        var c = tokens[i];
        if (c === ' ' || c === '\t' || c === '\n') {
          /* void */
        } else if (c === '+') {
          plus++;
        } else if (c === '-') {
          minus++;
        } else if (c === 'i' || c === 'I') {
          if (plus + minus === 0) {
            throw new SyntaxError('Invalid Param');
          }
          if (tokens[i + 1] !== ' ' && !isNaN(tokens[i + 1])) {
            z['im'] += parseFloat((minus % 2 ? '-' : '') + tokens[i + 1]);
            i++;
          } else {
            z['im'] += parseFloat((minus % 2 ? '-' : '') + '1');
          }
          plus = minus = 0;
        } else {
          if (plus + minus === 0 || isNaN(c)) {
            throw new SyntaxError('Invalid Param');
          }
          if (tokens[i + 1] === 'i' || tokens[i + 1] === 'I') {
            z['im'] += parseFloat((minus % 2 ? '-' : '') + c);
            i++;
          } else {
            z['re'] += parseFloat((minus % 2 ? '-' : '') + c);
          }
          plus = minus = 0;
        }
      }
    }).toThrow(SyntaxError);
  });
});