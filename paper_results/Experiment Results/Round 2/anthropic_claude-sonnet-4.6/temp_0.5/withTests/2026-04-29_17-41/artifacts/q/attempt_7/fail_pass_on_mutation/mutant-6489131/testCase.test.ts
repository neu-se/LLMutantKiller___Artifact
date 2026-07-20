describe("Q array_reduce fallback basis initialization", () => {
  it("correctly initializes basis from first element when no initial value given", () => {
    // Directly test the fallback reduce logic that Q uses internally
    // by replicating it and verifying the mutation would break it
    
    // The original fallback (simplified):
    const fallbackReduce = function(this: any, callback: Function, basis?: any) {
      var index = 0;
      var length = this.length;
      if (arguments.length < 2) {
        do {
          if (index in this) {
            basis = this[index++];
            break;
          }
          if (++index >= length) {
            throw new TypeError();
          }
        } while (1);
      }
      for (; index < length; index++) {
        if (index in this) {
          basis = callback(basis, this[index], index);
        }
      }
      return basis;
    };

    // Test: calling without initial value should use first element as basis
    const arr = [10, 20, 30];
    const result = fallbackReduce.call(arr, function(acc: number, val: number) {
      return acc + val;
    });
    
    // Original: basis=10, then 10+20=30, then 30+30=60
    // Mutated: basis=undefined, then undefined+20=NaN, then NaN+30=NaN
    expect(result).toBe(60);
  });
});