import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { CATEGORY_COLORS } from "../../utils/constants";
import { formatCurrency } from "../../utils/format";

function CategoryChart({ data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <section className="flex h-full flex-col rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-gray-800">
        Spending by Category
      </h2>

      <div className="my-auto">
        {data.length === 0 ? (
          <p className="py-16 text-center text-gray-500">
            Add expenses to see the chart.
          </p>
        ) : (
          <>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="50%"
                    outerRadius="80%"
                    paddingAngle={2}
                    label={({ percent }) => `${Math.round(percent * 100)}%`}
                  >
                    {data.map((item) => (
                      <Cell key={item.name} fill={CATEGORY_COLORS[item.name]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-center text-sm text-gray-500">
              Total in view: {formatCurrency(total)}
            </p>
          </>
        )}
      </div>
    </section>
  );
}

export default CategoryChart;
