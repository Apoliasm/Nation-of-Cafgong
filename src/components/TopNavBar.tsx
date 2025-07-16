import AdjustBar from "./AdjustBar";
import ClientDate from "./ClientDate";

function TopNavBar() {
  return (
    <div
      className="flex flex-col
     justify-center items-center w-full h-full py-2.5 bg-green-700 text-white font-bold"
    >
      <ClientDate></ClientDate>
      <AdjustBar></AdjustBar>
    </div>
  );
}

export default TopNavBar;
