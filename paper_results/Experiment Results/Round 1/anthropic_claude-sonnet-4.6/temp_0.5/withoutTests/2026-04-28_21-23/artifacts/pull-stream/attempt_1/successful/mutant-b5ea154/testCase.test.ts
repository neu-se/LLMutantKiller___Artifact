import map from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/map.js"

describe("map through", () => {
  it("should return identity function when no mapper is provided (falsy mapper)", (done) => {
    // Create a simple source that emits values
    const values = [1, 2, 3];
    let index = 0;
    
    const source = (abort: any, cb: Function) => {
      if (abort || index >= values.length) {
        cb(true, null);
      } else {
        cb(null, values[index++]);
      }
    };

    // Call map with no argument (undefined/falsy mapper)
    // In original code: if(!mapper) return id, so it returns identity function
    // In mutated code: if(false) return id, so it never returns id and proceeds to prop(undefined)
    const through = map(undefined);
    
    // If original: through should be the identity function 'id'
    // If mutated: through will be a function that calls prop(undefined) which may behave differently
    
    const result: number[] = [];
    
    // The identity function 'id' just returns its argument (a read function)
    // So through(source) should equal source itself
    const sink = through(source);
    
    const read = () => {
      sink(null, (end: any, data: any) => {
        if (end) {
          // In original: we should have collected all values unchanged
          expect(result).toEqual([1, 2, 3]);
          done();
          return;
        }
        result.push(data);
        read();
      });
    };
    
    read();
  });
});