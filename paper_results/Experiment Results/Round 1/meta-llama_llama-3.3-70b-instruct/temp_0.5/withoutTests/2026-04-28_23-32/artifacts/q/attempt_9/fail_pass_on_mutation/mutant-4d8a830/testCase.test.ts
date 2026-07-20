describe('Q', () => {
  it('should handle post method with null or undefined name', async () => {
    const obj = {
      post: function(this: any, name: string | null | undefined, args: any[]) {
        if (name === null || name === void 0) {
          return this.apply(void 0, args);
        } else {
          return this[name] && this[name].apply(this, args);
        }
      },
      apply: function(this: any, thisArg: any, argArray: any[]) {
        return "apply called";
      },
      foo: function(this: any) {
        return "foo called";
      }
    };

    const promise = obj;
    const result1 = await promise.post(null, []);
    const result2 = await promise.post(void 0, []);
    const result3 = await promise.post("foo", []);

    expect(result1).toBe("apply called");
    expect(result2).toBe("apply called");
    expect(result3).toBe("foo called");
  });
});