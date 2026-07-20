describe('Q', () => {
  it('should create an object with the given prototype using Object.create if it exists', () => {
    const Q = (function () {
      var object_create = Object.create || function (prototype) {
        function Type() { }
        Type.prototype = prototype;
        return new Type();
      };
      return function (prototype) {
        if (Object.create) {
          return Object.create(prototype);
        } else {
          return object_create(prototype);
        }
      };
    })();
    const prototype = { foo: 'bar' };
    const obj = Q(prototype);
    expect(Object.getPrototypeOf(obj)).toBe(prototype);
    Object.create = null;
    expect(() => Q(prototype)).toThrowError();
  });
});