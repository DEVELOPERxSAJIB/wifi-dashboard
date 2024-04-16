import { ColorRing } from "react-loader-spinner";

const MainLoader = () => {
  return (
    <div className="loader">
      <ColorRing
        visible={true}
        height="100"
        width="100"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#685DD8", "#8277F2", "#9289F3", "#9C94F4", "#9C94F4"]}
      />
    </div>
  );
};

export default MainLoader;
