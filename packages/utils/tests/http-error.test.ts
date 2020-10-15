import { HTTPError, HTTPErrorKind } from "@shlack/utils";

describe("HTTPError tests", function () {
  test("creation", () => {
    const e = new HTTPError(
      { status: 404, statusText: "Not Found" },
      "Mock error for testing"
    );
    expect(e.kind).toBe(HTTPErrorKind.Client);
  });
});
