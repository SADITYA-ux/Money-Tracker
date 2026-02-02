import React from 'react';
import { PieChart, Pie, Tooltip } from "recharts";
import "../style/CategoryChart.css";

export default function CategoryChart({ data }) {
    return (
        <div className="category-chart">
            <h2>Category Breakdown</h2>
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="category"
                    label
                     fill="#00ff0d"
                />
                <Tooltip />
            </PieChart>
        </div>
    );
}
