import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
    it("should throw an error when trying to set a property on an error object with an empty string as the property name", () => {
        const error = new Error();
        const promise = Q();
        expect(() => {
            object_defineProperty(error, "", { value: promise.stackCounter, configurable: true });
        }).toThrowError();
    });
});