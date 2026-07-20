import Delta from "../src/Delta";

describe("Delta compose", () => {
  it("should correctly compose when other starts with an object retain", () => {
    // Register a simple embed handler
    Delta.registerEmbed("image", {
      compose: (a: any, b: any, keepNull: boolean) => ({ ...a, ...b }),
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => b,
    });
    
    const a = new Delta().insert({ image: { src: "a.png" } }).insert("hello");
    const b = new Delta().retain({ image: { src: "b.png" } }).retain(5);
    
    const result = a.compose(b);
    // Expected: insert the composed image, then insert "hello"
    expect(result).toEqual(new Delta().insert({ image: { src: "b.png" } }).insert("hello"));
    
    Delta.unregisterEmbed("image");
  });
});