import TimeBar from "./TimeBar";
function TopNavBar() {
  return (
    <div
      className="flex flex-col
     justify-center items-center w-full h-full py-2.5 text-white font-bold"
    >
      <TimeBar></TimeBar>
    </div>
  );
}

export default TopNavBar;
