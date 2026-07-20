describe('Q', () => {
  it('should create an object with the given prototype using Object.create if it exists', () => {
    const Q = (function () {
      var object_create = Object.create || function (prototype: any) {
        function Type() { }
        Type.prototype = prototype;
        return new Type();
      };
      return function (prototype: any) {
        if (Object.create) {
          return Object.create(prototype);
        } else {
          return object_create(prototype);
        }
      };
    })();
    const prototype = { foo: 'bar' };
    Object.create = null as any;
    const obj = Q(prototype);
    expect(Object.getPrototypeOf(obj)).toBe(prototype);
  });
});