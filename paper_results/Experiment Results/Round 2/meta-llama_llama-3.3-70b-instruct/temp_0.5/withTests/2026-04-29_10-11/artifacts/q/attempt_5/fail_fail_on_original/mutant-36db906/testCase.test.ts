import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.denodeify", () => {
    it("should return a function when given a valid callback", () => {
        const callback = function() {};
        const denodeified = Q.denodeify(callback);
        expect(typeof denodeified).toBe("function");
    });
});