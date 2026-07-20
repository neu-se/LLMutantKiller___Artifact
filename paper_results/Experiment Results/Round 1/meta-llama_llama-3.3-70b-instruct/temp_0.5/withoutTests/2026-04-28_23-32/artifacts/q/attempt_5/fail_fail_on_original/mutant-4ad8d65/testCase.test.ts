import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should throw an error when dispatching an empty string", () => {
        const object = {
            dispatch: jest.fn(() => {
                throw new Error("Invalid operation");
            }),
        };
        const promise = Q(object);
        expect(() => promise.fcall("test")).toThrowError("Invalid operation");
    });
});