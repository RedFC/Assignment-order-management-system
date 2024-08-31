import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Filler,
    Tooltip,
    Legend,
    BarElement,
    ArcElement,
} from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { CHART_COLORS, CHART_SOLID_COLORS } from './Utils/colors';

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Filler,
    Title,
    Tooltip,
    Legend
);

const CHART_OPTIONS = {
    responsive: true,
    maintainAspectRatio: true,
};


export function ChartViewer({ResultSet, PivotConfig, ChartType}) {
    if (ChartType === 'table') {
        return null;
    }

    const colors = ChartType === 'line' ? CHART_COLORS : CHART_SOLID_COLORS;

    const data = {
        labels: ResultSet.chartPivot(PivotConfig).map((row) => row.x),
        datasets: ResultSet.series(PivotConfig).map((item, i) => {
            return {
                fill: ChartType === 'area',
                label: item.title,
                data: item.series.map(({ value }) => value),
                backgroundColor: colors[i % colors.length],
            };
        }),
    };

    const ChartElement = {
        bar: Bar,
        line: Line,
        area: Line,
        pie: Pie,
        doughnut: Doughnut,
    }[ChartType];

    if (!ChartElement) return;

    return <ChartElement options={CHART_OPTIONS} data={data} />;
}