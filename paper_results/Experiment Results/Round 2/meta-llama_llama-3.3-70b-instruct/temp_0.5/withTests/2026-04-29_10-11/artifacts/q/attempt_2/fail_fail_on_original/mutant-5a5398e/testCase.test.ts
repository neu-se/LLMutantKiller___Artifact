import { Q } from "../../../../../q.js";

describe("Q.denodeify", () => {
    it("should throw an error when given an undefined function", () => {
        const denodeify = Q.denodeify;
        expect(() => denodeify()).toThrowError();
    });
});