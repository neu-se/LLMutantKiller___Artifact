import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q library behavior", () => {
    it("should throw an error when MessageChannel is defined but not handled", () => {
        // Arrange
        const originalMessageChannel = global.MessageChannel;
        global.MessageChannel = function () {
            return {
                port1: {
                    onmessage: jest.fn()
                },
                port2: {
                    postMessage: jest.fn()
                }
            };
        };

        // Act and Assert
        expect(() => Q()).toThrowError("This environment was not anticipated by Q. Please file a bug.");

        // Clean up
        global.MessageChannel = originalMessageChannel;
    });
});