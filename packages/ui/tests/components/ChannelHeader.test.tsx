import * as React from "react";
import * as renderer from "react-test-renderer";
import Header from "../../src/components/Channel/Header";

test("Link changes the class when hovered", () => {
  const component = renderer.create(
    <Header title="Recruiting channel" description="Find a job here!" />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
