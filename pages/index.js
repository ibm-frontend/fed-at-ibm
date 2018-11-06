import fetch from "isomorphic-unfetch";

import FeducationPage from "../components/FeducationPage";

const Page = ({ feducations }) => <FeducationPage feducations={feducations} />;

Page.getInitialProps = async ({ req }) => {
  const host = req ? `https://${req.headers.host}` : "";
  const res = await fetch(`${host}/contentful/feducations`, {
    credentials: "same-origin"
  });
  const data = await res.json();
  return {
    feducations: data.items.map(item => {
      return { ...item.fields, id: item.sys.id };
    })
  };
};

export default Page;
