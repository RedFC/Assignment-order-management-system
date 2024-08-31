import React from 'react';
import cubejsApi from '../cubejs/api';
import { QueryRenderer } from './Utils/queryrenderer';
import { ChartViewer } from './chartViewer';
import { CubeProvider } from '@cubejs-client/react';

const Dashboard = () => {

    return (
        <>
            <CubeProvider cubeApi={cubejsApi}>
                <QueryRenderer query={
                    {
                        "limit": 5000,
                        "dimensions": [
                            "orders.item",
                            "orders.itemid",
                            "orders.userid",
                            "orders.price",
                            "products.name",
                            "users.name"
                        ],
                        "measures": [
                            "orders.count"
                        ],
                    }
                }>
                    {({ resultSet, isLoading, error }) => {
                        if (isLoading) {
                            return <div>Loading...</div>;
                        }

                        if (error) {
                            return <div>{error.toString()}</div>;
                        }

                        if (!resultSet) {
                            return <div>NO RESULTS</div>;
                        }

                        return (
                            <div className='container mx-auto p-6'>
                                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-2">
                                    <div>
                                        <h1 className="text-3xl font-bold mb-6 text-center">Pie Chart</h1>
                                        <ChartViewer
                                            ResultSet={resultSet}
                                            PivotConfig={''}
                                            ChartType={'pie'}
                                        />
                                    </div>

                                    <div>
                                        <h1 className="text-3xl font-bold mb-6 text-center">Line Chart</h1>
                                        <ChartViewer
                                            ResultSet={resultSet}
                                            PivotConfig={''}
                                            ChartType={'line'}
                                        />
                                    </div>

                                    <div>
                                        <h1 className="text-3xl font-bold mb-6 text-center">Bar Chart</h1>
                                        <ChartViewer
                                            ResultSet={resultSet}
                                            PivotConfig={''}
                                            ChartType={'bar'}
                                        />
                                    </div>

                                    <div>
                                        <h1 className="text-3xl font-bold mb-6 text-center">Area Chart</h1>
                                        <ChartViewer
                                            ResultSet={resultSet}
                                            PivotConfig={''}
                                            ChartType={'area'}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    }}
                </QueryRenderer>
            </CubeProvider>
        </>
    );
};

export default Dashboard;