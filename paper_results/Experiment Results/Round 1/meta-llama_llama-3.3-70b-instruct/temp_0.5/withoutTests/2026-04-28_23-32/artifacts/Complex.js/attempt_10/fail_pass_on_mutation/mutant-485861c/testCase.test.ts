const complexCode = `
  var z = { 're': 0, 'im': 0 };
  if (typeof a === 'undefined' || a === null) {
    z['re'] = 0;
  }
`;

const mutatedCode = `
  var z = { 're': 0, 'im': 0 };
  if (typeof a === 'undefined' || a === null) {
    z[""] = 0;
  }
`;

describe('Complex', () => {
  it.skip('should initialize re property when created with undefined input', () => {
    const a = undefined;
    eval(complexCode);
    expect(z.re).toBe(0);
  });

  it('should throw an error when trying to access a non-existent property', () => {
    const a = undefined;
    eval(mutatedCode);
    expect(() => z[""]).toThrowError();
  });
});