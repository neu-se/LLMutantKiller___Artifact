import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q post method", () => {
    it("should dispatch with the correct operation name", () => {
        const object = {
            post: jest.fn(),
        };
        const name = "test";
        const args = ["arg1", "arg2"];
        Q.post(object, name, args);
        expect(object.post).toHaveBeenCalledTimes(1);
        expect(object.post).toHaveBeenCalledWith(name, args);
    });
});