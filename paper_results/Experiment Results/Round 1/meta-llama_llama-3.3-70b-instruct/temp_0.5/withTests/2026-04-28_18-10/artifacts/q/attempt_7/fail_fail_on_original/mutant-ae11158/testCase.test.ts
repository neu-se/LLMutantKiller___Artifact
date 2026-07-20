import { Q } from "../../../q";

describe("Q.nfapply function", () => {
    it("should throw an error when Q.nfapply does not call the callback function", () => {
        const originalNfapply = Q.nfapply;
        Q.nfapply = function () {};
        expect(() => Q.nfapply(() => {}, [])).toThrow();
        Q.nfapply = originalNfapply;
    });
});