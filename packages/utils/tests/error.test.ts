import { HTTPError, stringifyError } from "@shlack/utils";

describe("Error tests", function () {
  test("stringifyError", () => {
    const e = new HTTPError(
      { status: 404, statusText: "Not Found" },
      "Mock error for testing"
    );
    const result = stringifyError("mock error for tests", e);
    expect(result.split("at").length).toBeGreaterThanOrEqual(5);
    expect(result).toContain("mock error for tests");
    expect(result).toContain("HTTPError [status: Not Found (404)]");
    expect(result).toContain("Mock error for testing");
  });
});
