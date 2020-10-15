import * as React from "react";
import * as renderer from "react-test-renderer";
import Footer from "../../src/components/Channel/Footer";

test("Link changes the class when hovered", () => {
  const component = renderer.create(
    <Footer
      channel={{ name: "recruiting", description: "", id: "", teamId: "" }}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
