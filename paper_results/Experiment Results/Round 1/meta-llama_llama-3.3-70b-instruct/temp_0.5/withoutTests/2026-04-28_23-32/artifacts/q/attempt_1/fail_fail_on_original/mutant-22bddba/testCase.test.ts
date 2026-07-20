import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should create a global Q object when executed as a script', () => {
        // Create a new window object to test the behavior in a non-windowed context
        const window = globalThis;
        const self = globalThis;

        // Execute the Q function
        const Q = (function (definition) {
            //... (rest of the Q function remains the same)
        })(function () {
            //... (rest of the Q function remains the same)
        });

        // Check if the Q object is created on the window object
        expect(window.Q).toBeDefined();
    });
});