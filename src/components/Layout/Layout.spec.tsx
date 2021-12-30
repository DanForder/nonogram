import { customRender } from "../../utils/testUtils";
import Layout from "./Layout";

test("Renders Layout component", () => {
  const { container } = customRender(
    <Layout>
      <p>Layout child</p>
    </Layout>
  );
  expect(container).toMatchSnapshot();
});
