import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("QReturnValue", () => {
    it("should throw an error when trying to create a new QReturnValue instance", () => {
        expect(() => {
            new Q.QReturnValue();
        }).toThrowError();
    });
});