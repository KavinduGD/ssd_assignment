import LeftRowA from "./leftRowA";
import MiddleB from "./middleB";
import MiddleC from "./middleC";
import MiddleD from "./middleD";
import MiddleE from "./middleE";
import LastF from "./lastF";
import LastG from "./lastG";
import "./dashboard.css";

function HomePage() {
  return (
    <div className="mx-2  h-full mt-3">
      <div className="dashboard-container">
        <div className="h-full w-full" style={{ gridArea: "a" }}>
          <LeftRowA />
        </div>
        <div className="h-full w-full" style={{ gridArea: "b" }}>
          <MiddleB />
        </div>
        <div className="h-full w-full" style={{ gridArea: "c" }}>
          <MiddleC />
        </div>
        <div className="h-full w-full" style={{ gridArea: "d" }}>
          <MiddleD />
        </div>
        <div className="h-full w-full" style={{ gridArea: "e" }}>
          <MiddleE />
        </div>
        <div className="h-full w-full" style={{ gridArea: "f" }}>
          <LastF />
        </div>
        <div className="h-full w-full" style={{ gridArea: "g" }}>
          <LastG />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
