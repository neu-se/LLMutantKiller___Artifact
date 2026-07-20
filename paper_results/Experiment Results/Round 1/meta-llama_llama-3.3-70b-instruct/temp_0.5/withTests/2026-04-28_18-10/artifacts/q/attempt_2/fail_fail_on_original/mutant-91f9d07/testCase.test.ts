import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify", () => {
    it("should return a function that calls the callback with the correct arguments", () => {
        const callback = jest.fn();
        const denodeified = Q.denodeify(callback);
        denodeified(1, 2, 3);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(1, 2, 3);
    });
});