import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should have a 'catch' property", () => {
        expect(Q["catch"]).toBeInstanceOf(Function);
    });
});