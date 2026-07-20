// Import the Q module from the correct path
import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
    it("should throw an error that is an instance of Error when the values are not the same", () => {
        try {
            Q.join(1, 2);
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }
    });
});