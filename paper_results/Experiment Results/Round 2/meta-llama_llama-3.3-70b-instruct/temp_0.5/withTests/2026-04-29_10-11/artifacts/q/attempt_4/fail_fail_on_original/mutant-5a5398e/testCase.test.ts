import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify", () => {
    it("should return a function when given a defined function", () => {
        const denodeifiedFunction = Q.denodeify(function testFunction() {});
        expect(typeof denodeifiedFunction).toBe("function");
    });

    it("should throw an error when called with an undefined function", () => {
        const denodeify = Q.denodeify;
        expect(() => denodeify(undefined)()).toThrowError();
    });
});