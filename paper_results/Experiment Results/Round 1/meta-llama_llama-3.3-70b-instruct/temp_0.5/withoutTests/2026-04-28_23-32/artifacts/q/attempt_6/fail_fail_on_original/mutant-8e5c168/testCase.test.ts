import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q promise", () => {
  it("should throw an error when the resolver function does not call resolve or reject", () => {
    const resolver = function(resolve: any, reject: any) {
    };
    expect(() => Q(resolver)).toThrowError("Cannot read properties of undefined (reading 'then')");
  });
});