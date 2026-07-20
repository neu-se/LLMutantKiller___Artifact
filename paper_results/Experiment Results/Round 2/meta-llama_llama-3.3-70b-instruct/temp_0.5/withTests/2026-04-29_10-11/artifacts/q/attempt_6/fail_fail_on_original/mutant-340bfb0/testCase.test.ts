import { Q, object_defineProperty } from "../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
    it("should throw an error when trying to define a property with an empty string as the property name", () => {
        const error = new Error();
        const promise = Q();
        expect(() => object_defineProperty(error, "", { value: promise.stackCounter, configurable: true })).toThrowError();
    });
});