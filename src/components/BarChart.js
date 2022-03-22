import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  BarChart,
  ResponsiveContainer,
} from 'recharts';
const BarChartComponent = ({ data }) => {
    console.log("data", data)
  return (

    <ResponsiveContainer width="70%" height={300}>
      <BarChart data={data} margin={{ top: 50 }} >
      <CartesianGrid strokeDasharray="3 3"/>
      <XAxis dataKey="date" />
      <YAxis allowDecimals={false} />
      <Tooltip />
      <Bar dataKey="count" fill="#2cb1bc" barSize={75} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
