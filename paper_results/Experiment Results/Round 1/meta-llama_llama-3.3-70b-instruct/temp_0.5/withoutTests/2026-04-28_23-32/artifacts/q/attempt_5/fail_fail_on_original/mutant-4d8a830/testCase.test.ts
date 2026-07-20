describe('Q', () => {
  it('should handle post method with null or undefined name', async () => {
    const obj = {
      post: function(name, args) {
        if (name === null || name === void 0) {
          return this.apply(void 0, args);
        } else {
          return this[name].apply(this, args);
        }
      },
      apply: function(thisArg, argArray) {
        return "apply called";
      },
      foo: function() {
        return "foo called";
      }
    };

    const promise = Q(obj);
    const result1 = await promise.post(null, []);
    const result2 = await promise.post(void 0, []);
    const result3 = await promise.post("foo", []);

    expect(result1).toBe("apply called");
    expect(result2).toBe("apply called");
    expect(result3).toBe("foo called");
  });
});