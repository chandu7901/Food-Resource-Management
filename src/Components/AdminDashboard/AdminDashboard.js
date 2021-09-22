import "./AdminDashboard.css";
import Navbar from "../AdminAbsenceView/NavbarAdmin";
import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell } from "recharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const AdminDashboard = () => {
  const data_bargraph_1 = [
  {
    name: 'Mon',
    Wastage: 7,
  },
  {
    name: 'Tue',
    Wastage: 5,
  },
  {
    name: 'Wed',
    Wastage: 6,
  },
  {
    name: 'Thu',
    Wastage: 3,
  },
  {
    name: 'Fri',
    Wastage: 7,
  },
  {
    name: 'Sat',
    Wastage: 6,
  },
  {
    name: 'Sun',
    Wastage: 9,
  },
];
const data_bargraph_2 = [
  {
    name: 'Mon',
    Attendence: 200,
  },
  {
    name: 'Tue',
    Attendence: 140,
  },
  {
    name: 'Wed',
    Attendence: 100,
  },
  {
    name: 'Thu',
    Attendence: 230,
  },
  {
    name: 'Fri',
    Attendence: 130,
  },
  {
    name: 'Sat',
    Attendence: 195,
  },
  {
    name: 'Sun',
    Attendence: 130,
  },
];
  const data_pie_1 = [
  { name: "Group A", value: 195 },
  { name: "Group B", value: 300 },
];
const data_pie_2 = [
  { name: "Group A", value: 200 },
  { name: "Group B", value: 400 },
];
const COLORS = [ "#205b83", "#3598db" ];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
  const [fetchedData, setFetchedData] = useState({});
  const [loading,setLoading]=useState(false)
  useEffect(async () => {
    const data1 = await axios.get("/api/admin/addDetails"); //total cons , service name
    const data2= await axios.get('/api/admin/addtimetable'); // food cooked
    // setFetchedData({data1,data2})
    console.log(data2.data.foodCooked,data1.data.messName,data1.data.totalRegistered)
    setFetchedData({messName:data1.data.messName,foodCooked:data2.data.foodCooked,totalRegistered:data1.data.totalRegistered})
    setLoading(true)


  },[]);
  // const Incharge_Name = "Satyadev";
  // const Total_consumers = 300;
  // const Food_Cooked_Today = "500 Kg";
  // const Food_Cooked_Person = "1.33 Kg";

  return (
    <div>
      <Navbar />
      <h1 style={{ marginLeft: "57.5%" }}>Dashboard</h1>
      <div id="Info">
        <br></br>
        <br></br>
        <br></br>
        <b>
          <span style={{ color: "white" }}>Food Service Provider Name</span>
          <br></br>
          <br></br>
          <span style={{ color: "#152850", fontSize: "140%" }}>
            {fetchedData.messName || "loading...."}
          </span>
          <br></br>
          <br></br>
          <br></br>
          <span style={{ color: "white" }}>Total Consumers</span>
          <br></br>
          <br></br>
          <span style={{ color: "#152850", fontSize: "140%" }}>
            {fetchedData.totalRegistered || "loading...."}
          </span>
          <br></br>
          <br></br>
          <br></br>
          <span style={{ color: "white" }}>Food Cooked Today</span>
          <br></br>
          <br></br>
          <span style={{ color: "#152850", fontSize: "140%" }}>
            {fetchedData.foodCooked || "loading...."}
          </span>
          <br></br>
          <br></br>
          <br></br>
          <span style={{ color: "white" }}>Food Cooked per Person</span>
          <br></br>
          <br></br>
          <span style={{ color: "#152850", fontSize: "140%" }}>
            { Math.floor(fetchedData.foodCooked/fetchedData.totalRegistered) || "loading..."}
          </span>
          <br></br>
        </b>
      </div>
      <div id="Statistics">
        <div className="bargraph">
          <BarChart
                    width={350}
                    height={200}
                    data={data_bargraph_1}
                    margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                    }}
                    barSize={40}
                >
                    <XAxis dataKey="name" scale="point"   padding={{ left: 10, right: 10 }} />
                    {/* <YAxis /> */}
                    <Tooltip />
                    {/* <Legend /> */}
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <Bar dataKey="Wastage" fill="#3498db"  />
          </BarChart>
          <p style={{marginLeft: "-5px", width: "350px"}}>Total wastage (in Kgs) in the last week</p>
        </div>
        <div className="bargraph">
          <BarChart
                    width={350}
                    height={200}
                    data={data_bargraph_2}
                    margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                    }}
                    barSize={40}
                >
                    <XAxis dataKey="name" scale="point"   padding={{ left: 10, right: 10 }} />
                    {/* <YAxis /> */}
                    <Tooltip />
                    {/* <Legend /> */}
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <Bar dataKey="Attendence" fill="#3498db"  />
          </BarChart>
          <p style={{marginLeft: "35px"}}>Attendence in the last week</p>
        </div>
        <div className="piegraph">
          <PieChart className="pie_1" width={400} height={400}>
            <Pie
              data={data_pie_1}
              cx={200}
              cy={200}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data_pie_1.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
          <div className="pie_info first"><pre>       Consumed</pre></div>
          <div className="pie_info second"><pre>       Wasted</pre></div>
          <p className="pie_para">Yesterday's food statistics</p>
        </div>
        <div className="piegraph">
          <PieChart className="pie_1" width={400} height={400}>
            <Pie
              data={data_pie_2}
              cx={200}
              cy={200}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data_pie_2.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
          <div className="pie_info first"><pre>       Attended</pre></div>
          <div className="pie_info second"><pre>       Not-Attended</pre></div>
          <p className="pie_para">Yesterday's attendees statistics</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
