import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("mutation test", () => {
    it("should detect the mutation", () => {
        const promise = Q.reject(new Error("Test Error"));
        const inspected = promise.inspect();
        if (inspected.state === "rejected") {
            expect(inspected.reason.message).toBe("Test Error");
        } else {
            expect(inspected.state).toBe("pending");
        }
    });
});