import { JSDOM } from 'jsdom';

describe("Q", () => {
  it("should create a global Q object when run in a browser environment", () => {
    const dom = new JSDOM();
    const globalObject = dom.window;

    const q = require("../../../../../../../../subject_repositories/q/q.js")();

    expect(globalObject.Q).toBeDefined();
  });

  it("should not create a global Q object when run in a non-browser environment", () => {
    const dom = new JSDOM();
    const globalObject = dom.window;
    globalObject.window = "";
    globalObject.self = undefined;

    const q = require("../../../../../../../../subject_repositories/q/q.js")();

    expect(globalObject.Q).toBeUndefined();
  });
});