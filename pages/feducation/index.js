import fetch from "isomorphic-unfetch";

import FeducationPage from "../../components/FeducationPage";
import formatFeducationData from "../../utils/feducation";

const Page = ({ feducations }) => <FeducationPage feducations={feducations} />;

Page.getInitialProps = async ({ query, req }) => {
  const hostList = req ? `https://${req.headers.host}` : "";
  const resList = await fetch(`${hostList}/contentful/feducations`, {
    credentials: "same-origin"
  });
  const dataList = await resList.json();

  if (query && query.id) {
    const hostSelected = req ? `https://${req.headers.host}` : "";
    const resSelected = await fetch(
      `${hostSelected}/contentful/feducation/${query.id}`,
      {
        credentials: "same-origin"
      }
    );
    const dataSelected = await resSelected.json();
    const selectedItem = dataSelected.items[0];
    dataList.items.unshift(selectedItem);
  }

  return {
    feducations: dataList.items.map(item => formatFeducationData(item))
  };
};

export default Page;
