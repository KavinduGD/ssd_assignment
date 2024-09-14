import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Nov",
    London: 2400,
    Manchester: 2600,
    Birmingham: 3400,
    Liverpool: 6369,
  },
  {
    name: "Dec",
    London: 3400,
    Manchester: 2550,
    Birmingham: 1400,
    Liverpool: 4529,
  },
  {
    name: "Jan",
    London: 1800,
    Manchester: 2800,
    Birmingham: 4400,
    Liverpool: 1869,
  },
  {
    name: "Feb",
    London: 4580,
    Manchester: 2300,
    Birmingham: 2400,
    Liverpool: 2454,
  },
  {
    name: "Mar",
    London: 4500,
    Manchester: 6400,
    Birmingham: 2800,
    Liverpool: 3389,
  },
  {
    name: "Apr",
    London: 4000,
    Manchester: 2400,
    Birmingham: 2400,
    Liverpool: 4555,
  },
  {
    name: "May",
    London: 3000,
    Manchester: 1398,
    Birmingham: 2210,
    Liverpool: 3339,
  },
  {
    name: "Jun",
    London: 2000,
    Manchester: 6800,
    Birmingham: 2290,
    Liverpool: 2339,
  },
  {
    name: "jul",
    London: 2780,
    Manchester: 3908,
    Birmingham: 2000,
    Liverpool: 1111,
  },
  {
    name: "Aug",
    London: 1890,
    Manchester: 4800,
    Birmingham: 2181,
    Liverpool: 4555,
  },
  {
    name: "Sep",
    London: 2390,
    Manchester: 3800,
    Birmingham: 2500,
    Liverpool: 4539,
  },
  {
    name: "Oct",
    London: 3490,
    Manchester: 4300,
    Birmingham: 2100,
    Liverpool: 6369,
  },
];


function MiddleC() {
  return (
    <div className="w-full h-full bg-gray-200 rounded-[10px] ">
      <div className="flex flex-col w-full h-full pl-2 pr-2">
        <div className="flex  flex-col items-center">
          <div className="font-tinos font-semibold text-lg text-gray-700 text-center">
            Most Profit Routes
          </div>
          <div className="bg-gray-400 h-[1px] w-[20%] relative mb-2">
            <div className="absolute w-[8px] h-[8px] bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-gray-400" />
          </div>
        </div>
        <div className="w-full h-full pr-2">
          <ResponsiveContainer width="100%" height={165}>
            <LineChart data={data}>
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis
                dataKey="name"
                fontSize={11}
                style={{ fontFamily: "roboto", fontWeight: "300" }}
              />
              <YAxis
                type="number"
                domain={["dataMin-100", "dataMax + 40"]}
                fontSize={12}
                width={40}
                tickCount={8}
                style={{ fontFamily: "roboto", fontWeight: "300" }}
              />
              <Tooltip />
              <Legend
                iconType="plainline"
                verticalAlign="top"
                height={30}
                wrapperStyle={{ fontSize: "12px", fontFamily: "roboto" }}
              />
              <Line
                dataKey="London"
                stroke="#002147"
                dot={false}
                strokeWidth={2}
              />
              <Line
                dataKey="Manchester"
                stroke="#7A0736"
                dot={false}
                strokeWidth={2}
              />
              <Line
                dataKey="Birmingham"
                stroke="#028C98"
                dot={false}
                strokeWidth={2}
              />
              <Line
                dataKey="Liverpool"
                stroke="#E3AC2E"
                dot={false}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default MiddleC;
