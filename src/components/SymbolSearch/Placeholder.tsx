import Search from "../../assets/Search";

const Placeholder = () => {
  return (
    <div
      className="text-gray-600 absolute flex flex-row items-center"
    >
      <Search className="mr-2" />
      <div>Search symbol</div>
    </div>
  );
};

export default Placeholder;
