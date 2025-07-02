import ClientDate from "./ClientDate";

function TopNavBar() {
  return (
    <div
      className="flex flex-col
     justify-center items-center w-full h-15 bg-green-700 text-white font-bold"
    >
      <ClientDate></ClientDate>
      <div>방문 날짜 및 시간 조절</div>
    </div>
  );
}

export default TopNavBar;
