import TimeBar from "./TimeBar";
import ClientDate from "./ClientDate";

function TopNavBar() {
  return (
    <div
      className="flex flex-col
     justify-center items-center w-full h-full py-2.5 text-white font-bold"
    >
      <ClientDate></ClientDate>
      <TimeBar></TimeBar>
    </div>
  );
}

export default TopNavBar;
