const complexCode = `
  /**
   * @constructor
   * @returns {Complex}
   */
  function Complex(a, b) {
    if (!(this instanceof Complex)) {
      return new Complex(a, b);
    }
    var z = parse(a, b);
    this['re'] = z['re'];
    this['im'] = z['im'];
  }

  Complex.prototype = {
    're': 0,
    'im': 0,
    'add': function(a, b) {
      var z = new Complex(a, b);
      return new Complex(
        this['re'] + z['re'],
        this['im'] + z['im']);
    }
  };

  var parse = function(a, b) {
    var z = { 're': 0, 'im': 0 };
    if (a === undefined || a === null) {
      z['re'] = z['im'] = 0;
    } else if (b !== undefined) {
      z['re'] = a;
      z['im'] = b;
    } else
      switch (typeof a) {
        case 'object':
          if ('im' in a && 're' in a) {
            z['re'] = a['re'];
            z['im'] = a['im'];
          } else if ('abs' in a && 'arg' in a) {
            if (!Number.isFinite(a['abs']) && Number.isFinite(a['arg'])) {
              return Complex['INFINITY'];
            }
            z['re'] = a['abs'] * Math.cos(a['arg']);
            z['im'] = a['abs'] * Math.sin(a['arg']);
          } else if ('r' in a && 'phi' in a) {
            if (!Number.isFinite(a['r']) && Number.isFinite(a['phi'])) {
              return Complex['INFINITY'];
            }
            z['re'] = a['r'] * Math.cos(a['phi']);
            z['im'] = a['r'] * Math.sin(a['phi']);
          } else if (a.length === 2) { 
            z['re'] = a[0];
            z['im'] = a[1];
          } else {
            throw new SyntaxError('Invalid Param');
          }
          break;
        case 'string':
          z['im'] = 0;
          z['re'] = 0;
          var tokens = a.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g);
          var plus = 1;
          var minus = 0;
          if (tokens === null) {
            throw new SyntaxError('Invalid Param');
          }
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
                parser_exit();
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
                parser_exit();
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
          if (plus + minus > 0) {
            parser_exit();
          }
          break;
        case 'number':
          z['im'] = 0;
          z['re'] = a;
          break;
        default:
          parser_exit();
      }
    if (isNaN(z['re']) || isNaN(z['im'])) {
      throw new SyntaxError('Invalid Param');
    }
    return z;
  };

  function parser_exit() {
    throw new SyntaxError('Invalid Param');
  }

  Complex['INFINITY'] = new Complex(Infinity, Infinity);
  Complex['EPSILON'] = 1e-15;

  function Complex(a, b) {
    if (!(this instanceof Complex)) {
      return new Complex(a, b);
    }
    var z = parse(a, b);
    this['re'] = z['re'];
    this['im'] = z['im'];
  }

  Complex.prototype = {
    're': 0,
    'im': 0,
    'add': function(a, b) {
      var z = new Complex(a, b);
      return new Complex(
        this['re'] + z['re'],
        this['im'] + z['im']);
    }
  };

  var parser_exit = function() {
    throw new SyntaxError('Invalid Param');
  };

  eval(complexCode);

  describe('Complex', () => {
    it('should correctly parse complex numbers from strings', () => {
      const complex = new Complex('1+1i');
      expect(complex.re).toBeCloseTo(1);
      expect(complex.im).toBeCloseTo(1);
    });

    it('should correctly parse complex numbers from strings with negative imaginary part', () => {
      const complex = new Complex('1-1i');
      expect(complex.re).toBeCloseTo(1);
      expect(complex.im).toBeCloseTo(-1);
    });

    it('should correctly parse complex numbers from strings with negative real part', () => {
      const complex = new Complex('-1+1i');
      expect(complex.re).toBeCloseTo(-1);
      expect(complex.im).toBeCloseTo(1);
    });

    it('should correctly parse complex numbers from strings with negative real and imaginary parts', () => {
      const complex = new Complex('-1-1i');
      expect(complex.re).toBeCloseTo(-1);
      expect(complex.im).toBeCloseTo(-1);
    });
  });