// Test case to detect the mutation in q.js
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise inspection", () => {
    it("should return an object with state property when inspecting a promise created with Promise constructor without inspect parameter", () => {
        // Create a promise using Q.Promise with only descriptor parameter
        // This will use the default inspect function that's affected by the mutation
        const promise = Q.Promise({
            "when": function () {
                return 42;
            }
        });

        const inspection = promise.inspect();
        expect(inspection).toBeDefined();
        expect(typeof inspection).toBe("object");
        expect("state" in inspection).toBe(true);
        expect(inspection.state).toBe("unknown");
    });
});